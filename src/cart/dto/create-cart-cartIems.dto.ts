import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'User id (if user is logged in)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    userId?: string;

    @ApiProperty({ description: 'Session id (if user is not logged in)', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    @IsString()
    @IsOptional()
    sessionId?: string;
}

export class CartItemDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Cart item id', example: '123e4567-e89b-4d89-983d-1234567890ab', required: false })
    id?: string;

    @IsString()
    @ApiProperty({ description: 'Cart id', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    cartId: string;

    @IsString()
    @ApiProperty({ description: 'Variant id', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    variantId: string;

    @IsNumber()
    @ApiProperty({ description: 'Quantity', example: 1, minimum: 1, required: true })
    @Min(1)
    quantity: number;

    @IsNumber()
    @ApiProperty({ description: 'Unit price snap', example: 1, minimum: 0, required: false })
    @Min(0)
    @IsOptional()
    unitPriceSnap?: number;
}

export class ResponseCreateCartDto {
    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    id: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    userId: string;

    @ApiProperty({ example: '123e4567-e89b-4d89-983d-1234567890ab' })
    @IsString()
    sessionId: string;

    @ApiProperty({ example: [CartItemDto] })
    @IsArray()
    @Type(() => CartItemDto)
    @ValidateNested({ each: true })
    items: CartItemDto[];

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ example: '2025-09-14T19:38:50.000Z' })
    @IsDate()
    updatedAt: Date;
}