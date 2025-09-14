import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderBy, PaginationOrderDto, PaginationOrderUserIdDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { Currency, Prisma } from '@prisma/client';
import { envs } from 'src/config/env.schema';
import { PaymentsService } from 'src/payments/payments.service';
import { generatorUuidV4 } from 'src/shared/utils/generator-uuid-v4';

const TIMEOUT_TRANSAC = envs.minutes_to_cancel_order;

@Injectable()
export class OrdersService {
  private orderTimeouts = new Map<string, NodeJS.Timeout>();
  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentsService: PaymentsService,
  ) { }

  async createOrder(userId: string, dto: CreateOrderDto) {
    // Primero ejecutar la transacción
    const order = await this.prisma.$transaction(async (tx) => {
      // 1. Obtener carrito del usuario
      const cart = await tx.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                  color: true
                }
              }
            }
          }
        }
      });

      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('El carrito está vacío');
      }

      // 2. Verificar si hay una orden pendiente
      const existingPendingOrder = await tx.order.findFirst({
        where: {
          userId: userId,
          status: 'PENDING'
        }
      });

      if (existingPendingOrder) {
        throw new BadRequestException('Ya tenés una orden pendiente. Completá o cancelá la orden anterior.');
      }

      // 3. Validar stock y reservar
      for (const item of cart.items) {
        if (item.variant.stock < item.quantity) {
          throw new BadRequestException(
            `Stock insuficiente para ${item.variant.product.name} - ${item.variant.size}${item.variant.color ? ` ${item.variant.color.name}` : ''}`
          );
        }

        // Reservar stock decrementando temporalmente
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // 4. Calcular totales (backend calcula, no confía en el frontend)
      const subtotal = cart.items.reduce((acc, item) =>
        acc + (item.unitPriceSnap * item.quantity), 0
      );

      const shipping = dto.shipping || 0;
      const discount = dto.discount || 0;
      const total = subtotal + shipping - discount;

      // 5. Crear preferencia de pago 
      const createPayments = await this.paymentsService.createPreference(userId);

      // 6. Crear la orden
      const order = await tx.order.create({
        data: {
          userId: userId,
          status: 'PENDING',
          currency: dto.currency || 'ARS',
          subtotal,
          shipping,
          tax: 0,
          discount,
          mpPreferenceId: createPayments.init_point,
          total,
          shippingAddress: dto.shippingAddress as any,
          billingAddress: dto.billingAddress || dto.shippingAddress as any,
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                  color: true
                }
              }
            }
          }
        }
      });

      // 7. Crear OrderItems
      for (const cartItem of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            variantId: cartItem.variantId,
            quantity: cartItem.quantity,
            unitPrice: cartItem.unitPriceSnap,
            productName: cartItem.variant.product.name,
            sku: cartItem.variant.sku,
            size: cartItem.variant.size,
            colorName: cartItem.variant.color?.name,
          }
        });
      }

      // 8. Crear Payment pendiente
      await tx.payment.create({
        data: {
          id: createPayments.externalReference,
          orderId: order.id,
          provider: 'MERCADOPAGO',
          status: 'PENDING',
          amount: total,
          currency: dto.currency || 'ARS',
        }
      });

      // 9. NO limpiar carrito aún (se limpia cuando se confirma el pago)
      // await tx.cartItem.deleteMany({
      //   where: { cartId: cart.id }
      // });

      return order;
    });

    // 10. DESPUÉS de la transacción exitosa, programar cancelación automática
    this.programarCancelacionAutomatica(order.id);
    return order;
  }

  private programarCancelacionAutomatica(orderId: string): void {
    const timeoutId = setTimeout(async () => {

      try {
        await this.cancelOrder(orderId);
        this.orderTimeouts.delete(orderId);
      } catch (error) {
        console.error(`❌ Error cancelando orden ${orderId}:`, error);
      }
    }, TIMEOUT_TRANSAC * 60 * 1000);

    this.orderTimeouts.set(orderId, timeoutId);
  }

  async cancelOrder(orderId: string) {
    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          items: true,
          payment: true
        }
      });

      if (!order || order.status !== 'PENDING') {
        throw new BadRequestException('Orden no encontrada o ya procesada');
      }

      // ✅ RESTAURAR STOCK
      for (const item of order.items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: { stock: { increment: item.quantity } }
        });
      }

      // ✅ CANCELAR ORDEN
      await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' }
      });

      // ✅ CANCELAR PAYMENT
      if (order.payment) {
        await tx.payment.update({
          where: { id: order.payment.id },
          data: { status: 'CANCELLED' }
        });
      }

      return { message: 'Orden cancelada y stock restaurado' };
    });
  }

  ////////////////////////////
  async findAll(paginationOrderDto: PaginationOrderDto) {
    try {
      const {
        page = 1,
        limit = envs.limit,
        minTotal,
        maxTotal,
        currency = Currency.ARS,
        status,
        orderBy = OrderBy.DESC,
      } = paginationOrderDto

      const take = limit + 1;
      const skip = (page - 1) * limit;

      const where: Prisma.OrderWhereInput = {
        ...(status && { status }),
        ...(currency && { currency }),
        ...(minTotal && { total: { gte: minTotal } }),
        ...(maxTotal && { total: { lte: maxTotal } }),
      };

      const [orders, totalOrders] = await Promise.all([
        this.prisma.order.findMany({
          take,
          skip,
          where,
          orderBy: {
            createdAt: orderBy === OrderBy.DESC ? 'desc' : 'asc',
          },
        }),
        this.prisma.order.count({ where }),
      ]);

      const prevPage = page > 1 ? true : false;
      const nextPage = orders.length > limit - 1 ? true : false;

      return {
        page,
        limit,
        total: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        prevPage,
        nextPage,
        orders: orders,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw new Error(error.message);
      }
      handlePrismaError(error, 'Error finding orders');
    }
  }

  async findOne(orderId: string) {
    try {
      const result = {
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    select: {
                      id: true,
                      images: true,
                    }
                  }
                }
              }
            }
          }
        },
      }

      const orderById = await this.prisma.order.findFirst({
        where: {
          id: orderId,
        },
        include: result.include,
      });

      if (!orderById) {
        throw new NotFoundException(`Order with id: ${orderId} not found`);
      }

      return orderById;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error finding order');
    }
  }

  async findAllByUserId(userId: string, paginationOrderUserIdDto: PaginationOrderUserIdDto) {
    try {
      const {
        page = 1,
        limit = envs.limit,
        status,
        orderBy = OrderBy.DESC
      } = paginationOrderUserIdDto;

      const result = {
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    select: {
                      id: true,
                      images: true,
                    }
                  }
                }
              }
            }
          }
        },
      }

      const take = limit + 1;
      const skip = (page - 1) * limit;

      const where: Prisma.OrderWhereInput = {
        userId: userId,
        ...(status && { status }),
      };

      const orderOfUser = await this.prisma.order.findMany({
        where,
        take,
        skip,
        include: result.include,
        orderBy: {
          createdAt: orderBy === OrderBy.DESC ? 'desc' : 'asc',
        },
      });

      const [orders, totalOrders] = await Promise.all([
        this.prisma.order.findMany({
          take,
          skip,
          where,
          orderBy: {
            createdAt: orderBy === OrderBy.DESC ? 'desc' : 'asc',
          },
        }),
        this.prisma.order.count({ where }),
      ]);

      const prevPage = page > 1 ? true : false;
      const nextPage = orders.length > limit - 1 ? true : false;

      return {
        total: totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        prevPage,
        nextPage,
        page,
        limit,
        orders: orderOfUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding orders by user');
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    try {
      const updatedOrder = await this.prisma.order.update({
        where: { id },
        data: { ...updateOrderDto, userId: undefined, shippingAddress: updateOrderDto.shippingAddress as any, billingAddress: updateOrderDto.billingAddress as any },
      });

      return updatedOrder;
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error updating order');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      const removedOrder = await this.prisma.order.delete({
        where: {
          id
        }
      });

      return removedOrder;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error removing order');
    }
  }
}
