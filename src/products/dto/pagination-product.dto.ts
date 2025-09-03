import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { envs } from "src/config/env.schema";
import { ProductStatus, Size } from "@prisma/client";

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export enum ProductSortField {
    PRICE = 'basePrice',
    NAME = 'name',
    CREATED_AT = 'createdAt'
}

export class PaginationProductDto {
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

    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    minPrice?: number;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    maxPrice?: number;

    @IsEnum(Size)
    @IsOptional()
    size?: Size;

    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    stock?: number;

    @IsEnum(ProductStatus)
    @IsOptional()
    status?: ProductStatus;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsString()
    @IsOptional()
    brandId?: string;

    // Order filters
    @IsEnum(ProductSortField)
    @IsOptional()
    @Transform(({ value }) => value || ProductSortField.CREATED_AT)
    sortBy?: ProductSortField;

    @IsEnum(SortOrder)
    @IsOptional()
    @Transform(({ value }) => value || SortOrder.DESC)
    sortOrder?: SortOrder;
}
