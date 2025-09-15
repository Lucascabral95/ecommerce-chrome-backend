import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, GetAllOrdersDto, GetOrderByIdDto, PaginationOrderDto, PaginationOrderUserIdDto, UpdateOrderDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post(':userId')
  @ApiOperation({ summary: 'Create order', description: 'Create order' })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 201, type: GetOrderByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Param('userId') userId: string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders', description: 'Get all orders' })
  @ApiResponse({ status: 200, type: GetAllOrdersDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    return this.ordersService.findAll(paginationOrderDto);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get all orders by user', description: 'Get all orders by user' })
  @ApiParam({
    name: 'userId',
    description: 'User id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetOrderByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAllByUserId(@Param('userId') userId: string, @Query() paginationOrderUserIdDto: PaginationOrderUserIdDto) {
    return this.ordersService.findAllByUserId(userId, paginationOrderUserIdDto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by id', description: 'Get order by id' })
  @ApiParam({
    name: 'orderId',
    description: 'Order id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetOrderByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findOne(@Param('orderId') orderId: string) {
    return this.ordersService.findOne(orderId);
  }

  @Post(':orderId/cancel')
  @ApiOperation({ summary: 'Cancel order', description: 'Cancel order' })
  @ApiParam({
    name: 'orderId',
    description: 'Order id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, description: 'Orden cancelada y stock restaurado' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  cancelOrder(@Param('orderId') orderId: string) {  // Cancelar orden
    return this.ordersService.cancelOrder(orderId);
  }

  @Patch(':orderId')
  @ApiOperation({ summary: 'Update order', description: 'Update order' })
  @ApiParam({
    name: 'orderId',
    description: 'Order id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetOrderByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  update(@Param('orderId') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(orderId, updateOrderDto);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Delete order', description: 'Delete order' })
  @ApiParam({
    name: 'orderId',
    description: 'Order id',
    required: true,
    type: String,
    example: '123e4567-e89b-4d89-983d-1234567890ab'
  })
  @ApiResponse({ status: 200, type: GetOrderByIdDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'No orders found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  remove(@Param('orderId') orderId: string) {
    return this.ordersService.remove(orderId);
  }
}
