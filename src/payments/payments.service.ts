import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { envs } from 'src/config/env.schema';
import { PaginationPaymentDto } from './dto';
import { OrderBy } from 'src/orders/dto';
import { Prisma } from 'generated/prisma';
import { Currency, PaymentProvider, PaymentStatus } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private preference: Preference
  private logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {
    const client = new MercadoPagoConfig({
      accessToken: envs.mp_access_token,
      options: {
        timeout: 5000
      }
    });
    this.preference = new Preference(client);
  }

  async createPreference(userId: string) {
    try {
      // 1. Buscar usuario
      const user = await this.prisma.user.findFirst({
        where: { id: userId }
      });

      if (!user) throw new NotFoundException(`User with id: ${userId} not found`);

      // 2. Obtener carrito con items
      const cart = await this.prisma.cart.findFirst({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      if (!cart || cart.items.length === 0) {
        throw new NotFoundException(`Cart for user with id: ${userId} not found or empty`);
      }

      const externalReference = `payment_${userId}_${Date.now()}`;

      const preference = await this.preference.create({
        body: {
          items: cart.items.map(item => ({
            id: item.variant.id,
            title: item.variant.product.name,
            quantity: item.quantity,
            unit_price: Number(item.variant.price),
            currency_id: Currency.ARS,
          })),

          external_reference: externalReference,

          back_urls: {
            success: `${envs.back_url_success}`,
            pending: `${envs.back_url_pending}`,
            failure: `${envs.back_url_failure}`,
          },
          notification_url: envs.mp_webhook_url,
          auto_return: 'approved',

          payer: {
            email: user.email,
          },

          metadata: {
            user_id: userId,
          },
        },
      });

      return {
        ok: true,
        id: preference?.id ?? null,
        init_point: preference?.init_point ?? null,
        sandbox_init_point: preference?.sandbox_init_point ?? null,
        user: userId,
        externalReference: externalReference,
      };

    } catch (error) {
      this.logger.error('Error creando preferencia:', error);
      if (error instanceof InternalServerErrorException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException) {
        throw error;
      }
      handlePrismaError(error, 'createPreference');
      throw error;
    }
  }

  async handleWebhook(notificationData: any) {
    try {
      let paymentId: string;
      let topic: string;

      if (notificationData.data?.id && notificationData.type === 'payment') {
        paymentId = notificationData.data.id;
        topic = notificationData.type;
        this.logger.log(`🔔 Webhook formato completo recibido. PaymentId: ${paymentId}`);

      } else if (notificationData.resource && notificationData.topic === 'payment') {
        paymentId = notificationData.resource;
        topic = notificationData.topic;
        this.logger.log(`🔔 Webhook formato simple recibido. PaymentId: ${paymentId}`);

      } else if (notificationData.topic === 'merchant_order') {
        this.logger.log(`🔔 Merchant order recibido: ${notificationData.resource}`);
        return { message: 'Merchant order webhook processed but ignored' };

      } else {
        this.logger.warn('❌ Formato de webhook no reconocido:', notificationData);
        throw new BadRequestException('Formato de webhook no válido');
      }

      if (!paymentId || isNaN(Number(paymentId))) {
        throw new BadRequestException(`PaymentId inválido: ${paymentId}`);
      }

      this.logger.log(`🔔 Procesando pago: ${paymentId}`);

      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${envs.mp_access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        this.logger.error(`❌ Error consultando MP API: ${errorText}`);
        throw new Error(`Error al consultar pago: HTTP ${resp.status}`);
      }

      const mpData = await resp.json();

      // Logs de TODOS los datos del mpData
      this.logger.debug("📊 Datos del pago:", JSON.stringify(mpData, null, 2));

      const externalReference = mpData.external_reference;
      if (!externalReference) {
        throw new Error("external_reference no encontrado en respuesta MP");
      }

      const mapStatus = (mpStatus: string): PaymentStatus => {
        switch (mpStatus) {
          case "approved": return PaymentStatus.APPROVED;
          case "pending": return PaymentStatus.PENDING;
          case "rejected": return PaymentStatus.REJECTED;
          case "refunded": return PaymentStatus.REFUNDED;
          case "cancelled": return PaymentStatus.CANCELLED;
          default: return PaymentStatus.PENDING;
        }
      };

      const status: PaymentStatus = mapStatus(mpData.status);

      const updateData: any = {
        status,
        providerPaymentId: String(paymentId),
        installments: mpData.installments || 1,
        method: mpData.payment_method_id,
        raw: mpData,
        updatedAt: new Date(),
      };

      if (status === PaymentStatus.APPROVED) {
        updateData.capturedAt = new Date();
      }

      const payment = await this.prisma.payment.update({
        where: { id: externalReference },
        data: updateData,
        include: { order: true },
      });

      this.logger.log("✅ Payment actualizado:", {
        paymentId: externalReference,
        status: payment.status,
        orderId: payment.orderId,
      });

      if (status === PaymentStatus.APPROVED && payment.orderId) {
        await this.prisma.order.update({
          where: { id: payment.orderId },
          data: {
            status: "PAID",
          },
        });

        this.logger.log("✅ Orden marcada como PAID:", payment.orderId);

        await this.executePostPaymentActions(payment);
      }

      return payment;

    } catch (error) {
      this.logger.error("❌ Error en webhook:", error);
      throw new InternalServerErrorException("Error al procesar notificación de pago");
    }
  }

  private async executePostPaymentActions(payment: any) {
    try {
      if (payment.order?.userId) {
        const cart = await this.prisma.cart.findFirst({
          where: { userId: payment.order.userId }
        });

        if (cart) {
          await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
          });
          this.logger.log(`🧹 Carrito limpiado para usuario: ${payment.order.userId}`);
        }
      }
      this.logger.log(`🎉 Acciones post-pago ejecutadas para orden: ${payment.orderId}`);

    } catch (error) {
      this.logger.error('❌ Error en acciones post-pago:', error);
    }
  }

  /////////////////////////
  /////////////////////////
  /////////////////////////
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const { orderId, provider, status, amount, currency, providerPaymentId, installments, method, capturedAt, raw } = createPaymentDto;

      const payment = await this.prisma.payment.create({
        data: {
          orderId,
          provider,
          status,
          amount,
          currency,
          providerPaymentId,
          installments,
          method,
          capturedAt,
          raw
        }
      });

      return payment;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error creating payment');
    }
  }

  async findAll(paginationPaymentDto: PaginationPaymentDto) {
    try {
      const {
        page = 1,
        limit = envs.limit,
        orderBy = OrderBy.DESC,
        currency,
        provider,
        status,
      } = paginationPaymentDto;

      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || envs.limit;

      const take = Math.max(1, limitNum);
      const skip = (pageNum - 1) * take;

      const where = {
        ...(currency && { currency: currency as Currency }),
        ...(provider && { provider: provider as PaymentProvider }),
        ...(status && { status: status as PaymentStatus }),
      };

      const [payments, total] = await this.prisma.$transaction([
        this.prisma.payment.findMany({
          where,
          take,
          skip,
          orderBy: {
            createdAt: orderBy === OrderBy.DESC ? 'desc' : 'asc',
          },
        }),
        this.prisma.payment.count({ where }),
      ]);

      const totalPages = Math.ceil(total / take);
      const prevPage = Number(page) > 1;
      const nextPage = Number(page) < totalPages;

      return {
        page: Number(page),
        limit: take,
        total,
        totalPages,
        prevPage,
        nextPage,
        payments,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof NotFoundException ||
        error instanceof InternalServerErrorException
      )
        throw error;
      handlePrismaError(error, 'Error finding payments');
    }
  }

  async findOne(id: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id: id
        }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with id: ${id} not found`);
      }

      return payment;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding payment');
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const { orderId, provider, status, amount, currency, providerPaymentId, installments, method, capturedAt, raw } = updatePaymentDto;

      const payment = await this.prisma.payment.update({
        where: {
          id: id,
        },
        data: {
          orderId,
          provider,
          status,
          amount,
          currency,
          providerPaymentId,
          installments,
          method,
          capturedAt,
          raw
        }
      });

      return payment;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error updating payment');
    }
  }

  async remove(id: string) {
    try {
      const payment = await this.prisma.payment.delete({
        where: {
          id: id,
        }
      });

      if (!payment) {
        throw new NotFoundException(`Payment with id: ${id} not found`);
      }

      return payment;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error removing payment');
    }
  }
}
