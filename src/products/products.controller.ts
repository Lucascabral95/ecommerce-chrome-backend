import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, CreateProductImageDto, CreateProductVariantDto, UpdateProductDto, UpdateProductImageDto, UpdateProductVariantDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  /// Product Variant
  @Get('variant')
  findAllVariant() {
    return this.productsService.findAllVariant();
  }

  @Get('variant/:variantId')
  findOneVariant(@Param('variantId') variantId: string) {
    return this.productsService.findOneVariant(variantId);
  }

  @Post('variant')
  createVariant(@Body() createProductVariantDto: CreateProductVariantDto) {
    return this.productsService.createVariant(createProductVariantDto);
  }

  @Patch('variant/:variantId')
  updateVariant(@Param('variantId') variantId: string, @Body() updateProductVariantDto: UpdateProductVariantDto) {
    return this.productsService.updateVariant(variantId, updateProductVariantDto);
  }

  @Delete('variant/:variantId')
  removeVariant(@Param('variantId') variantId: string) {
    return this.productsService.removeVariant(variantId);
  }

  ///////
  /// Product 
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }

  /// Create Product Image
  @Post('image')
  createImage(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productsService.createImage(createProductImageDto);
  }

  @Delete('image/:imageId')
  removeImage(@Param('imageId') imageId: string) {
    return this.productsService.removeImage(imageId);
  }

  @Patch('image/:imageId')
  updateImage(@Param('imageId') imageId: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productsService.updateImage(imageId, updateProductImageDto);
  }

}
