import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, CreateProductImageDto, CreateProductVariantDto, GetAllProductsDto, GetProductByIdDto, PaginationProductDto, UpdateProductDto, UpdateProductImageDto, UpdateProductVariantDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GetVariantProductDto } from './dto/get-variant-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  /// Product Variant
  @Get('variant')
  @ApiOperation({ summary: 'Get all product variants', description: 'Retrieve a list of all product variants' })
  @ApiResponse({ status: 200, type: [GetVariantProductDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not variants found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAllVariant() {
    return this.productsService.findAllVariant();
  }

  @Get('variant/:variantId')
  @ApiOperation({ summary: 'Get a product variant by id', description: 'Retrieve a product variant by id' })
  @ApiResponse({ status: 200, type: GetVariantProductDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOneVariant(@Param('variantId') variantId: string) {
    return this.productsService.findOneVariant(variantId);
  }

  @Post('variant')
  @ApiOperation({ summary: 'Create a product variant', description: 'Create a product variant' })
  @ApiResponse({ status: 201, type: GetVariantProductDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  createVariant(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productsService.createVariant(createProductVariantDto);
  }

  @Patch('variant/:variantId')
  @ApiOperation({ summary: 'Update a product variant', description: 'Update a product variant' })
  @ApiResponse({ status: 200, type: GetVariantProductDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  updateVariant(@Param('variantId') variantId: string, @Body() updateProductVariantDto: UpdateProductVariantDto) {
    return this.productsService.updateVariant(variantId, updateProductVariantDto);
  }

  @Delete('variant/:variantId')
  @ApiOperation({ summary: 'Delete a product variant', description: 'Delete a product variant' })
  @ApiParam({
    name: 'variantId',
    description: 'Variant id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Variant deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Variant not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  removeVariant(@Param('variantId') variantId: string) {
    return this.productsService.removeVariant(variantId);
  }

  /// Product 
  @Post()
  @ApiOperation({ summary: 'Create a product', description: 'Create a product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: GetAllProductsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Retrieve a list of all products' })
  @ApiResponse({ status: 200, type: GetAllProductsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query() paginationProductDto: PaginationProductDto) {
    return this.productsService.findAll(paginationProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id', description: 'Retrieve a product by id' })
  @ApiResponse({ status: 200, type: GetProductByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product', description: 'Update a product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: GetProductByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product', description: 'Delete a product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }

  /// Create Product Image
  @Post('image')
  @ApiOperation({ summary: 'Create a product image', description: 'Create a product image' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: String, description: 'Product image created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  createImage(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productsService.createImage(createProductImageDto);
  }

  @Delete('image/:imageId')
  @ApiOperation({ summary: 'Delete a product image', description: 'Delete a product image' })
  @ApiParam({
    name: 'imageId',
    description: 'Image id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Product image deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product image not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  removeImage(@Param('imageId') imageId: string) {
    return this.productsService.removeImage(imageId);
  }

  @Patch('image/:imageId')
  @ApiOperation({ summary: 'Update a product image', description: 'Update a product image' })
  @ApiResponse({ status: 200, type: String, description: 'Product image updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product image not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @UseGuards(JwtAuthGuard)
  updateImage(@Param('imageId') imageId: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productsService.updateImage(imageId, updateProductImageDto);
  }
}
