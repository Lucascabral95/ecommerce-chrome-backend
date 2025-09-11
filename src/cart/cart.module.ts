import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, UsersService],
  exports: [CartService],
})
export class CartModule { }
