import { IsString, IsOptional, IsInt, Min, IsNotEmpty, IsEnum } from 'class-validator';
import { ProductStatus, Size } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductVariantDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'ID of the parent product', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'ID of the color variant (if applicable)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    colorId?: string;

    @ApiProperty({ description: 'Stock Keeping Unit (unique identifier for inventory tracking)', example: 'PROD-RED-XL-001', required: true })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty({ description: 'Barcode (EAN, UPC, etc.) for scanning', example: '7791234567890', required: false })
    @IsString()
    @IsOptional()
    barcode?: string;

    @ApiProperty({ description: 'Size of the product variant', enum: Size, example: Size.XL, required: true })
    @IsString()
    @IsNotEmpty()
    @IsEnum(Size)
    size: Size;

    @ApiProperty({ description: 'Price in the smallest currency unit (e.g., cents)', example: 2999, required: true })
    @IsInt()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Available stock quantity', example: 100, minimum: 0, required: true })
    @IsInt()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'Product weight in grams (for shipping calculations)', example: 500, minimum: 0, required: false })
    @IsInt()
    @IsOptional()
    weightGrams?: number;
}

export class CreateProductImageDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'URL of the product image', example: 'https://example.com/image.jpg', required: true })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ description: 'Alternative text for the product image', example: 'Classic White T-Shirt', required: false })
    @IsString()
    @IsOptional()
    alt?: string;

    @ApiProperty({ description: 'Position of the image in the product gallery', example: 1, minimum: 0, required: false })
    @IsInt()
    @Min(0)
    @IsOptional()
    position?: number;

    @ApiProperty({ description: 'ID of the parent product', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    productId?: string;

    @ApiProperty({ description: 'ID of the variant this image belongs to (if applicable)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    variantId?: string;
}

export class CreateProductDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'Name of the product', example: 'Classic White T-Shirt', required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'URL-friendly version of the product name (auto-generated if not provided)', example: 'classic-white-t-shirt', required: false })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({ description: 'Detailed product description', example: '100% cotton t-shirt with a classic fit', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'ID of the brand this product belongs to', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    brandId?: string;

    @ApiProperty({ description: 'ID of the category this product belongs to', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ description: 'Base price in the smallest currency unit (e.g., cents)', example: 1999, minimum: 0, required: true })
    @IsInt()
    @Min(0)
    basePrice: number;

    @ApiProperty({ description: 'Current status of the product', enum: ProductStatus, example: ProductStatus.ACTIVE, required: false })
    @IsString()
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus = ProductStatus.ACTIVE;
}