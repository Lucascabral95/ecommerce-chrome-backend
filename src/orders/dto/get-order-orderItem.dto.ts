import { Currency, OrderStatus, Payment, PaymentStatus, Size } from "@prisma/client"
import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsJSON, IsNumber, IsObject, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator"
import { BillingAddress, ShippingAddress } from "./create-order-orderItem.dto"

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

    @IsOptional()
    @IsEnum(PaymentStatus)
    payment: Payment

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => ShippingAddress)
    shippingAddress: ShippingAddress

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => BillingAddress)
    @IsOptional()
    billingAddress?: BillingAddress

    @IsString()
    @IsOptional()
    mpPreferenceId?: string

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

export class GetAllOrdersDto {
    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;

    @IsNumber()
    total: number;

    @IsBoolean()
    prevPage: boolean;

    @IsBoolean()
    nextPage: boolean;

    @Type(() => GetOrderDto)
    @ValidateNested({ each: true })
    @IsArray()
    orders: GetOrderDto[];
}

export class GetOrderByIdDto extends GetOrderDto { }