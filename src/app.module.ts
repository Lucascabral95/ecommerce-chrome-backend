import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CatalogModule } from './catalog/catalog.module';
import { StripeModule } from './stripe-ecommerce-doraemon/stripe/stripe.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, ProductsModule, CategoriesModule, BrandsModule, CartModule, OrdersModule, PaymentsModule, CatalogModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
