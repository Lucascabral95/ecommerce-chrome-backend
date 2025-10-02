import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { envs } from 'src/config/env.schema';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor() {
    this.stripe = new Stripe(envs.stripe_secret_key);

    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    this.stripe = new Stripe(envs.stripe_secret_key);
  }

  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
  ): Promise<{ clientSecret: string; paymentIntentId: string }> {
    try {
      if (amount <= 0) {
        throw new BadRequestException('El monto debe ser mayor a 0');
      }

      this.logger.log(`Creando Payment Intent por $${amount / 100} ${currency.toUpperCase()}`);

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          integration: 'ecommerce-doraemon',
        },
      });

      this.logger.log(`Payment Intent creado: ${paymentIntent.id}`);

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      this.logger.error('Error al crear Payment Intent:', error);
      throw new BadRequestException(
        `Error al crear Payment Intent: ${error.message}`,
      );
    }
  }

  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await this.stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      this.logger.error('Error al recuperar Payment Intent:', error);
      throw new BadRequestException('Error al recuperar Payment Intent');
    }
  }
}
