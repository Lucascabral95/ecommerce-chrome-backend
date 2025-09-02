import { Currency, OrderStatus, Size } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, ValidateNested } from "class-validator";


// BillingAddress 
export class BillingAddress {
    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    postalCode: string;

    @IsString()
    country: string;

    @IsString()
    contactName: string;

    @IsString()
    @IsOptional()
    phone?: string;
}

// ShippingAddress 
export class ShippingAddress extends BillingAddress {
    @IsString()
    @IsOptional()
    taxId: string; // CUIL
}

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

    @Type(() => ShippingAddress)
    @ValidateNested({ each: true })
    shippingAddress: ShippingAddress;

    @Type(() => BillingAddress)
    @ValidateNested({ each: true })
    @IsOptional()
    billingAddress?: BillingAddress;

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