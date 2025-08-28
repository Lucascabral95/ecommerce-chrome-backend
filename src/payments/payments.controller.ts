import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentDto) {
  //   return this.paymentsService.create(createPaymentDto);
  // }

  // @Get()
  // findAll() {
  //   return this.paymentsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentsService.remove(id);
  // }

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
