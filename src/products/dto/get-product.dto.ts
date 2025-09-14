import { ProductStatus, Size } from "@prisma/client";
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class GetProductDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    slug: string;

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
    basePrice: number;

    @IsString()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    @IsOptional()
    variants?: ProductVariantDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    @IsOptional()
    images?: ProductImageDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TagDto)
    @IsOptional()
    tags?: TagDto[];

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

class ProductVariantDto {
    @IsString()
    id: string;

    @IsString()
    productId: string;

    @IsString()
    @IsOptional()
    colorId?: string;

    @IsString()
    sku: string;

    @IsString()
    @IsOptional()
    barcode?: string;

    @IsEnum(Size)
    size: Size;

    @IsInt()
    price: number;

    @IsInt()
    stock: number;

    @IsInt()
    @IsOptional()
    weightGrams?: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

class ProductImageDto {
    @IsString()
    id: string;

    @IsString()
    url: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsInt()
    position: number;

    @IsString()
    @IsOptional()
    productId?: string;

    @IsString()
    @IsOptional()
    variantId?: string;

    @IsDate()
    createdAt: Date;
}

class TagDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    slug: string;
}

export class GetAllProductsDto {
    @IsNumber()
    @IsPositive()
    page: number;

    @IsNumber()
    @IsPositive()
    limit: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsNumber()
    @IsPositive()
    totalPages: number;

    @IsBoolean()
    prevPage: boolean;

    @IsBoolean()
    nextPage: boolean;

    @Type(() => GetProductDto)
    @ValidateNested({ each: true })
    @IsArray()
    products: GetProductDto[];
}

export class GetProductByIdDto extends GetProductDto { }