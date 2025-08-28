import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersModule } from 'src/orders/orders.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, OrdersModule,
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    })
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, OrdersService],
  exports: [PaymentsService]
})
export class PaymentsModule { }
