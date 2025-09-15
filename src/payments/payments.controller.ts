import { Body, Controller, Get, HttpCode, Param, Post, Query, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { GetAllPaymentsDto, GetPreferenceUserDto, PaginationPaymentDto } from './dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { OrderBy } from 'src/orders/dto';
import { Currency, PaymentProvider, PaymentStatus } from '@prisma/client';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all payments', description: 'Get all payments' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Items per page' })
  @ApiQuery({ name: 'orderBy', required: false, enum: OrderBy, description: 'Sort order for results' })
  @ApiQuery({ name: 'currency', required: false, enum: Currency, description: 'Filter payments by currency' })
  @ApiQuery({ name: 'provider', required: false, enum: PaymentProvider, description: 'Filter payments by provider' })
  @ApiQuery({ name: 'status', required: false, enum: PaymentStatus, description: 'Filter payments by status' })
  @ApiResponse({ status: 200, type: GetAllPaymentsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() paginationDto: PaginationPaymentDto) {
    return this.paymentsService.findAll(paginationDto);
  }

  @Post('preference/user/:userId')
  @ApiOperation({ summary: 'Create preference', description: 'Create preference of payment for user' })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetPreferenceUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getPreference(@Param('userId') userId: string) {
    return this.paymentsService.createPreference(userId);
  }

  @Post('webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Handle webhook', description: 'Handle webhook of payment' })
  @ApiResponse({ status: 200, description: 'Webhook handled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async handleWebhook(@Req() req: Request) {
    return this.paymentsService.handleWebhook(req.body);
  }

  @Get('test')
  @ApiOperation({ summary: 'Test', description: 'Test' })
  @ApiResponse({ status: 200, description: 'Test OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  test() {
    console.log('Estas es prueba de que los cambios surgieron efecto');
    return { message: 'Test OK' };
  }

  @Get('mp/success')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'MP success', description: 'MP success' })
  @ApiResponse({ status: 200, description: 'Webhook handled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async mpSuccess(@Query() q: any) {
    const paymentId = q.payment_id || q.collection_id;
    const status = q.status;
    console.log('Retorno de éxito MP', { paymentId, status });

    return { ok: 'Payment success' };
  }

  @Get('mp/pending')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'MP pending', description: 'MP pending' })
  @ApiResponse({ status: 200, description: 'Webhook handled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  pending(@Query() q: any) {
    return { status: 'pending', q };
  }

  @Get('mp/failure')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'MP failure', description: 'MP failure' })
  @ApiResponse({ status: 200, description: 'Webhook handled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  failure(@Query() q: any) {
    return { status: 'failure', q };
  }
}
