import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { envs } from 'src/config/env.schema';

@Injectable()
export class PaymentsService {
  private preference: Preference

  constructor(private readonly prisma: PrismaService) {
    const client = new MercadoPagoConfig({
      accessToken: envs.mp_access_token,
    });
    this.preference = new Preference(client);
  }

  async createPreference(userId: string, orderId?: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
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

      if (!cart || !cart.items.length) {
        throw new NotFoundException('Cart is empty');
      }

      const items = cart.items.map(item => ({
        id: item.variantId,
        title: `${item.variant.product.name}${item.variant.color ? ` - ${item.variant.color.name}` : ''}`,
        description: item.variant.product.description?.substring(0, 250) || '',
        category_id: item.variant.product.categoryId || 'general',
        quantity: item.quantity,
        currency_id: 'ARS',
        unit_price: Number(item.variant.price),
      }));

      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const preference = {
        items,
        payer: {
          email: user.email,
          name: user.name || '',
        },
        metadata: {
          userId,
          cartId: cart.id,
          ...(orderId && { orderId })
        },
        back_urls: {
          success: envs.back_url_success,
          pending: envs.back_url_pending,
          failure: envs.back_url_failure,
        },
        auto_return: 'approved',
        notification_url: envs.mp_webhook_url,
        statement_descriptor: 'TIENDA',
        binary_mode: true,
        external_reference: orderId || cart.id
      };

      const result = await this.preference.create({ body: preference });

      return {
        id: result.id,
        init_point: result.init_point,
        sandbox_init_point: result.sandbox_init_point,
        preference_url: result.sandbox_init_point || result.init_point
      };

    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error creating payment preference');
      throw new InternalServerErrorException('Error creating payment preference');
    }
  }

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

  async findAll() {
    try {
      const payments = await this.prisma.payment.findMany();

      if (!payments) {
        throw new NotFoundException('Payments not found');
      }

      return payments;

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
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
