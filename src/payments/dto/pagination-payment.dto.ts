import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator"

import { Transform } from "class-transformer";
import { OrderBy } from "src/orders/dto";
import { Currency, PaymentProvider, PaymentStatus } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { envs } from "src/config/env.schema";

export class PaginationPaymentDto {
    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1,
        minimum: 1,
        default: 1
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: envs.limit
    })
    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    limit?: number;

    @ApiPropertyOptional({
        description: 'Sort order for the results',
        enum: OrderBy,
        example: OrderBy.DESC
    })
    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy = OrderBy.DESC;

    @ApiPropertyOptional({
        description: 'Filter payments by currency',
        enum: Currency,
        example: Currency.ARS
    })
    @IsEnum(Currency)
    @IsOptional()
    @Transform(({ value }) => Number(value))
    currency?: Currency;

    @ApiPropertyOptional({
        description: 'Filter payments by provider',
        enum: PaymentProvider,
        example: PaymentProvider.MERCADOPAGO
    })
    @IsEnum(PaymentProvider)
    @IsOptional()
    provider?: PaymentProvider;

    @ApiPropertyOptional({
        description: 'Filter payments by status',
        enum: PaymentStatus,
        example: PaymentStatus.PENDING
    })
    @IsEnum(PaymentStatus)
    @IsOptional()
    status?: PaymentStatus;
}

