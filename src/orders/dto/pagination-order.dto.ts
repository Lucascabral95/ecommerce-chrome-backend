import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";
import { envs } from "src/config/env.schema";
import { Currency, OrderStatus } from "@prisma/client";
import { ApiPropertyOptional } from "@nestjs/swagger";

export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc'
}

export class PaginationOrderDto {
    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1,
        minimum: 1,
        default: 1
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: envs.limit
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @ApiPropertyOptional({
        description: 'Minimum total amount for orders',
        example: 100,
        default: 0
    })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    minTotal?: number;

    @ApiPropertyOptional({
        description: 'Maximum total amount for orders',
        example: 1000,
        default: 0
    })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    maxTotal?: number;

    @ApiPropertyOptional({
        description: 'Currency for orders',
        enum: Currency,
        example: Currency.ARS
    })
    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @ApiPropertyOptional({
        description: 'Status for orders',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @ApiPropertyOptional({
        description: 'Sort order for the results',
        enum: OrderBy,
        example: OrderBy.ASC
    })
    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy;
}

export class PaginationOrderUserIdDto {
    @ApiPropertyOptional({
        description: 'Page number for pagination',
        example: 1,
        minimum: 1,
        default: 1
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        example: 10,
        minimum: 1,
        maximum: 100,
        default: envs.limit
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @ApiPropertyOptional({
        description: 'Status for orders',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @ApiPropertyOptional({
        description: 'Sort order for the results',
        enum: OrderBy,
        example: OrderBy.ASC
    })
    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy;
}