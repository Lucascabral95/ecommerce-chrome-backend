import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order-orderItem.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
