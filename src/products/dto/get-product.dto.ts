import { ProductStatus, Size } from "@prisma/client";
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class GetProductDto {
    @ApiProperty({ description: 'Unique identifier for the product', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Name of the product', example: 'Product Name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Slug of the product', example: 'product-slug' })
    @IsString()
    slug: string;

    @ApiProperty({ description: 'Description of the product', example: 'Product description' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Brand ID of the product', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    brandId?: string;

    @ApiProperty({ description: 'Category ID of the product', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    categoryId?: string;

    @ApiProperty({ description: 'Base price of the product', example: 19.99 })
    @IsInt()
    basePrice: number;

    @ApiProperty({ description: 'Status of the product', enum: ProductStatus, example: ProductStatus.ACTIVE })
    @IsString()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @ApiProperty({ description: 'Variants of the product', required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    @IsOptional()
    variants?: ProductVariantDto[];

    @ApiProperty({ description: 'Images of the product', required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductImageDto)
    @IsOptional()
    images?: ProductImageDto[];

    @ApiProperty({ description: 'Tags associated with the product', required: false })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TagDto)
    @IsOptional()
    tags?: TagDto[];

    @ApiProperty({ description: 'Creation date of the product', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Last update date of the product', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

class ProductVariantDto {
    @ApiProperty({ description: 'Unique identifier for the variant', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Product ID associated with the variant', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    productId: string;

    @ApiProperty({ description: 'Color ID associated with the variant', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    colorId?: string;

    @ApiProperty({ description: 'SKU of the variant', example: 'SKU-123' })
    @IsString()
    sku: string;

    @ApiProperty({ description: 'Barcode of the variant', example: '1234567890123', required: false })
    @IsString()
    @IsOptional()
    barcode?: string;

    @ApiProperty({ description: 'Size of the variant', enum: Size, example: Size.M })
    @IsEnum(Size)
    size: Size;

    @ApiProperty({ description: 'Price of the variant', example: 19.99 })
    @IsInt()
    price: number;

    @ApiProperty({ description: 'Stock quantity of the variant', example: 10 })
    @IsInt()
    stock: number;

    @ApiProperty({ description: 'Weight of the variant in grams', example: 100, required: false })
    @IsInt()
    @IsOptional()
    weightGrams?: number;

    @ApiProperty({ description: 'Creation date of the variant', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Last update date of the variant', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

class ProductImageDto {
    @ApiProperty({ description: 'Unique identifier for the image', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'URL of the image', example: 'https://example.com/image.jpg' })
    @IsString()
    url: string;

    @ApiProperty({ description: 'Alt text for the image', example: 'Product image', required: false })
    @IsString()
    @IsOptional()
    alt?: string;

    @ApiProperty({ description: 'Position of the image', example: 1 })
    @IsInt()
    position: number;

    @ApiProperty({ description: 'Product ID associated with the image', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    productId?: string;

    @ApiProperty({ description: 'Variant ID associated with the image', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    variantId?: string;

    @ApiProperty({ description: 'Creation date of the image', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;
}

class TagDto {
    @ApiProperty({ description: 'Unique identifier for the tag', example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Name of the tag', example: 'Tag Name' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Slug of the tag', example: 'tag-slug' })
    @IsString()
    slug: string;
}

export class GetAllProductsDto {
    @ApiProperty({ type: Number, example: 1 })
    @IsNumber()
    @IsPositive()
    page: number;

    @ApiProperty({ type: Number, example: 10 })
    @IsPositive()
    limit: number;

    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({ type: Number, example: 1 })
    @IsNumber()
    @IsPositive()
    totalPages: number;

    @ApiProperty({ type: Boolean, example: true })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ type: Boolean, example: true })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ type: [GetProductDto] })
    @Type(() => GetProductDto)
    @ValidateNested({ each: true })
    @IsArray()
    products: GetProductDto[];
}

export class GetProductByIdDto extends GetProductDto { }