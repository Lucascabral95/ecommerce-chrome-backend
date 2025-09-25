import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { Color, CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateTagDto, ResponseCreateColorDto, ResponseCreateTagDto, TagDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetBrandsDto, ResponseCreateBrandDto } from 'src/brands/dto';
import { GetCategoryDto, ResponseCreateCategoryDto } from 'src/categories/dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  /// Brands
  @Post('brand')
  @ApiOperation({ summary: 'Create a new brand', description: 'Create a new brand' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseCreateBrandDto })
  @ApiResponse({ status: 400, description: 'Brand already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  // @UseGuards(JwtAuthGuard)
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.catalogService.createBrand(createBrandDto);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Find all brands', description: 'Find all brands' })
  @ApiResponse({ status: 200, type: [GetBrandsDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findBrandsAll() {
    return this.catalogService.findBrandsAll();
  }

  @Get('brand/:slug')
  @ApiOperation({ summary: 'Find a brand by slug', description: 'Find a brand by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Brand slug',
    required: true,
    type: String,
    example: 'casual'
  })
  @ApiResponse({ status: 200, type: GetBrandsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOneBrand(@Param('slug') slug: string) {
    return this.catalogService.findOneBrand(slug);
  }

  /// Categories
  @Post('category')
  @ApiOperation({ summary: 'Create a new category', description: 'Create a new category' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseCreateCategoryDto })
  @ApiResponse({ status: 400, description: 'Category already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  //@UseGuards(JwtAuthGuard)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.catalogService.createCategory(createCategoryDto);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Find all categories', description: 'Find all categories' })
  @ApiResponse({ status: 200, type: [GetCategoryDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findCategoriesAll() {
    return this.catalogService.findCategoriesAll();
  }

  @Get('category/:slug')
  @ApiOperation({ summary: 'Find a category by slug', description: 'Find a category by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Category slug',
    required: true,
    type: String,
    example: 'casual'
  })
  @ApiResponse({ status: 200, type: GetCategoryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOneCategory(@Param('slug') slug: string) {
    return this.catalogService.findOneCategory(slug);
  }

  /// Colors
  @Post('color')
  @ApiOperation({ summary: 'Create a new color', description: 'Create a new color' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseCreateColorDto })
  @ApiResponse({ status: 400, description: 'Color already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  //@UseGuards(JwtAuthGuard)
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.catalogService.createColor(createColorDto);
  }

  @Get('colors')
  @ApiOperation({ summary: 'Find all colors', description: 'Find all colors' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Color] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  findColorsAll() {
    return this.catalogService.findColorsAll();
  }

  @Get('color/:id')
  @ApiOperation({ summary: 'Find a color by id', description: 'Find a color by id' })
  @ApiParam({
    name: 'id',
    description: 'Color id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: Color })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOneColor(@Param('id') id: string) {
    return this.catalogService.findOneColor(id);
  }

  /// Tags
  @Post('tag')
  @ApiOperation({ summary: 'Create a new tag', description: 'Create a new tag' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ResponseCreateTagDto })
  @ApiResponse({ status: 400, description: 'Tag already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.catalogService.createTag(createTagDto);
  }

  @Get('tag/:slug')
  @ApiOperation({ summary: 'Find a tag by slug', description: 'Find a tag by slug' })
  @ApiParam({
    name: 'slug',
    description: 'Tag slug',
    required: true,
    type: String,
    example: 'casual'
  })
  @ApiResponse({ status: 200, type: TagDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOneTag(@Param('slug') slug: string) {
    return this.catalogService.findOneTag(slug);
  }

  @Get('tags')
  @ApiOperation({ summary: 'Find all tags', description: 'Find all tags' })
  @ApiResponse({ status: 200, type: [TagDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findTagsAll() {
    return this.catalogService.findTagsAll();
  }
}
