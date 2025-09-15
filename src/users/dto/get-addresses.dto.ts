import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class AddressDto {
    @ApiProperty({ description: 'ID of the address', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    id: string;

    @ApiProperty({ description: 'ID of the user', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'First name of the user', example: 'John', required: true })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Last name of the user', example: 'Doe', required: true })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Phone number of the user', example: '123456789', required: true })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'First line of the user address', example: '123 Main St', required: true })
    @IsString()
    street1: string;

    @ApiProperty({ description: 'Second line of the user address', example: 'Apt 1', required: false })
    @IsString()
    @IsOptional()
    street2?: string;

    @ApiProperty({ description: 'City of the user address', example: 'New York', required: true })
    @IsString()
    city: string;

    @ApiProperty({ description: 'State of the user address', example: 'New York', required: false })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty({ description: 'Postal code of the user address', example: '12345', required: false })
    @IsString()
    @IsOptional()
    postalCode?: string;

    @ApiProperty({ description: 'Country of the user address', example: 'USA', required: true })
    @IsString()
    country: string;

    @ApiProperty({ description: 'Address created at', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    createdAt: Date;

    @ApiProperty({ description: 'Address updated at', example: '2022-01-01T00:00:00.000Z' })
    @IsDate()
    updatedAt: Date;
}

export class GetAddressesDto {
    @ApiProperty({ description: 'Number of addresses', example: 2 })
    @IsNumber()
    addressCount: number;

    @ApiProperty({ description: 'First address', example: { id: '123e4567-e89b-4d17-85e8-697eb7772111' } })
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    firstAddress?: AddressDto;

    @ApiProperty({ description: 'List of addresses', example: [{ id: '123e4567-e89b-4d17-85e8-697eb7772111' }] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[];
}