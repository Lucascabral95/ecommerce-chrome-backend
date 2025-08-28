import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";

import { IsDate, IsEnum, IsJSON, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    orderId: string;

    @IsEnum(PaymentProvider)
    @IsOptional()
    provider?: PaymentProvider;

    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsEnum(Currency)
    currency: Currency;

    @IsString()
    @IsOptional()
    providerPaymentId?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    installments?: number;

    @IsString()
    @IsOptional()
    method?: string;

    @IsDate()
    @IsOptional()
    capturedAt?: Date;

    @IsJSON()
    @IsOptional()
    raw?: any;
}
