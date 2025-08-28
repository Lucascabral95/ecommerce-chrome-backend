import { IsArray, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class GetCartDto {
    @IsString()
    @IsString()
    id: string

    @IsString()
    userId: string

    @IsString()
    @IsOptional()
    sessionId?: string

    @IsArray()
    @Type(() => GetCartItemDto)
    @ValidateNested({ each: true })
    items: GetCartItemDto[]

    @IsDate()
    createdAt: Date

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