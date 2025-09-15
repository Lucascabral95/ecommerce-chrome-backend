import { IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { envs } from "src/config/env.schema";
import { ProductStatus, Size } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

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
    @ApiProperty({ type: Number, example: 1 })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || 1)
    page?: number;

    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Transform(({ value }) => Number(value) || envs.limit)
    limit?: number;

    @ApiProperty({ type: String, example: 'Remera de manga corta' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ type: Number, example: 10 })
    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    minPrice?: number;

    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    maxPrice?: number;

    @ApiProperty({ type: String, example: 'S' })
    @IsEnum(Size)
    @IsOptional()
    size?: Size;

    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    @IsOptional()
    @Transform(({ value }) => Number(value))
    stock?: number;

    @ApiProperty({ type: String, example: 'ACTIVE' })
    @IsEnum(ProductStatus)
    @IsOptional()
    status?: ProductStatus;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    @IsOptional()
    brandId?: string;

    // Order filters
    @ApiProperty({ type: String, example: 'createdAt' })
    @IsEnum(ProductSortField)
    @IsOptional()
    @Transform(({ value }) => value || ProductSortField.CREATED_AT)
    sortBy?: ProductSortField;

    @ApiProperty({ type: String, example: 'desc' })
    @IsEnum(SortOrder)
    @IsOptional()
    @Transform(({ value }) => value || SortOrder.DESC)
    sortOrder?: SortOrder;
}
