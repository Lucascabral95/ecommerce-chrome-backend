import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaginationPaymentDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  async findAll(@Query() paginationDto: PaginationPaymentDto) {
    return this.paymentsService.findAll(paginationDto);
  }

  @Get('preference/:id')
  async getPreference(@Param('id') id: string) {
    return this.paymentsService.createPreference(id);
  }

  @Get('success')
  success(@Query() q: any) {
    return { status: 'success', q };
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
