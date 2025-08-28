import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from './errors/handler-prisma-error';
import { generateSlug } from 'src/shared/utils/generate-slug';

import roleName from 'mock/Rolename.seed';
import colorsSeed from 'mock/Colors.seed';
import categoriesSeed from 'mock/Categories.seed';
import tagsSeed from 'mock/Tags.seed';
import brandsSeed from 'mock/Brands.seed';
import usersSeed from 'mock/Users.seed';
import userRolesSeed from 'mock/User-Role.seed';
import { hashPassword } from 'src/shared/utils/hashed-password';
import productsSeed from 'mock/Products.seed';
import productVariantsSeed from 'mock/ProductVariants.seed';
import productImagesSeed from 'mock/ProductImages.seed';
import addressesSeed from 'mock/Addresses.seed';
import cartItemsSeed from 'mock/Cart-Items.seed';
import cartSeed from 'mock/Carts.seed';
import orderItemsSeed from 'mock/Orders.item.seed';
import ordersSeed from 'mock/Orders.seed';
import paymentsSeed from 'mock/Payment.seed';
import { Currency, OrderStatus, PaymentProvider, Size } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createSeed() {
    try {
      await this.createDataBasic();
      await this.createSeedProduct();
      await this.createSeedCart();
      await this.createSeedOrder();

      return 'Seed executed successfully';

    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new handlePrismaError(error, 'generateGlobalSeed');
      }
      handlePrismaError(error, 'generateGlobalSeed');
    }
  }

  async createSeedOrder() {
    try {
      await this.prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
          "order_items",
          "payments",
          "orders"
        RESTART IDENTITY CASCADE;
      `);

      await this.prisma.order.createMany({
        data: ordersSeed.map((order) => ({
          id: order.id,
          userId: order.userId,
          status: order.status ?? OrderStatus.PENDING,
          currency: order.currency ?? Currency.ARS,
          subtotal: order.subtotal,
          shipping: order.shipping ?? 0,
          tax: order.tax ?? 0,
          discount: order.discount ?? 0,
          total: order.total,
          shippingAddress: order.shippingAddress as any,
          billingAddress: order.billingAddress ?? undefined,
          mpPreferenceId: order.mpPreferenceId ?? undefined,
        })),
      });

      if (orderItemsSeed?.length) {
        await this.prisma.orderItem.createMany({
          data: orderItemsSeed.map((item) => ({
            id: item.id,
            orderId: item.orderId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            productName: item.productName,
            sku: item.sku,
            size: item.size as Size,
            colorName: item.colorName ?? undefined,
          })),
          skipDuplicates: true,
        });
      }

      if (paymentsSeed?.length) {
        await this.prisma.payment.createMany({
          data: paymentsSeed.map((payment) => ({
            id: payment.id,
            orderId: payment.orderId,
            provider: payment.provider ?? PaymentProvider.MERCADOPAGO,
            status: payment.status,
            amount: payment.amount,
            currency: payment.currency,
            providerPaymentId: payment.providerPaymentId ?? undefined,
            installments: payment.installments ?? undefined,
            method: payment.method ?? undefined,
            capturedAt: payment.capturedAt ?? undefined,
            raw: payment.raw ?? undefined,
          })),
        });
      }

      return { ok: true };
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new handlePrismaError(error, "generateGlobalSeed");
      }
      handlePrismaError(error as any, "generateGlobalSeed");
      throw error;
    }
  }


  async createSeedCart() {
    try {
      await this.prisma.$executeRaw`TRUNCATE TABLE "carts" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "cart_items" RESTART IDENTITY CASCADE;`;

      await this.prisma.cart.createMany({
        data: cartSeed.map(cartItem => ({
          id: cartItem.id,
          userId: cartItem.userId,
          sessionId: cartItem.sessionId,
        })),
      });

      await this.prisma.cartItem.createMany({
        data: cartItemsSeed.map(cartItem => ({
          id: cartItem.id,
          cartId: cartItem.cartId,
          variantId: cartItem.variantId,
          quantity: cartItem.quantity,
          unitPriceSnap: cartItem.unitPriceSnap,
        })),
      });

    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new handlePrismaError(error, 'generateGlobalSeed');
      }
      handlePrismaError(error, 'generateGlobalSeed');
    }
  }

  async createSeedProduct() {
    try {
      await this.prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "product_variants" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "product_images" RESTART IDENTITY CASCADE;`;

      await this.prisma.product.createMany({
        data: productsSeed.map(product => ({
          id: product.id,
          name: product.name,
          slug: generateSlug(product.name),
          description: product.description,
          brandId: product.brandId,
          categoryId: product.categoryId,
          basePrice: product.basePrice,
          status: product.status
        })),
      });

      await this.prisma.productVariant.createMany({
        data: productVariantsSeed.map(productVariant => ({
          id: productVariant.id,
          productId: productVariant.productId,
          colorId: productVariant.colorId,
          sku: productVariant.sku,
          barcode: productVariant.barcode,
          size: productVariant.size,
          price: productVariant.price,
          stock: productVariant.stock,
          weightGrams: productVariant.weightGrams
        })),
      });

      await this.prisma.productImage.createMany({
        data: productImagesSeed.map(productImage => ({
          id: productImage.id,
          productId: productImage.productId,
          variantId: productImage.variantId,
          url: productImage.url,
          alt: productImage.alt,
          position: productImage.position
        })),
      });

    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new handlePrismaError(error, 'generateGlobalSeed');
      }
      handlePrismaError(error, 'generateGlobalSeed');
    }
  }

  async createDataBasic() {
    try {
      await this.prisma.$executeRaw`TRUNCATE TABLE "roles" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "brands" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "colors" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "categories" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "tags" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "user_roles" RESTART IDENTITY CASCADE;`;
      await this.prisma.$executeRaw`TRUNCATE TABLE "addresses" RESTART IDENTITY CASCADE;`;

      await this.prisma.role.createMany({
        data: roleName.map(role => ({
          id: role.id,
          name: role.name
        })),
      });

      await this.prisma.brand.createMany({
        data: brandsSeed.map(brand => ({
          id: brand.id,
          name: brand.name,
          slug: generateSlug(brand.name)
        })),
      });

      await this.prisma.color.createMany({
        data: colorsSeed.map(color => ({
          id: color.id,
          name: color.name,
          hex: color.hex
        })),
      });

      await this.prisma.category.createMany({
        data: categoriesSeed.map(category => ({
          id: category.id,
          name: category.name,
          slug: generateSlug(category.name),
          parentId: category.parentId
        })),
      });

      await this.prisma.tag.createMany({
        data: tagsSeed.map(tag => ({
          id: tag.id,
          name: tag.name,
          slug: generateSlug(tag.name)
        })),
      });

      await this.prisma.user.createMany({
        data: usersSeed.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          hashedPassword: user.hashedPassword,
        })),
      });

      await this.prisma.userRole.createMany({
        data: userRolesSeed.map(userRole => ({
          userId: userRole.userId,
          roleId: userRole.roleId
        })),
      });

      // await this.prisma.address.createMany({
      //   data: addressesSeed.map(address => ({
      //     id: address.id,
      //     userId: address.userId,
      //     firstName: address.firstName,
      //     lastName: address.lastName,
      //     phone: address.phone,
      //     street1: address.street1,
      //     street2: address.street2,
      //     city: address.city,
      //     state: address.state,
      //     zipCode: address.zipCode,
      //     country: address.country,
      //   })),
      // });

      return 'Data basic created successfully';
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new handlePrismaError(error, 'generateGlobalSeed');
      }
      handlePrismaError(error, 'generateGlobalSeed');
    }
  }

}
