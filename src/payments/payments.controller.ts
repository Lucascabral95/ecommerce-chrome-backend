import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaginationPaymentDto } from './dto';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  async findAll(@Query() paginationDto: PaginationPaymentDto) {
    return this.paymentsService.findAll(paginationDto);
  }

  @Post('preference/user/:userId')
  async getPreference(@Param('userId') userId: string) {
    return this.paymentsService.createPreference(userId);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(@Req() req: Request) {
    return this.paymentsService.handleWebhook(req.body);
  }

  @Get('test')
  test() {
    console.log('Estas es prueba de que los cambios surgieron efecto');
    return { message: 'Test OK' };
  }

  @Get('mp/success')
  async mpSuccess(@Query() q: any) {
    const paymentId = q.payment_id || q.collection_id;
    const status = q.status;
    console.log('Retorno de éxito MP', { paymentId, status });

    return { ok: 'Payment success' };
  }

  @Get('mp/pending')
  pending(@Query() q: any) {
    return { status: 'pending', q };
  }

  @Get('mp/failure')
  failure(@Query() q: any) {
    return { status: 'failure', q };
  }
}
