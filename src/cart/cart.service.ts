import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateCartDto, CartItemDto, UpdateCartItemDto, PaginationCartDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { envs } from 'src/config/env.schema';
import { OrderBy } from 'src/orders/dto';

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

  async findAll(paginationCartDto: PaginationCartDto) {
    try {
      const {
        page = 1,
        limit = envs.limit,
        orderBy = OrderBy.DESC,
      } = paginationCartDto

      const take = Number(limit);
      const skip = (page - 1) * take;

      const [carts, total] = await Promise.all([
        this.prisma.cart.findMany({
          take,
          skip,
          orderBy: {
            createdAt: orderBy === OrderBy.DESC ? 'desc' : 'asc'
          },
          include: {
            user: true,
            items: {
              include: {
                variant: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          }
        }),
        this.prisma.cart.count(),
      ]);

      if (!carts) {
        throw new NotFoundException('No carts found');
      }

      const totalPages = Math.ceil(total / take);
      const prevPage = page > 1 ? true : false;
      const nextPage = page < totalPages ? true : false;

      return {
        total,
        totalPages,
        prevPage,
        nextPage,
        page,
        limit,
        carts,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding carts');
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

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
