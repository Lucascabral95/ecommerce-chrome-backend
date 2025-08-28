import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, CartItemDto, UpdateCartItemDto, PaginationCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('cart/items')
  allItems() {
    return this.cartService.allItems();
  }

  @Get('cart/items/:cartItemsId')
  findItems(@Param('cartItemsId') cartItemsId: string) {
    return this.cartService.findItems(cartItemsId);
  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post(':id/items')
  createItem(@Param('id') cartId: string, @Body() createCartItemDto: CartItemDto) {
    return this.cartService.createItem(cartId, createCartItemDto);
  }

  @Get()
  findAll(@Query() paginationCartDto: PaginationCartDto) {
    return this.cartService.findAll(paginationCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':itemId/items')
  updateCartItem(@Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(itemId, updateCartItemDto);
  }

  @Delete(':id/items')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
