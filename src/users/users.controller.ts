import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAddressUserDto, CreateRolesUserDto, PaginationUserDto, UpdateAddressUserDto, UpdateRolesUserDto } from './dto';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@Query() paginationUserDto: PaginationUserDto) {
    return this.usersService.findAll(paginationUserDto);
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

  @Get(':id/address')
  getAddressesById(@Param('id') id: string) {
    return this.usersService.getAddressesById(id);
  }

  @Delete(':addressId/address')
  deleteAddressesById(@Param('addressId') addressId: string) {
    return this.usersService.deleteAddress(addressId);
  }

  @Patch(':userId/address')
  updateAddress(@Param('userId') userId: string, @Body() updateAddressDto: UpdateAddressUserDto) {
    return this.usersService.updateAddress(userId, updateAddressDto);
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
