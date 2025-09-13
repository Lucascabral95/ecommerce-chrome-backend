import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";
import { envs } from "src/config/env.schema";
import { Currency, OrderStatus } from "@prisma/client";

export enum OrderBy {
    ASC = 'asc',
    DESC = 'desc'
}

export class PaginationOrderDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    minTotal?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    maxTotal?: number;

    @IsOptional()
    @IsEnum(Currency)
    currency?: Currency;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy;
}

export class PaginationOrderUserIdDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsEnum(OrderBy)
    orderBy?: OrderBy;
}