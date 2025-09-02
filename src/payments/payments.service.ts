import { Injectable } from '@nestjs/common';
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

@Injectable()
export class PaymentsService {
  private preference: Preference

  constructor(private readonly prisma: PrismaService) {
    const client = new MercadoPagoConfig({
      accessToken: envs.mp_access_token,
      options: {
        timeout: 5000
      }
    });
    this.preference = new Preference(client);
  }

  // async createPreference(userId: string) {
  //   try {
  //     const user = await this.prisma.user.findUnique({
  //       where: {
  //         id: userId
  //       }
  //     });

  //     if (!user) throw new NotFoundException(`User with id: ${userId} not found`);
  //     const email = user.email;

  //     const cart = await this.prisma.cart.findFirst({
  //       where: {
  //         userId: userId,
  //       },
  //       include: {
  //         items: {
  //           include: {
  //             variant: {
  //               include: {
  //                 product: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     if (!cart) throw new NotFoundException(`Cart for user with id: ${userId} not found`);

  //     const body = {
  //       items: cart.items.map(item => ({
  //         id: item.variant.id,
  //         title: item.variant.product.name,
  //         quantity: item.quantity,
  //         currency_id: Currency.ARS,
  //         unit_price: Number(item.variant.price),
  //       })),
  //       payer: { email },
  //       back_urls: {
  //         success: envs.back_url_success,
  //         pending: envs.back_url_pending,
  //         failure: envs.back_url_failure,
  //       },
  //       // auto_return: 'approved',
  //       notification_url: envs.mp_webhook_url,
  //       external_reference: `ref_${Date.now()}`,
  //     };

  //     const requestOptions = {
  //       idempotencyKey: `pref_${Date.now()}`
  //     };

  //     const result = await this.preference.create({
  //       body,
  //       requestOptions
  //     });

  //     if (!result?.id) throw new Error('No se recibió id de preferencia');
  //     const preferenceUrl = result.sandbox_init_point || result.init_point;
  //     if (!preferenceUrl) throw new Error('No se recibió init_point');

  //     return {
  //       ok: true,
  //       id: result.id,
  //       init_point: result.init_point ?? null,
  //       sandbox_init_point: result.sandbox_init_point ?? null,
  //       preference_url: preferenceUrl,
  //       external_reference: result.external_reference ?? body.external_reference,
  //     };
  //   } catch (error: any) {
  //     console.error('MercadoPago preference error:', {
  //       status: error?.response?.status,
  //       data: error?.response?.data,
  //       headers: error?.response?.headers,
  //       message: error?.message,
  //     });
  //     throw new InternalServerErrorException('No se pudo crear la preferencia de pago');
  //   }
  // }

  async createPreference(userId: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id: userId }
      });

      if (!user) throw new NotFoundException(`User with id: ${userId} not found`);

      const findCartBydUserId = await this.prisma.cart.findFirst({
        where: { userId }
      });

      if (!findCartBydUserId) throw new NotFoundException(`Cart for user with id: ${userId} not found`);

      const cartItems = await this.prisma.cartItem.findMany({
        where: { cartId: findCartBydUserId.id },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      });

      const body = await this.preference.create({
        body: {
          items: cartItems.map(item => ({
            id: item.variant.id,
            title: item.variant.product.name,
            quantity: item.quantity,
            unit_price: Number(item.variant.price),
            currency_id: Currency.ARS,
          })),
          external_reference: `ref_${Date.now()}`,
          back_urls: {
            success: "https://links-shorteneres.onrender.com",
            pending: "https://links-shorteneres.onrender.com",
            failure: "https://links-shorteneres.onrender.com",
          },
          notification_url: envs.mp_webhook_url,
          auto_return: 'approved',  // Para que funcione, las redirecciones deben ser HTTPS
        },
      });

      console.log('🚀 Creando preferencia de pago:', { body });

      return {
        ok: true,
        id: body?.id ?? null,
        init_point: body?.init_point ?? null,
        sandbox_init_point: body?.sandbox_init_point ?? null,
        user: userId,
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Payment');
      throw error;
    }
  }



  async handleMpPaymentNotification(paymentId: string) {
    try {
      console.log("🔔 Notificación recibida. paymentId =", paymentId);

      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${envs.mp_access_token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("🌐 MP /v1/payments status:", resp.status, resp.statusText);
      const text = await resp.text();
      console.log("🧾 MP /v1/payments raw body:", text);

      if (!resp.ok) {
        console.error("❌ Error al consultar pago en MP (raw):", text);
        throw new Error(`Error al consultar pago: HTTP ${resp.status}`);
      }

      const mpData = JSON.parse(text);

      console.log("📊 Pago MP:");
      console.log("- id:", mpData.id);
      console.log("- status:", mpData.status);
      console.log("- status_detail:", mpData.status_detail);
      console.log("- transaction_amount:", mpData.transaction_amount);
      console.log("- payment_method_id:", mpData.payment_method_id);
      console.log("- payer.email:", mpData.payer?.email);
      console.log("- external_reference:", mpData.external_reference);

      const externalReference = mpData.external_reference;
      if (!externalReference) {
        throw new Error("No se encontró external_reference en la respuesta de MP");
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

      const status = mapStatus(mpData.status);
      const updateData: any = {
        status,
        providerPaymentId: String(paymentId),
        method: mpData.payment_method_id,
        installments: mpData.installments || 1,
        fee: (mpData.fee_details || []).reduce((sum: number, f: any) => sum + (f?.amount || 0), 0),
        raw: mpData,
      };
      if (status === PaymentStatus.APPROVED) updateData.capturedAt = new Date();

      // Actualizar tu Payment por external_reference (si en tu sistema usas ese ID)
      const payment = await this.prisma.payment.update({
        where: { id: externalReference },
        data: updateData,
        include: { order: true },
      });

      console.log("✅ Pago actualizado en DB:", {
        paymentId: externalReference,
        status: payment.status,
        orderId: payment.orderId,
      });

      if (status === PaymentStatus.APPROVED && payment.orderId) {
        await this.prisma.order.update({
          where: { id: payment.orderId },
          data: { status: "PAID" },
        });
        console.log("✅ Orden marcada PAID:", payment.orderId);
      }

      return payment;
    } catch (error) {
      console.error("❌ Error en handleMpPaymentNotification:", error);
      throw new InternalServerErrorException("Error al procesar notificación de pago");
    }
  }

  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  //CREATE
  //CREATE
  //CREATE
  //CREATE
  //CREATE
  //CREATE
  //CREATE
  /////////////////////////
  /////////////////////////
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
