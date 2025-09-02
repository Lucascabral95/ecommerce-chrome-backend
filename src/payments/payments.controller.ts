import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaginationPaymentDto } from './dto';
import { Response, Request } from 'express';

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

  @Post('mp/webhook')
  async mpWebhook(@Req() req: Request, @Res() res: Response) {
    try {
      const body: any = req.body;

      if (body?.type === 'payment' && body?.data?.id) {
        const paymentId = String(body.data.id);

        await this.paymentsService.handleMpPaymentNotification(paymentId);

        console.log('✅ Webhook MP procesado', { paymentId });

        return res.status(200).send('ok');
      }

      return res.status(200).send('ignored');
    } catch (e) {
      console.error('Error en webhook MP', e);
      return res.status(200).send('ok');
    }
  }

  @Get('mp/success')
  async mpSuccess(@Query() q: any) {
    const paymentId = q.payment_id || q.collection_id;
    const status = q.status;
    console.log('Retorno de éxito MP', { paymentId, status });

    // if (paymentId) {
    //   const updated = await this.paymentsService.confirmMpPayment(paymentId);
    //   if (updated?.approved) {
    //     console.log('Pago aprobado ✔️ (callback)', {
    //       paymentId,
    //       status_detail: updated.status_detail,
    //     });
    //   }
    // }
    return { ok: true };
  }




  @Get('pending')
  pending(@Query() q: any) {
    return { status: 'pending', q };
  }

  @Get('failure')
  failure(@Query() q: any) {
    return { status: 'failure', q };
  }
}
