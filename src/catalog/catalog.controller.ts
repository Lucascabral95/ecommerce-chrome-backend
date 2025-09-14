import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateTagDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  /// Brands
  @Post('brand')
  @UseGuards(JwtAuthGuard)
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.catalogService.createBrand(createBrandDto);
  }

  @Get('brands')
  findBrandsAll() {
    return this.catalogService.findBrandsAll();
  }

  @Get('brand/:slug')
  findOneBrand(@Param('slug') slug: string) {
    return this.catalogService.findOneBrand(slug);
  }

  /// Categories
  @Post('category')
  @UseGuards(JwtAuthGuard)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.catalogService.createCategory(createCategoryDto);
  }

  @Get('categories')
  findCategoriesAll() {
    return this.catalogService.findCategoriesAll();
  }

  @Get('category/:slug')
  findOneCategory(@Param('slug') slug: string) {
    return this.catalogService.findOneCategory(slug);
  }

  /// Colors
  @Post('color')
  @UseGuards(JwtAuthGuard)
  createColor(@Body() createColorDto: CreateColorDto) {
    return this.catalogService.createColor(createColorDto);
  }

  @Get('colors')
  findColorsAll() {
    return this.catalogService.findColorsAll();
  }

  @Get('color/:id')
  findOneColor(@Param('id') id: string) {
    return this.catalogService.findOneColor(id);
  }

  /// Tags
  @Post('tag')
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.catalogService.createTag(createTagDto);
  }

  @Get('tag/:slug')
  findOneTag(@Param('slug') slug: string) {
    return this.catalogService.findOneTag(slug);
  }

  @Get('tags')
  findTagsAll() {
    return this.catalogService.findTagsAll();
  }
}
