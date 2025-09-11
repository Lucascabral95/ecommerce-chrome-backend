import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

class AddressDto {
    @IsString()
    id: string;

    @IsString()
    userId: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsString()
    street1: string;

    @IsString()
    @IsOptional()
    street2?: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    postalCode: string;

    @IsString()
    country: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class GetAddressesDto {
    @IsNumber()
    addressCount: number;

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    firstAddress?: AddressDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[];
}