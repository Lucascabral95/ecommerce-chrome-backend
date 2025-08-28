import { CreateProductDto, CreateProductVariantDto, CreateProductImageDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) { }

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) { }

export class UpdateProductDto extends PartialType(CreateProductDto) { }
