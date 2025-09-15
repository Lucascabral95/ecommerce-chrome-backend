import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { ProductStatus, Size } from "@prisma/client"
import { ApiProperty } from "@nestjs/swagger"

export class GetCartDto {
    @ApiProperty({ description: 'ID of the cart', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    id: string

    @ApiProperty({ description: 'ID of the user', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    userId: string

    @ApiProperty({ description: 'ID of the session', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    sessionId?: string

    @ApiProperty({ description: 'Items of the cart', required: true })
    @IsArray()
    @Type(() => GetCartItemDto)
    @ValidateNested({ each: true })
    items: GetCartItemDto[]

    @ApiProperty({ description: 'Creation date of the cart', required: true })
    @IsDate()
    createdAt: Date

    @ApiProperty({ description: 'Update date of the cart', required: true })
    @IsDate()
    updatedAt: Date
}

export class GetCartItemDto {
    @IsString()
    id: string

    @IsString()
    cartId: string

    @IsString()
    variantId: string

    @IsNumber()
    quantity: number

    @IsNumber()
    unitPriceSnap: number

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date
}


// Get All Carts
export class GetAllAndByIdCartsItemsDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    cartId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    variantId: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: 100 })
    @IsNumber()
    unitPriceSnap: number;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;
}

class UserDto {
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

class ProductDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: 'Pantalon de Vestir Turquesa XL' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'pantalon_de_vestir_turquesa_xl' })
    @IsString()
    slug: string;

    @ApiProperty({ example: 'Un pantalon de vestir de color turquesa con un corte recto y un cierre con botones.' })
    @IsString()
    description: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    brandId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    categoryId: string;

    @ApiProperty({ example: 100 })
    @IsNumber()
    basePrice: number;

    @ApiProperty({ example: ProductStatus.ACTIVE })
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;
}

class VariantProductDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    productId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    colorId: string;

    @ApiProperty({ example: Size.XL })
    @IsEnum(Size)
    size: Size;

    @ApiProperty({ example: 100 })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 10 })
    @IsNumber()
    stock: number;

    @ApiProperty({ example: 100 })
    @IsNumber()
    weightGrams: number;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ type: ProductDto })
    @IsObject()
    @Type(() => ProductDto)
    @ValidateNested({ each: true })
    product: ProductDto
}

class CartItemsDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    cartId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    variantId: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    quantity: number;

    @ApiProperty({ example: 100 })
    @IsNumber()
    unitPriceSnap: number;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ type: VariantProductDto })
    @IsObject()
    @Type(() => VariantProductDto)
    @ValidateNested({ each: true })
    variant: VariantProductDto;
}

export class CartDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    userId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    sessionId: string;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;

    @ApiProperty({ type: UserDto })
    @IsObject()
    @Type(() => UserDto)
    @ValidateNested({ each: true })
    user: UserDto;

    @ApiProperty({ type: [CartItemsDto] })
    @IsArray()
    @Type(() => CartItemsDto)
    @ValidateNested({ each: true })
    items: CartItemsDto[];
}

export class GetAllCartsDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    total: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    totalPages: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ example: true })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ example: 1 })
    @IsNumber()
    page: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    limit: number;

    @ApiProperty({ type: [CartDto] })
    @IsArray()
    @Type(() => CartDto)
    @ValidateNested({ each: true })
    carts: CartDto[];
}