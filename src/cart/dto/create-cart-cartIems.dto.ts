import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    sessionId?: string;
}

export class CartItemDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    cartId: string;

    @IsString()
    variantId: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unitPriceSnap: number;
}