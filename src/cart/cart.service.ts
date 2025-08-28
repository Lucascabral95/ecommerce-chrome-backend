import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateCartDto, CartItemDto, UpdateCartItemDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCartDto: CreateCartDto) {
    try {
      const { userId, sessionId } = createCartDto;

      const userExists = await this.prisma.user.findUnique({ where: { id: createCartDto.userId } });

      if (!userExists) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }

      const cart = await this.prisma.cart.create({
        data: {
          userId,
          sessionId,
        }
      });

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error creating cart');
    }
  }

  async createItem(cartId: string, createCartItemDto: CartItemDto) {
    await this.findOne(cartId);

    try {
      const { variantId, quantity, unitPriceSnap } = createCartItemDto;

      const variantExists = await this.prisma.productVariant.findUnique({ where: { id: variantId } });

      if (!variantExists) {
        throw new NotFoundException(`Variant with id: ${variantId} not found`);
      }

      const cartItem = await this.prisma.cartItem.create({
        data: {
          cartId,
          variantId,
          quantity,
          unitPriceSnap,
        }
      });

      return cartItem;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error creating cart item');
    }
  }

  async findAll() {
    try {
      const carts = await this.prisma.cart.findMany();

      if (!carts) {
        throw new NotFoundException('No carts found');
      }

      return carts;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding carts');
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.prisma.cart.findUnique({ where: { id } });

      if (!cart) {
        throw new NotFoundException(`Cart with id: ${id} not found`);
      }

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart');
    }
  }

  async updateCartItem(itemId: string, updateCartItemDto: UpdateCartItemDto) {
    try {
      const cartItemExists = await this.prisma.cartItem.findUnique({ where: { id: itemId } });

      if (!cartItemExists) {
        throw new NotFoundException(`Cart item with id: ${itemId} not found`);
      }

      const { cartId, variantId, ...rest } = updateCartItemDto;

      const cartItem = await this.prisma.cartItem.update({
        where: {
          id: itemId
        },
        data: {
          ...rest,
          quantity: rest.quantity,
          unitPriceSnap: rest.unitPriceSnap
        },
      });

      return cartItem;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error updating cart item');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      const cart = await this.prisma.cart.delete({ where: { id } });

      if (!cart) {
        throw new NotFoundException(`Cart with id: ${id} not found`);
      }

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error removing cart');
    }
  }


  //items 
  async allItems() {
    try {
      const cartItems = await this.prisma.cartItem.findMany();

      if (!cartItems) {
        throw new NotFoundException('No cart items found');
      }

      return cartItems;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart items');
    }
  }

  async findItems(cartItemsId: string) {
    try {
      const cartItems = await this.prisma.cartItem.findFirst({
        where: {
          id: cartItemsId,
        }
      });

      if (!cartItems) {
        throw new NotFoundException(`Cart items with id: ${cartItemsId} not found`);
      }

      return cartItems;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart items');
    }
  }
}
