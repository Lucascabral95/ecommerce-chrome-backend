import { ApiProperty } from "@nestjs/swagger";
import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";

import { IsDate, IsEnum, IsJSON, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePaymentDto {
    @ApiProperty({ description: 'Payment ID (auto-generated if not provided)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'ID of the order being paid for', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    orderId: string;

    @ApiProperty({ description: 'Payment provider', enum: PaymentProvider, example: PaymentProvider.MERCADOPAGO })
    @IsEnum(PaymentProvider)
    @IsOptional()
    provider?: PaymentProvider;

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
    @IsOptional()
    method?: string;

    @ApiProperty({ description: 'Payment captured date', example: '2022-01-01T00:00:00.000Z', required: false })
    @IsDate()
    @IsOptional()
    capturedAt?: Date;

    @ApiProperty({ description: 'Raw payment data', example: '{ "key": "value" }', required: false })
    @IsJSON()
    @IsOptional()
    raw?: any;
}
