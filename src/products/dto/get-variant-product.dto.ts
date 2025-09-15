import { ProductStatus, Size } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

class Product {
    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ type: String, example: 'Remera de manga corta' })
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: 'remera_de_manga_corta' })
    @IsString()
    slug: string;

    @ApiProperty({ type: String, example: 'Remera de manga larga en algodón peinado, cuello redondo y corte clásico. Ideal para usar como base en looks casuales o deportivos. Tela suave y transpirable que brinda comodidad durante todo el día' })
    @IsString()
    description: string;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    brandId: string;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    categoryId: string;

    @ApiProperty({ type: Number, example: 100 })
    @IsNumber()
    basePrice: number;

    @ApiProperty({ type: String, example: 'ACTIVE' })
    @IsEnum(ProductStatus)
    status: ProductStatus;
}

export class GetVariantProductDto {
    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    productId: string;

    @ApiProperty({ type: String, example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    colorId: string;

    @ApiProperty({ type: String, example: 'SKU-123' })
    @IsString()
    sku: string;

    @ApiProperty({ type: String, example: 'barcode-123' })
    @IsString()
    barcode: string;

    @ApiProperty({ type: String, example: 'S' })
    @IsEnum(Size)
    size: Size;

    @ApiProperty({ type: Number, example: 100 })
    @IsNumber()
    price: number;

    @ApiProperty({ type: Number, example: 10 })
    @IsNumber()
    stock: number;

    @ApiProperty({ type: Number, example: 100 })
    @IsNumber()
    weightGrams: number;

    @ApiProperty({ type: Date, example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ type: Date, example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ type: Product })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Product)
    product: Product;
}