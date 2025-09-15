import { ApiProperty } from "@nestjs/swagger";
import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsJSON, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";

class GetPaymentDto {
    @ApiProperty({ description: 'Payment ID', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Order ID', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    orderId: string;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider, example: PaymentProvider.MERCADOPAGO })
    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

    @ApiProperty({ description: 'Payment status', enum: PaymentStatus, example: PaymentStatus.APPROVED })
    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @ApiProperty({ description: 'Payment amount', example: 100 })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({ description: 'Currency of the payment', enum: Currency, example: Currency.ARS })
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty({ description: 'Provider payment ID', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    providerPaymentId?: string;

    @ApiProperty({ description: 'Number of installments', example: 1, required: false })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    installments?: number;

    @ApiProperty({ description: 'Payment method', example: 'credit_card', required: false })
    @IsString()
    @IsOptional()
    method?: string;

    @ApiProperty({ description: 'Payment captured date', example: '2022-01-01T00:00:00.000Z', required: false })
    @IsDate()
    @IsOptional()
    capturedAt?: Date;

    @ApiProperty({ description: 'Raw payment data', example: '{ "key": "value" }', required: false })
    @IsJSON()
    @IsOptional()
    raw?: JSON;

    @ApiProperty({ description: 'Payment created at', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Payment updated at', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

export class GetPaymentsDto {
    @ApiProperty({ description: 'Page number', example: 1 })
    @IsNumber()
    @IsPositive()
    page: number;

    @ApiProperty({ description: 'Limit number', example: 10 })
    @IsNumber()
    @IsPositive()
    limit: number;

    @ApiProperty({ description: 'Total number', example: 10 })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({ description: 'Previous page', example: true })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ description: 'Next page', example: true })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ description: 'Payments', type: [GetPaymentDto] })
    @Type(() => GetPaymentDto)
    @ValidateNested({ each: true })
    @IsArray()
    payments: GetPaymentDto[];
}

export class GetAllPaymentsDto {
    @ApiProperty({ description: 'Page number', example: 1 })
    @IsNumber()
    @IsPositive()
    page: number;

    @ApiProperty({ description: 'Limit number', example: 10 })
    @IsNumber()
    @IsPositive()
    limit: number;

    @ApiProperty({ description: 'Total number', example: 10 })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({ description: 'Previous page', example: true })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ description: 'Next page', example: true })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ description: 'Payments', type: [GetPaymentDto] })
    @Type(() => GetPaymentDto)
    @ValidateNested({ each: true })
    @IsArray()
    payments: GetPaymentDto[];
}