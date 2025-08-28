import { Currency, OrderStatus, Size } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsJSON } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @IsEnum(Currency)
    @IsOptional()
    currency?: Currency;

    @IsNumber()
    @IsPositive()
    subtotal: number;

    @IsNumber()
    @IsOptional()
    shipping?: number;

    @IsNumber()
    @IsOptional()
    tax?: number;

    @IsNumber()
    @IsOptional()
    discount?: number;

    @IsNumber()
    @IsPositive()
    total: number;

    @IsJSON()
    shippingAddress: JSON;

    @IsJSON()
    @IsOptional()
    billingAddress?: JSON;

    @IsString()
    @IsOptional()
    mpPreferenceId?: string;
}

export class CreateOrderItemDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    orderId: string

    @IsString()
    @IsNotEmpty()
    variantId: string

    @IsNumber()
    @IsPositive()
    quantity: number

    @IsNumber()
    @IsPositive()
    unitPrice: number

    @IsString()
    @IsNotEmpty()
    productName: string

    @IsString()
    @IsNotEmpty()
    sku: string

    @IsEnum(Size)
    @IsNotEmpty()
    size: Size

    @IsString()
    @IsOptional()
    colorName?: string
}
