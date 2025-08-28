import { IsOptional, IsString } from "class-validator";

export class CreateAddressUserDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    userId: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    street1: string;

    @IsString()
    @IsOptional()
    street2?: string;

    @IsString()
    city: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsString()
    @IsOptional()
    zipCode?: string;

    @IsString()
    country: string;
}

export class CreateRolesUserDto {
    @IsString()
    userId: string;

    @IsString()
    roleId: string;
}
