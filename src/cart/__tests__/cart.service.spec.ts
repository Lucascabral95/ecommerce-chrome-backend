import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CartService } from '../cart.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartItemDto, CreateCartDto, PaginationCartDto, UpdateCartItemDto } from '../dto';
import { OrderBy } from 'src/orders/dto';
import * as handlerModule from 'src/errors/handler-prisma-error';

type MockPrismaService = {
  cart: {
    create: jest.Mock;
    findUnique: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
    deleteMany: jest.Mock;
  };
  cartItem: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    findFirst: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    deleteMany: jest.Mock;
  };
  productVariant: {
    findUnique: jest.Mock;
  };
  user: {
    findUnique: jest.Mock;
  };
};

describe('CartService', () => {
  let service: CartService;
  let prisma: MockPrismaService;

  const mockCart = {
    id: 'cart-1',
    userId: 'user-1',
    sessionId: 'session-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'item-1',
        cartId: 'cart-1',
        variantId: 'variant-1',
        quantity: 2,
        unitPriceSnap: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        variant: {
          id: 'variant-1',
          price: 100,
          stock: 10,
          product: {
            id: 'product-1',
            name: 'Product 1',
            slug: 'product-1',
            description: 'desc',
            brandId: 'brand-1',
            categoryId: 'category-1',
            basePrice: 100,
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
            images: [],
          },
        },
      },
    ],
  };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      cart: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        deleteMany: jest.fn(),
      },
      cartItem: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
      productVariant: {
        findUnique: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
    };

    jest.spyOn(handlerModule, 'handlePrismaError').mockImplementation(() => {
      throw new InternalServerErrorException('Database error');
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto: CreateCartDto = {
      userId: 'user-1',
      sessionId: 'session-1',
    };

    it('should create cart when user exists', async () => {
      prisma.user.findUnique.mockResolvedValueOnce({ id: 'user-1' });
      prisma.cart.create.mockResolvedValueOnce(mockCart);

      const result = await service.create(dto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user-1' } });
      expect(prisma.cart.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-1',
          sessionId: 'session-1',
        },
      });
      expect(result).toEqual(mockCart);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
      expect(prisma.cart.create).not.toHaveBeenCalled();
    });
  });

  describe('findByUser', () => {
    it('should return cart by user id', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);

      const result = await service.findByUser('user-1');

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({ where: { userId: 'user-1' } });
      expect(result).toEqual(mockCart);
    });

    it('should throw NotFoundException when cart not found', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(null);

      await expect(service.findByUser('user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    const paginationDto: PaginationCartDto = {
      page: 1,
      limit: 5,
      orderBy: OrderBy.DESC,
    };

    it('should return paginated carts', async () => {
      prisma.cart.findMany.mockResolvedValueOnce([mockCart]);
      prisma.cart.count.mockResolvedValueOnce(1);

      const result = await service.findAll(paginationDto);

      expect(prisma.cart.findMany).toHaveBeenCalledWith({
        take: 5,
        skip: 0,
        orderBy: { createdAt: 'desc' },
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
        },
      });
      expect(result).toEqual({
        total: 1,
        totalPages: 1,
        prevPage: false,
        nextPage: false,
        page: 1,
        limit: 5,
        carts: [mockCart],
      });
    });

    it('should throw if prisma cart findMany returns null', async () => {
      prisma.cart.findMany.mockResolvedValueOnce(null);
      prisma.cart.count.mockResolvedValueOnce(0);

      await expect(service.findAll(paginationDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return cart with included relations', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);

      const result = await service.findOne('cart-1');

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { id: 'cart-1' },
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
      expect(result).toEqual(mockCart);
    });

    it('should throw NotFoundException when cart does not exist', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne('cart-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCartItem', () => {
    const updateDto: UpdateCartItemDto = {
      quantity: 3,
      unitPriceSnap: 150,
    };

    it('should update cart item when exists', async () => {
      prisma.cartItem.findUnique.mockResolvedValueOnce({ id: 'item-1' });
      prisma.cartItem.update.mockResolvedValueOnce({ id: 'item-1', ...updateDto });

      const result = await service.updateCartItem('item-1', updateDto);

      expect(prisma.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'item-1' },
        data: {
          quantity: 3,
          unitPriceSnap: 150,
        },
      });
      expect(result).toEqual({ id: 'item-1', ...updateDto });
    });

    it('should throw NotFoundException when cart item does not exist', async () => {
      prisma.cartItem.findUnique.mockResolvedValueOnce(null);

      await expect(service.updateCartItem('item-1', updateDto)).rejects.toThrow(NotFoundException);
      expect(prisma.cartItem.update).not.toHaveBeenCalled();
    });
  });

  describe('allItems', () => {
    it('should return cart items', async () => {
      prisma.cartItem.findMany.mockResolvedValueOnce([mockCart.items[0]]);

      const result = await service.allItems();

      expect(prisma.cartItem.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockCart.items[0]]);
    });

    it('should throw NotFoundException when no items found', async () => {
      prisma.cartItem.findMany.mockResolvedValueOnce(null);

      await expect(service.allItems()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findItems', () => {
    it('should return cart item by id', async () => {
      prisma.cartItem.findFirst.mockResolvedValueOnce(mockCart.items[0]);

      const result = await service.findItems('item-1');

      expect(prisma.cartItem.findFirst).toHaveBeenCalledWith({ where: { id: 'item-1' } });
      expect(result).toEqual(mockCart.items[0]);
    });

    it('should throw NotFoundException when item not found', async () => {
      prisma.cartItem.findFirst.mockResolvedValueOnce(null);

      await expect(service.findItems('item-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserCartById', () => {
    it('should return cart for user', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);

      const result = await service.getUserCartById('user-1');

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: {
          items: {
            include: {
              variant: {
                include: {
                  product: { include: { images: true } },
                },
              },
            },
          },
        },
      });
      expect(result).toEqual(mockCart);
    });

    it('should throw NotFoundException when cart not found', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(null);

      await expect(service.getUserCartById('user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTotalByCartId', () => {
    it('should calculate totals', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCart as any);

      const result = await service.getTotalByCartId('cart-1');

      expect(service.findOne).toHaveBeenCalledWith('cart-1');
      expect(result).toEqual({
        total: 200,
        totalProduct: 2,
        cartId: mockCart,
      });
    });

    it('should throw NotFoundException when cart not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null as any);

      await expect(service.getTotalByCartId('cart-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('clearCart', () => {
    it('should clear cart items', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCart as any);
      prisma.cartItem.deleteMany.mockResolvedValueOnce({ count: 1 });

      const result = await service.clearCart('cart-1');

      expect(service.findOne).toHaveBeenCalledWith('cart-1');
      expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({ where: { cartId: 'cart-1' } });
      expect(result).toBe('Cart cleared successfully');
    });
  });

  describe('createItem', () => {
    const createItemDto: CartItemDto = {
      cartId: 'cart-1',
      variantId: 'variant-1',
      quantity: 1,
      unitPriceSnap: 100,
    };

    it('should add new cart item when not existing', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCart as any);
      prisma.productVariant.findUnique.mockResolvedValueOnce({ id: 'variant-1', stock: 5, price: 150 });
      prisma.cartItem.findFirst.mockResolvedValueOnce(null);
      prisma.cartItem.create.mockResolvedValueOnce({ id: 'item-2', quantity: 1, unitPriceSnap: 150 });

      const result = await service.createItem('cart-1', 'variant-1', createItemDto);

      expect(prisma.cartItem.create).toHaveBeenCalledWith({
        data: {
          cartId: 'cart-1',
          variantId: 'variant-1',
          quantity: 1,
          unitPriceSnap: 150,
        },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      });
      expect(result).toEqual({
        cartItem: { id: 'item-2', quantity: 1, unitPriceSnap: 150 },
        message: 'Cart item added successfully',
      });
    });

    it('should update existing cart item quantity', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCart as any);
      prisma.productVariant.findUnique.mockResolvedValueOnce({ id: 'variant-1', stock: 10, price: 100 });
      prisma.cartItem.findFirst.mockResolvedValueOnce({ id: 'item-1', quantity: 2 });
      prisma.cartItem.update.mockResolvedValueOnce({ id: 'item-1', quantity: 3, unitPriceSnap: 100 });

      const result = await service.createItem('cart-1', 'variant-1', createItemDto);

      expect(prisma.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'item-1' },
        data: {
          quantity: 3,
          unitPriceSnap: 100,
        },
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      });
      expect(result).toEqual({
        cartItem: { id: 'item-1', quantity: 3, unitPriceSnap: 100 },
        message: 'Cart item quantity updated successfully',
      });
    });

    it('should throw BadRequestException when insufficient stock', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCart as any);
      prisma.productVariant.findUnique.mockResolvedValueOnce({ id: 'variant-1', stock: 0, price: 100 });

      await expect(service.createItem('cart-1', 'variant-1', createItemDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteItem', () => {
    it('should delete cart item successfully', async () => {
      prisma.cartItem.findUnique.mockResolvedValueOnce({ id: 'item-1', cartId: 'cart-1' });

      const result = await service.deleteItem('cart-1', 'item-1');

      expect(prisma.cartItem.delete).toHaveBeenCalledWith({ where: { id: 'item-1' } });
      expect(result).toBe('Cart item deleted successfully');
    });

    it('should surface InternalServerErrorException when cart id mismatch triggers handler', async () => {
      prisma.cartItem.findUnique.mockResolvedValueOnce({ id: 'item-1', cartId: 'different-cart' });

      await expect(service.deleteItem('cart-1', 'item-1')).rejects.toThrow(InternalServerErrorException);
      expect(prisma.cartItem.delete).not.toHaveBeenCalled();
    });
  });

  describe('getCartSummary', () => {
    it('should return cart summary with totals', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCart as any);
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);

      const result = await service.getCartSummary('cart-1');

      expect(service.findOne).toHaveBeenCalledWith('cart-1');
      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { id: 'cart-1' },
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
                    },
                  },
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              roles: true,
            },
          },
        },
      });
      expect(result).toEqual({
        total: 200,
        ...mockCart,
      });
    });
  });
});
