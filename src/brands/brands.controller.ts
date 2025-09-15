import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto, GetBrandsDto, ResponseCreateBrandDto, ResponseUpdateBrandDto, UpdateBrandDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new brand for a product', description: 'Each product must have a brand' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ResponseCreateBrandDto, description: 'Brand created successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Error creating brand' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brands', description: 'Get all brands' })
  @ApiResponse({ status: 200, type: [GetBrandsDto], description: 'All brands found' })
  @ApiResponse({ status: 404, description: 'No brands found' })
  @ApiResponse({ status: 500, description: 'Error finding brands' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a brand by id', description: 'Get a brand by id' })
  @ApiParam({
    name: 'id',
    description: 'Brand id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetBrandsDto, description: 'Brand found' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Error finding brand' })
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a brand by id', description: 'Update a brand by id' })
  @ApiParam({
    name: 'id',
    description: 'Brand id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ResponseUpdateBrandDto, description: 'Brand updated successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Error updating brand' })
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a brand by id', description: 'Delete a brand by id' })
  @ApiParam({
    name: 'id',
    description: 'Brand id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Brand removed successfully' })
  @ApiResponse({ status: 404, description: 'Brand not found' })
  @ApiResponse({ status: 500, description: 'Error removing brand' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
