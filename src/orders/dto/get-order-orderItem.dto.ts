import { Currency, OrderStatus, Payment, PaymentStatus, Size } from "@prisma/client"
import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsJSON, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"
import { BillingAddress, ShippingAddress } from "./create-order-orderItem.dto"
import { ApiProperty } from "@nestjs/swagger"

export class GetOrderDto {
    @ApiProperty({
        description: 'Unique identifier of the order',
        example: '123e4567-e89b-4d89-983d-1234567890ab'
    })
    @IsString()
    id: string

    @ApiProperty({
        description: 'Order number (sequential, human-readable identifier)',
        example: 1001
    })
    @IsNumber()
    @IsPositive()
    number: number

    @ApiProperty({
        description: 'ID of the user who placed the order',
        example: '123e4567-e89b-4d89-983d-1234567890ab'
    })
    @IsString()
    userId: string

    @ApiProperty({
        description: 'Current status of the order',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    status: OrderStatus

    @ApiProperty({
        description: 'Currency used for the order',
        enum: Currency,
        example: Currency.ARS
    })
    @IsEnum(Currency)
    currency: Currency

    @ApiProperty({
        description: 'Subtotal amount before taxes and shipping',
        example: 9999
    })
    @IsNumber()
    @IsPositive()
    subtotal: number

    @ApiProperty({
        description: 'Shipping cost',
        example: 1500
    })
    @IsNumber()
    @IsPositive()
    shipping: number

    @ApiProperty({
        description: 'Tax amount',
        example: 2100
    })
    @IsNumber()
    @IsPositive()
    tax: number

    @ApiProperty({
        description: 'Discount amount applied',
        example: 1000
    })
    @IsNumber()
    @IsPositive()
    discount: number

    @ApiProperty({
        description: 'Total amount (subtotal + shipping + tax - discount)',
        example: 12599
    })
    @IsNumber()
    @IsPositive()
    total: number

    @ApiProperty({
        description: 'List of items in the order',
    })
    @IsArray()
    @ValidateNested()
    @Type(() => GetOrderItemDto)
    items: GetOrderItemDto[]

    @ApiProperty({
        description: 'Payment information',
        enum: PaymentStatus,
        required: false
    })
    @IsOptional()
    @IsEnum(PaymentStatus)
    payment: Payment

    @ApiProperty({
        description: 'Shipping address details',
        type: ShippingAddress
    })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ShippingAddress)
    shippingAddress: ShippingAddress

    @ApiProperty({
        description: 'Billing address details (if different from shipping)',
        type: BillingAddress,
        required: false
    })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => BillingAddress)
    @IsOptional()
    billingAddress?: BillingAddress

    @ApiProperty({
        description: 'MercadoPago preference ID (if payment was processed through MP)',
        example: '1234567890-abc123-456def',
        required: false
    })
    @IsString()
    @IsOptional()
    mpPreferenceId?: string

    @ApiProperty({
        description: 'Date when the order was created',
        example: '2023-01-01T00:00:00.000Z'
    })
    @IsDate()
    createdAt: Date

    @ApiProperty({
        description: 'Date when the order was last updated',
        example: '2023-01-01T00:00:00.000Z'
    })
    @IsDate()
    updatedAt: Date
}

export class GetOrderItemDto {
    @IsString()
    id: string;

    @ApiProperty({ description: 'ID of the parent order', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    orderId: string;

    @ApiProperty({ description: 'ID of the product variant being ordered', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    variantId: string

    @ApiProperty({ description: 'Number of units ordered', example: 2, minimum: 1 })
    @IsNumber()
    @IsPositive()
    quantity: number

    @ApiProperty({ description: 'Price per unit in the smallest currency unit (e.g., cents)', example: 2999, minimum: 0 })
    unitPrice: number

    @ApiProperty({ description: 'Name of the product at the time of purchase', example: 'Classic White T-Shirt', required: true })
    @IsString()
    productName: string

    @ApiProperty({ description: 'Stock Keeping Unit of the product variant', example: 'TSHIRT-WHITE-M', required: true })
    @IsString()
    sku: string

    @ApiProperty({ description: 'Size of the product variant', enum: Size, example: Size.M, required: true })
    @IsEnum(Size)
    size: Size

    @ApiProperty({ description: 'Color name of the product variant (if applicable)', example: 'White', required: false })
    @IsString()
    @IsOptional()
    colorName?: string

    @ApiProperty({ description: 'Date when the order item was created', example: '2023-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date
}

export class GetAllOrdersDto {
    @ApiProperty({ description: 'Page number', example: 1 })
    @IsNumber()
    page: number;

    @ApiProperty({ description: 'Number of items per page', example: 10 })
    @IsNumber()
    limit: number;

    @ApiProperty({ description: 'Total number of orders', example: 10 })
    @IsNumber()
    total: number;

    @ApiProperty({ description: 'Previous page number', example: 1 })
    @IsBoolean()
    prevPage: boolean;

    @ApiProperty({ description: 'Next page number', example: 1 })
    @IsBoolean()
    nextPage: boolean;

    @ApiProperty({ description: 'List of orders', type: [GetOrderDto] })
    @Type(() => GetOrderDto)
    @ValidateNested({ each: true })
    @IsArray()
    orders: GetOrderDto[];
}

export class GetOrderByIdDto extends GetOrderDto { }