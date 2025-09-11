import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressUserDto, CreateRolesUserDto } from './create-address-roles-user.dto';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class UpdateAddressUserDto extends PartialType(CreateAddressUserDto) {
    @IsDate()
    @IsOptional()
    createAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}

export class UpdateRolesUserDto extends PartialType(CreateRolesUserDto) { }