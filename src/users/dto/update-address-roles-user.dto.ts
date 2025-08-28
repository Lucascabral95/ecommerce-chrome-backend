import { PartialType } from '@nestjs/mapped-types';
import { CreateAddressUserDto, CreateRolesUserDto } from './create-address-roles-user.dto';

export class UpdateAddressUserDto extends PartialType(CreateAddressUserDto) { }

export class UpdateRolesUserDto extends PartialType(CreateRolesUserDto) { }