import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator"

import { Transform } from "class-transformer";
import { OrderBy } from "src/orders/dto";
import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";

export class PaginationPaymentDto {
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    page?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    limit?: number;

    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy = OrderBy.DESC;

    @IsEnum(Currency)
    @IsOptional()
    @Transform(({ value }) => Number(value))
    currency?: Currency;

    @IsEnum(PaymentProvider)
    @IsOptional()
    provider?: PaymentProvider;

    @IsEnum(PaymentStatus)
    @IsOptional()
    status?: PaymentStatus;
}

