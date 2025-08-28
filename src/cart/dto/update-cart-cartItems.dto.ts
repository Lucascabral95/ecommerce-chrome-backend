import { PartialType } from '@nestjs/mapped-types';
import { CartItemDto } from './create-cart-cartIems.dto';

export class UpdateCartItemDto extends PartialType(CartItemDto) { }
