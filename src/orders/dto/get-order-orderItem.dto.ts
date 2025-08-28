import { Currency, OrderStatus, Payment, Size } from "@prisma/client"
import { Type } from "class-transformer"
import { IsArray, IsDate, IsEnum, IsJSON, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"

export class GetOrderDto {
    @IsString()
    id: string

    @IsNumber()
    @IsPositive()
    number: number

    @IsString()
    userId: string

    @IsEnum(OrderStatus)
    status: OrderStatus

    @IsEnum(Currency)
    currency: Currency

    @IsNumber()
    @IsPositive()
    subtotal: number

    @IsNumber()
    @IsPositive()
    shipping: number

    @IsNumber()
    @IsPositive()
    tax: number

    @IsNumber()
    @IsPositive()
    discount: number

    @IsNumber()
    @IsPositive()
    total: number

    @IsArray()
    @ValidateNested()
    @Type(() => GetOrderItemDto)
    items: GetOrderItemDto[]

    // @IsOptional()
    // @IsEnum(PaymentStatus)
    // payment: Payment

    @IsJSON()
    shippingAddress: JSON

    @IsJSON()
    @IsOptional()
    billingAddress?: JSON

    mpPreferenceId: string

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date
}

export class GetOrderItemDto {
    @IsString()
    id: string;

    @IsString()
    orderId: string;

    @IsString()
    variantId: string

    @IsNumber()
    @IsPositive()
    quantity: number

    @IsNumber()
    @IsPositive()
    unitPrice: number

    @IsString()
    productName: string

    @IsString()
    sku: string

    @IsEnum(Size)
    size: Size

    @IsString()
    @IsOptional()
    colorName?: string

    @IsDate()
    createdAt: Date
}