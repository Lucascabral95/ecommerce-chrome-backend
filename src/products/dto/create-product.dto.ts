import { IsString, IsOptional, IsInt, Min, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductStatus, Size } from '@prisma/client';

export class CreateProductVariantDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsString()
    @IsOptional()
    colorId?: string;

    @IsString()
    @IsNotEmpty()
    sku: string;

    @IsString()
    @IsOptional()
    barcode?: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Size)
    size: Size;

    @IsInt()
    @Min(0)
    price: number;

    @IsInt()
    @Min(0)
    stock: number;

    @IsInt()
    @IsOptional()
    weightGrams?: number;
}

export class CreateProductImageDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    position?: number;

    @IsString()
    @IsOptional()
    productId?: string;

    @IsString()
    @IsOptional()
    variantId?: string;
}

export class CreateProductDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    brandId?: string;

    @IsString()
    @IsOptional()
    categoryId?: string;

    @IsInt()
    @Min(0)
    basePrice: number;

    @IsString()
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus = ProductStatus.ACTIVE;
}