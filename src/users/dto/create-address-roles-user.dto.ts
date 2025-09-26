import { IsOptional, IsString } from "class-validator";
import { AddressDto } from "./get-addresses.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAddressUserDto {
    @IsString()
    @IsOptional()
    id?: string;

    @ApiProperty({ description: 'ID of the user', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'First name of the user', example: 'John', required: true })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Last name of the user', example: 'Doe', required: true })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Phone number of the user', example: '1234567890', required: false })
    @IsString()
    @IsOptional()
    phone?: string;

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
}

export class CreateRolesUserDto {
    @ApiProperty({ description: 'ID of the user', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    userId: string;

    @ApiProperty({ description: 'ID of the role', example: '123e4567-e89b-4d89-983d-1234567890ab', required: true })
    @IsString()
    roleId: string;
}

export class ResponseCreateAddressUserDto extends AddressDto { }