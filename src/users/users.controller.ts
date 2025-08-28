import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAddressUserDto, CreateRolesUserDto, UpdateAddressUserDto, UpdateRolesUserDto } from './dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Address 
  @Post(':id/address')
  createAddress(@Param('id') id: string, @Body() createAddressDto: CreateAddressUserDto) {
    return this.usersService.createAddress(id, createAddressDto);
  }

  @Patch(':id/address')
  updateAddress(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressUserDto) {
    return this.usersService.updateAddress(id, updateAddressDto);
  }

  // Roles 
  @Post(':id/role')
  createRole(@Param('id') id: string, @Body() createRoleDto: CreateRolesUserDto) {
    return this.usersService.createRole(id, createRoleDto);
  }

  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRolesUserDto) {
    return this.usersService.updateRole(id, updateRoleDto);
  }

}
