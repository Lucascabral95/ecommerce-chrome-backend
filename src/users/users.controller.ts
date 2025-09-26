import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAddressUserDto, CreateRolesUserDto, GetAddressesDto, GetUserDto, PaginationUserDto, ResponseCreateAddressUserDto, UpdateAddressUserDto, UpdateRolesUserDto, UpdateUserDto, User } from './dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetRoleDto } from './roles';
import { SortOrder } from 'src/products/dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users with filters and pagination', description: 'Retrieve a paginated list of users with optional filters' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Items per page' })
  @ApiQuery({ name: 'name', required: false, type: String, example: 'John', description: 'Filter by user name' })
  @ApiQuery({ name: 'email', required: false, type: String, example: 'john@example.com', description: 'Filter by user email' })
  @ApiQuery({ name: 'orderBy', required: false, enum: SortOrder, description: 'Sort order for results' })
  @ApiResponse({ status: 200, type: GetUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not users found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() paginationUserDto: PaginationUserDto) {
    return this.usersService.findAll(paginationUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id', description: 'Get user by id' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUserById(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }

  // Address 
  @Post(':id/address')
  @ApiOperation({ summary: 'Create address', description: 'Create address' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 201, type: ResponseCreateAddressUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  createAddress(@Param('id') id: string, @Body() createAddressDto: CreateAddressUserDto) {
    return this.usersService.createAddress(id, createAddressDto);
  }

  @Get(':id/address')
  @ApiOperation({ summary: 'Get addresses by user id', description: 'Get addresses by user id' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetAddressesDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getAddressesById(@Param('id') id: string) {
    return this.usersService.getAddressesById(id);
  }

  @Delete(':addressId/address')
  @ApiOperation({ summary: 'Delete address by id', description: 'Delete address by id' })
  @ApiParam({
    name: 'addressId',
    description: 'Address id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, description: 'Address deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  deleteAddressesById(@Param('addressId') addressId: string) {
    return this.usersService.deleteAddress(addressId);
  }

  @Patch(':userId/address')
  @ApiOperation({ summary: 'Update address by id', description: 'Update address by id' })
  @ApiResponse({ status: 200, type: ResponseCreateAddressUserDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateAddress(@Param('userId') userId: string, @Body() updateAddressDto: UpdateAddressUserDto) {
    return this.usersService.updateAddress(userId, updateAddressDto);
  }

  // Roles 
  @Post(':id/role')
  @ApiOperation({ summary: 'Create role', description: 'Create role' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 201, type: GetRoleDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  createRole(@Param('id') id: string, @Body() createRoleDto: CreateRolesUserDto) {
    return this.usersService.createRole(id, createRoleDto);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update role', description: 'Update role' })
  @ApiParam({
    name: 'id',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetRoleDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRolesUserDto) {
    return this.usersService.updateRole(id, updateRoleDto);
  }
}
