import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressUserDto, CreateRolesUserDto } from './create-address-roles-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateAddressUserDto extends PartialType(CreateAddressUserDto) {
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}

export class UpdateRolesUserDto extends PartialType(CreateRolesUserDto) { }

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;
}