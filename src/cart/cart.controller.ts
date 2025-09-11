import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, CartItemDto, UpdateCartItemDto, PaginationCartDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('user/:userId')  // Obtener carrito de usuario (por userId)
  getUserCartById(@Param('userId') userId: string) {
    return this.cartService.getUserCartById(userId);
  }

  @Get(':cartId/total')  // Obtener el precio total del carrito
  getTotal(@Param('cartId') cartId: string) {
    return this.cartService.getTotalByCartId(cartId);
  }

  @Delete(':cartId/clear')  // Limpiar el carrito completo
  clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(cartId);
  }

  @Post("add/:cartId/items/:variantId") // Agregar item al carrito (con quantity, si tiene el producto, aumenta la cantidad)
  createItem(@Param('cartId') cartId: string, @Param('variantId') variantId: string, @Body() createCartItemDto: CartItemDto) {
    return this.cartService.createItem(cartId, variantId, createCartItemDto);
  }

  @Delete(':cartId/items/:itemId') // Eliminar item del carrito
  deleteItem(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.deleteItem(cartId, itemId);
  }

  @Get(':cartId/summary') // Obtener resumen del carrito para checkout
  getCartSummary(@Param('cartId') cartId: string) {
    return this.cartService.getCartSummary(cartId);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  @Get('cart/items')
  ////////////////////////////////////////////////////////////////////////////////////////
  allItems(@Param('id') id: string) {
    return this.cartService.getUserCartById(id);
  }

  @Get('cart/items/:cartItemsId')
  findItems(@Param('cartItemsId') cartItemsId: string) {
    return this.cartService.findItems(cartItemsId);
  }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll(@Query() paginationCartDto: PaginationCartDto) {
    return this.cartService.findAll(paginationCartDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  // Cart Items
  @Patch(':itemId/items')
  updateCartItem(@Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(itemId, updateCartItemDto);
  }
}
