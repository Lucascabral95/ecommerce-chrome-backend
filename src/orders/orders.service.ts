import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, OrderBy, PaginationOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { envs } from 'src/config/env.schema';
import { Currency, OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createOrderDto: CreateOrderDto) {
    try {
      const {
        userId,
        status,
        currency = Currency.ARS,
        subtotal,
        shipping = 0,
        tax = 0,
        discount = 0,
        total,
        shippingAddress,
        billingAddress,
        mpPreferenceId,
      } = createOrderDto

      const order = this.prisma.order.create({
        data: {
          userId,
          status: status ?? OrderStatus.PENDING,
          currency,
          subtotal,
          shipping,
          tax,
          discount,
          total,
          shippingAddress: shippingAddress ? shippingAddress as any : null,
          billingAddress: billingAddress ? billingAddress as any : null,
          mpPreferenceId,
        },
      });

      return {
        order: order,
        message: 'Order created successfully',
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error creating order');
    }
  }

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

  async findOne(id: string) {
    try {
      const orderById = await this.prisma.order.findFirst({ where: { id } });

      if (!orderById) {
        throw new NotFoundException(`Order with id: ${id} not found`);
      }

      return orderById;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error finding order');
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
