import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('create-payment')
  @HttpCode(HttpStatus.OK)
  async createPaymentIntent(@Body() body: CreatePaymentDto) {
    const { amount, currency = 'usd' } = body;

    const result = await this.stripeService.createPaymentIntent(
      amount,
      currency,
    );

    return {
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    };
  }

  @Get('ok')
  async ok() {
    return 'Este endpoint esta funcionando correctamente!!!'
  }
}
