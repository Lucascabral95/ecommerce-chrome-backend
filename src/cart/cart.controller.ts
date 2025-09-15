import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, CartItemDto, UpdateCartItemDto, PaginationCartDto, GetCartDto, GetAllCartsDto, GetAllAndByIdCartsItemsDto, ResponseCreateCartDto, CartDto } from './dto';
import { ApiOperation, ApiParam, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('user/:userId')  // Obtener carrito de usuario (por userId)
  @ApiOperation({ summary: 'Get user cart by id', description: 'Get user cart by id' })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: GetAllCartsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getUserCartById(@Param('userId') userId: string) {
    return this.cartService.getUserCartById(userId);
  }

  @Get(':cartId/total')  // Obtener el precio total del carrito
  @ApiOperation({ summary: 'Get total price of cart by id', description: 'Get total price of cart by id' })
  @ApiParam({
    name: 'cartId',
    description: 'Cart id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetAllCartsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  getTotal(@Param('cartId') cartId: string) {
    return this.cartService.getTotalByCartId(cartId);
  }

  @Delete(':cartId/clear')  // Limpiar el carrito completo
  @ApiOperation({ summary: 'Clear cart by id', description: 'Clear cart by id' })
  @ApiResponse({ status: 200, type: String, description: "Cart cleared successfully" })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  clearCart(@Param('cartId') cartId: string) {
    return this.cartService.clearCart(cartId);
  }

  @Post("add/:cartId/items/:variantId") // Agregar item al carrito (con quantity, si tiene el producto, aumenta la cantidad)
  @ApiOperation({ summary: 'Add item to cart by id', description: 'Add item to cart by id' })
  @ApiParam({
    name: 'cartId',
    description: "Cart id",
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiParam({
    name: 'variantId',
    description: "Variant id",
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: String, description: "Item added to cart successfully" })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  createItem(@Param('cartId') cartId: string, @Param('variantId') variantId: string, @Body() createCartItemDto: CartItemDto) {
    return this.cartService.createItem(cartId, variantId, createCartItemDto);
  }

  @Delete(':cartId/items/:itemId') // Eliminar item del carrito
  @ApiOperation({
    summary: 'Delete item from cart',
    description: 'Remove a specific item from the shopping cart'
  })
  @ApiParam({
    name: 'cartId',
    description: 'ID of the cart',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID of the item to remove from cart',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({
    status: 200,
    description: 'Item successfully removed from cart'
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 404,
    description: 'Cart or item not found'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  deleteItem(@Param('cartId') cartId: string, @Param('itemId') itemId: string) {
    return this.cartService.deleteItem(cartId, itemId);
  }

  @Get(':cartId/summary') // Obtener resumen del carrito para checkout
  @ApiOperation({
    summary: 'Get cart summary',
    description: 'Retrieves a summary of the cart including items, quantities, and total amount'
  })
  @ApiParam({
    name: 'cartId',
    description: 'ID of the cart to get summary for',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({
    status: 200,
    description: 'Cart summary successfully retrieved',
    type: GetCartDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required'
  })
  @ApiResponse({
    status: 404,
    description: 'Cart not found'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  getCartSummary(@Param('cartId') cartId: string) {
    return this.cartService.getCartSummary(cartId);
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  @Get('cart/items')
  @ApiOperation({ summary: 'Get all cart items', description: 'Get all cart items' })
  @ApiParam({
    name: 'id',
    description: 'Cart id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: [GetAllAndByIdCartsItemsDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  allItems(@Param('id') id: string) {
    return this.cartService.getUserCartById(id);
  }

  @Get('cart/items/:cartItemsId')
  @ApiOperation({ summary: 'Get cart items by cart items id', description: 'Get cart items by cart items id' })
  @ApiParam({
    name: 'cartItemsId',
    description: 'Cart items id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetAllAndByIdCartsItemsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart items not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findItems(@Param('cartItemsId') cartItemsId: string) {
    return this.cartService.findItems(cartItemsId);
  }

  @Post()
  @ApiOperation({ summary: 'Create cart', description: 'Create cart' })
  @ApiResponse({ status: 200, type: ResponseCreateCartDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all carts',
    description: 'Retrieves a paginated list of carts with optional filtering'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of carts',
    type: GetAllCartsDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  findAll(@Query() paginationCartDto: PaginationCartDto) {
    return this.cartService.findAll(paginationCartDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get cart by id',
    description: 'Retrieves a cart by id'
  })
  @ApiParam({
    name: 'id',
    description: 'Cart id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved cart',
    type: CartDto
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Authentication required'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  // Cart Items
  @Patch(':itemId/items')
  @ApiOperation({ summary: 'Update cart item', description: 'Update cart item' })
  @ApiParam({
    name: 'itemId',
    description: 'Cart item id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: CartDto, description: 'Successfully updated cart item' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  updateCartItem(@Param('itemId') itemId: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartService.updateCartItem(itemId, updateCartItemDto);
  }
}
