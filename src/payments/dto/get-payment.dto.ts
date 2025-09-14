import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsJSON, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";

class GetPaymentDto {
    @IsString()
    id: string;

    @IsString()
    orderId: string;

    @IsEnum(PaymentProvider)
    provider: PaymentProvider;

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
    raw?: JSON;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class GetPaymentsDto {
    @IsNumber()
    @IsPositive()
    page: number;

    @IsNumber()
    @IsPositive()
    limit: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsBoolean()
    prevPage: boolean;

    @IsBoolean()
    nextPage: boolean;

    @Type(() => GetPaymentDto)
    @ValidateNested({ each: true })
    @IsArray()
    payments: GetPaymentDto[];
}