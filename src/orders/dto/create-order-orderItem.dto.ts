import { ApiProperty } from "@nestjs/swagger";
import { Currency, OrderStatus, Size } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, ValidateNested, Min, IsObject } from "class-validator";

// BillingAddress 
export class BillingAddress {
    @ApiProperty({ description: 'Street address including building number', example: 'Av. Corrientes 1234' })
    @IsString()
    street: string;

    @ApiProperty({ description: 'City name', example: 'Buenos Aires' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State or province', example: 'CABA' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Postal or ZIP code', example: 'C1043' })
    @IsString()
    postalCode: string;

    @ApiProperty({ description: 'Country name', example: 'Argentina' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'Full name of the contact person', example: 'Juan Pérez' })
    @IsString()
    contactName: string;

    @ApiProperty({ description: 'Contact phone number with country code', example: '+541112345678', required: false })
    @IsString()
    @IsOptional()
    phone?: string;
}

// ShippingAddress 
export class ShippingAddress extends BillingAddress {
    @ApiProperty({ description: 'Tax ID (CUIL)', example: '2034567890', required: false })
    @IsString()
    @IsOptional()
    taxId: string; // CUIL
}

export class CreateOrderDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'ID of the user placing the order', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'Current status of the order', enum: OrderStatus, example: OrderStatus.PENDING, required: false })
    @IsEnum(OrderStatus)
    @IsOptional()
    status?: OrderStatus;

    @ApiProperty({ description: 'Currency used for the order', enum: Currency, example: Currency.ARS, required: false })
    @IsEnum(Currency)
    @IsOptional()
    currency?: Currency;

    @ApiProperty({ description: 'Order subtotal amount (before taxes and shipping)', example: 9999.99, required: true })
    @IsNumber()
    @IsPositive()
    subtotal: number;

    @ApiProperty({ description: 'Shipping cost', example: 1500.00, required: false })
    @IsNumber()
    @IsOptional()
    shipping?: number;

    @ApiProperty({ description: 'Tax amount', example: 2100.00, required: false })
    @IsNumber()
    @IsOptional()
    tax?: number;

    @ApiProperty({ description: 'Discount amount', example: 1000.00, required: false })
    @IsNumber()
    @IsOptional()
    discount?: number;

    @ApiProperty({ description: 'Total order amount (subtotal + shipping + tax - discount)', example: 12599.99, required: true })
    @IsNumber()
    @IsPositive()
    total: number;

    @ApiProperty({ description: 'Shipping address information', type: ShippingAddress, required: true })
    @Type(() => ShippingAddress)
    @ValidateNested({ each: true })
    @IsObject()
    shippingAddress: ShippingAddress;

    @ApiProperty({ description: 'Billing address information (if different from shipping)', type: BillingAddress, required: false })
    @Type(() => BillingAddress)
    @ValidateNested({ each: true })
    @IsObject()
    @IsOptional()
    billingAddress?: BillingAddress;

    @ApiProperty({ description: 'MercadoPago preference ID (if payment was processed through MP)', example: '1234567890-abc123-456def', required: false })
    @IsString()
    @IsOptional()
    mpPreferenceId?: string;
}

export class CreateOrderItemDto {
    @ApiProperty({ description: 'Order item ID (auto-generated if not provided)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'ID of the parent order', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    @IsNotEmpty()
    orderId: string

    @ApiProperty({ description: 'ID of the product variant being ordered', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    @IsNotEmpty()
    variantId: string

    @ApiProperty({ description: 'Number of units ordered', example: 2, minimum: 1 })
    @IsNumber()
    @IsPositive()
    @Min(1)
    quantity: number

    @ApiProperty({ description: 'Price per unit in the smallest currency unit (e.g., cents)', example: 2999, minimum: 0 })
    @IsNumber()
    @IsPositive()
    @Min(0)
    unitPrice: number

    @ApiProperty({ description: 'Name of the product at the time of purchase', example: 'Classic White T-Shirt', required: true })
    @IsString()
    @IsNotEmpty()
    productName: string

    @ApiProperty({ description: 'Stock Keeping Unit of the product variant', example: 'TSHIRT-WHITE-M', required: true })
    @IsString()
    @IsNotEmpty()
    sku: string

    @ApiProperty({ description: 'Size of the product variant', enum: Size, example: Size.M, required: true })
    @IsEnum(Size)
    @IsNotEmpty()
    size: Size

    @ApiProperty({ description: 'Color name of the product variant (if applicable)', example: 'White', required: false })
    @IsString()
    @IsOptional()
    colorName?: string
}