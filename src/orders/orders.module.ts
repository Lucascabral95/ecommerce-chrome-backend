import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartService } from 'src/cart/cart.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, CartService],
  exports: [OrdersService, CartService],
})
export class OrdersModule { }
