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

  async findByUser(userId: string) {
    try {
      const cart = await this.prisma.cart.findUnique({ where: { userId } });

      if (!cart) {
        throw new NotFoundException(`Cart with user id: ${userId} not found`);
      }

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart by user');
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
      const cartItemExists = await this.prisma.cartItem.findUnique({
        where: {
          id: itemId
        }
      });

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

  ////
  ////
  // CART OPTIMIZED
  async getUserCartById(userId: string) { // Obtener carrito de usuario (por userId)
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    include: {
                      images: true
                    }
                  }
                },
              }
            }
          }
        }
      });

      if (!cart) {
        throw new NotFoundException(`Cart with user id: ${userId} not found`);
      }

      return cart;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart');
    }
  }

  async getTotalByCartId(cartId: string) { // Obtener el precio total del carrito
    try {
      const cart = await this.findOne(cartId);

      if (!cart) {
        throw new NotFoundException(`Cart with id: ${cartId} not found`);
      }

      const total = cart.items.reduce((acc, item) => acc + item.quantity * item.unitPriceSnap, 0);
      const totalProduct = cart.items.reduce((acc, item) => acc + item.quantity, 0);

      return {
        total: total,
        totalProduct: totalProduct,
        cartId: cart,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding cart');
    }
  }

  async clearCart(cartId: string) { // Limpiar el carrito
    await this.findOne(cartId);
    try {
      await this.prisma.cartItem.deleteMany({
        where: {
          cartId
        }
      });

      return 'Cart cleared successfully';
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error clearing cart');
    }
  }

  async createItem(cartId: string, variantId: string, createCartItemDto: CartItemDto) {
    try {
      const { quantity } = createCartItemDto;

      const cart = await this.findOne(cartId);
      if (!cart) {
        throw new NotFoundException(`Cart with id ${cartId} not found`);
      }

      const productVariant = await this.prisma.productVariant.findUnique({
        where: { id: variantId },
        select: {
          stock: true,
          price: true,
          id: true
        }
      });

      if (!productVariant) {
        throw new NotFoundException(`Product variant with id: ${variantId} not found`);
      }

      if (quantity > productVariant.stock) {
        throw new BadRequestException(`Not enough stock. Available: ${productVariant.stock}`);
      }

      const existingItem = await this.prisma.cartItem.findFirst({
        where: {
          cartId,
          variantId
        }
      });

      let result;
      if (existingItem) {
        result = await this.prisma.cartItem.update({
          where: {
            id: existingItem.id
          },
          data: {
            quantity: existingItem.quantity + quantity,
            unitPriceSnap: productVariant.price
          },
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        });
        return {
          cartItem: result,
          message: 'Cart item quantity updated successfully',
        };
      } else {
        result = await this.prisma.cartItem.create({
          data: {
            cartId,
            variantId,
            quantity,
            unitPriceSnap: productVariant.price
          },
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        });

        return {
          cartItem: result,
          message: 'Cart item added successfully',
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error processing cart item');
    }
  }

  async deleteItem(cartId: string, itemId: string) { // Eliminar item del carrito
    try {
      const cartItem = await this.prisma.cartItem.findUnique({
        where: {
          id: itemId,
        }
      });

      if (!cartItem) {
        throw new NotFoundException(`Cart item with id: ${itemId} not found`);
      }

      if (cartItem.cartId !== cartId) {
        throw new BadRequestException(`Cart item with id: ${itemId} does not belong to cart with id: ${cartId}`);
      }

      await this.prisma.cartItem.delete({
        where:
        {
          id: itemId
        }
      });

      return 'Cart item deleted successfully';
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error deleting cart item');
    }
  }

  async getCartSummary(cartId: string) { // Obtener detalles del carrito para el checkout
    await this.findOne(cartId);
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id:
            cartId
        },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                      images: true,
                    }
                  }
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              roles: true,
            }
          }
        }
      });

      return {
        total: cart?.items?.reduce((acc, item) => acc + item.quantity * item.variant.price, 0),
        ...cart,
      };

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error getting cart summary');
    }
  }
}