import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from '../cart.controller';
import { CartService } from '../cart.service';
import { CartItemDto, CreateCartDto, PaginationCartDto, UpdateCartItemDto } from '../dto';

type MockCartService = {
  getUserCartById: jest.Mock;
  getTotalByCartId: jest.Mock;
  clearCart: jest.Mock;
  createItem: jest.Mock;
  deleteItem: jest.Mock;
  getCartSummary: jest.Mock;
  findItems: jest.Mock;
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  updateCartItem: jest.Mock;
};

describe('CartController', () => {
  let controller: CartController;
  let cartService: MockCartService;

  const mockCart = {
    id: 'cart-1',
    userId: 'user-1',
    sessionId: 'session-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCartSummary = {
    total: 200,
    totalProduct: 2,
    cartId: mockCart,
  };

  const mockCartItem = {
    id: 'item-1',
    cartId: 'cart-1',
    variantId: 'variant-1',
    quantity: 1,
    unitPriceSnap: 100,
  };

  const mockCreateCartDto: CreateCartDto = {
    userId: 'user-1',
    sessionId: 'session-1',
  };

  const mockPaginationDto: PaginationCartDto = {
    page: 1,
    limit: 10,
  };

  const mockCartItemDto: CartItemDto = {
    cartId: 'cart-1',
    variantId: 'variant-1',
    quantity: 2,
    unitPriceSnap: 100,
  };

  const mockUpdateCartItemDto: UpdateCartItemDto = {
    quantity: 3,
    unitPriceSnap: 150,
  };

  beforeEach(async () => {
    const mockService: MockCartService = {
      getUserCartById: jest.fn(),
      getTotalByCartId: jest.fn(),
      clearCart: jest.fn(),
      createItem: jest.fn(),
      deleteItem: jest.fn(),
      getCartSummary: jest.fn(),
      findItems: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateCartItem: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get(CartService) as unknown as MockCartService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserCartById', () => {
    it('should return cart for user', async () => {
      cartService.getUserCartById.mockResolvedValueOnce(mockCart);

      const result = await controller.getUserCartById('user-1');

      expect(cartService.getUserCartById).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(mockCart);
    });

    it('should propagate errors', async () => {
      const error = new Error('Not found');
      cartService.getUserCartById.mockRejectedValueOnce(error);

      await expect(controller.getUserCartById('user-1')).rejects.toThrow(error);
    });
  });

  describe('getTotal', () => {
    it('should return cart totals', async () => {
      cartService.getTotalByCartId.mockResolvedValueOnce(mockCartSummary);

      const result = await controller.getTotal('cart-1');

      expect(cartService.getTotalByCartId).toHaveBeenCalledWith('cart-1');
      expect(result).toEqual(mockCartSummary);
    });

    it('should propagate errors', async () => {
      const error = new Error('Error');
      cartService.getTotalByCartId.mockRejectedValueOnce(error);

      await expect(controller.getTotal('cart-1')).rejects.toThrow(error);
    });
  });

  describe('clearCart', () => {
    it('should clear cart', async () => {
      cartService.clearCart.mockResolvedValueOnce('Cart cleared successfully');

      const result = await controller.clearCart('cart-1');

      expect(cartService.clearCart).toHaveBeenCalledWith('cart-1');
      expect(result).toBe('Cart cleared successfully');
    });

    it('should propagate errors', async () => {
      const error = new Error('Error');
      cartService.clearCart.mockRejectedValueOnce(error);

      await expect(controller.clearCart('cart-1')).rejects.toThrow(error);
    });
  });

  describe('createItem', () => {
    it('should create cart item', async () => {
      cartService.createItem.mockResolvedValueOnce({
        cartItem: mockCartItem,
        message: 'Cart item added successfully',
      });

      const result = await controller.createItem('cart-1', 'variant-1', mockCartItemDto);

      expect(cartService.createItem).toHaveBeenCalledWith('cart-1', 'variant-1', mockCartItemDto);
      expect(result).toEqual({
        cartItem: mockCartItem,
        message: 'Cart item added successfully',
      });
    });

    it('should propagate errors', async () => {
      const error = new Error('Error');
      cartService.createItem.mockRejectedValueOnce(error);

      await expect(controller.createItem('cart-1', 'variant-1', mockCartItemDto)).rejects.toThrow(error);
    });
  });

  describe('deleteItem', () => {
    it('should delete cart item', async () => {
      cartService.deleteItem.mockResolvedValueOnce('Cart item deleted successfully');

      const result = await controller.deleteItem('cart-1', 'item-1');

      expect(cartService.deleteItem).toHaveBeenCalledWith('cart-1', 'item-1');
      expect(result).toBe('Cart item deleted successfully');
    });

    it('should propagate errors', async () => {
      const error = new Error('Error');
      cartService.deleteItem.mockRejectedValueOnce(error);

      await expect(controller.deleteItem('cart-1', 'item-1')).rejects.toThrow(error);
    });
  });

  describe('getCartSummary', () => {
    it('should return cart summary', async () => {
      cartService.getCartSummary.mockResolvedValueOnce(mockCartSummary);

      const result = await controller.getCartSummary('cart-1');

      expect(cartService.getCartSummary).toHaveBeenCalledWith('cart-1');
      expect(result).toEqual(mockCartSummary);
    });

    it('should propagate errors', async () => {
      const error = new Error('Error');
      cartService.getCartSummary.mockRejectedValueOnce(error);

      await expect(controller.getCartSummary('cart-1')).rejects.toThrow(error);
    });
  });

  describe('allItems', () => {
    it('should return all items for a cart', async () => {
      cartService.getUserCartById.mockResolvedValueOnce(mockCart);

      const result = await controller.allItems('user-1');

      expect(cartService.getUserCartById).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(mockCart);
    });
  });

  describe('findItems', () => {
    it('should return specific cart item', async () => {
      cartService.findItems.mockResolvedValueOnce(mockCartItem);

      const result = await controller.findItems('item-1');

      expect(cartService.findItems).toHaveBeenCalledWith('item-1');
      expect(result).toEqual(mockCartItem);
    });
  });

  describe('create', () => {
    it('should create a cart', async () => {
      cartService.create.mockResolvedValueOnce(mockCart);

      const result = await controller.create(mockCreateCartDto);

      expect(cartService.create).toHaveBeenCalledWith(mockCreateCartDto);
      expect(result).toEqual(mockCart);
    });
  });

  describe('findAll', () => {
    const mockPaginationResponse = {
      total: 1,
      totalPages: 1,
      prevPage: false,
      nextPage: false,
      page: 1,
      limit: 10,
      carts: [mockCart],
    };

    it('should return paginated carts', async () => {
      cartService.findAll.mockResolvedValueOnce(mockPaginationResponse);

      const result = await controller.findAll(mockPaginationDto);

      expect(cartService.findAll).toHaveBeenCalledWith(mockPaginationDto);
      expect(result).toEqual(mockPaginationResponse);
    });
  });

  describe('findOne', () => {
    it('should return cart by id', async () => {
      cartService.findOne.mockResolvedValueOnce(mockCart);

      const result = await controller.findOne('cart-1');

      expect(cartService.findOne).toHaveBeenCalledWith('cart-1');
      expect(result).toEqual(mockCart);
    });
  });

  describe('updateCartItem', () => {
    it('should update cart item', async () => {
      cartService.updateCartItem.mockResolvedValueOnce({ id: 'item-1', ...mockUpdateCartItemDto });

      const result = await controller.updateCartItem('item-1', mockUpdateCartItemDto);

      expect(cartService.updateCartItem).toHaveBeenCalledWith('item-1', mockUpdateCartItemDto);
      expect(result).toEqual({ id: 'item-1', ...mockUpdateCartItemDto });
    });
  });
});
