import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
