import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsService } from 'src/payments/payments.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, PaginationOrderDto, PaginationOrderUserIdDto, UpdateOrderDto } from '../dto';
import { Currency } from '@prisma/client';
import * as handlerModule from 'src/errors/handler-prisma-error';

type MockPrismaModel = {
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  count: jest.Mock;
};

type MockPrismaService = {
  $transaction: jest.Mock;
  cart: MockPrismaModel;
  order: MockPrismaModel;
  productVariant: MockPrismaModel;
  orderItem: MockPrismaModel;
  payment: MockPrismaModel;
};

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: MockPrismaService;
  let paymentsService: { createPreference: jest.Mock };

  const mockCart = {
    id: 'cart-1',
    items: [
      {
        variantId: 'variant-1',
        quantity: 2,
        unitPriceSnap: 100,
        variant: {
          stock: 5,
          sku: 'SKU-1',
          size: 'M',
          product: { name: 'Product 1', id: 'product-1' },
          color: { name: 'Red' },
        },
      },
    ],
  };

  const mockOrder = {
    id: 'order-1',
    status: 'PENDING',
    items: mockCart.items,
    payment: { id: 'payment-1' },
  } as any;

  beforeEach(async () => {
    const createMockModel = (): MockPrismaModel => ({
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    });

    prisma = {
      cart: createMockModel(),
      order: createMockModel(),
      productVariant: createMockModel(),
      orderItem: createMockModel(),
      payment: createMockModel(),
      $transaction: jest.fn(),
    } as unknown as MockPrismaService;

    prisma.$transaction.mockImplementation(async (cb: any) =>
      cb({
        cart: prisma.cart,
        order: prisma.order,
        productVariant: prisma.productVariant,
        orderItem: prisma.orderItem,
        payment: prisma.payment,
      }),
    );

    prisma.cart.findUnique.mockResolvedValue(mockCart as any);
    prisma.order.findFirst.mockResolvedValue(null);
    prisma.order.create.mockResolvedValue(mockOrder);
    prisma.order.findMany.mockResolvedValue([]);
    prisma.order.count.mockResolvedValue(0);
    prisma.order.update.mockResolvedValue(mockOrder);
    prisma.order.delete.mockResolvedValue(mockOrder);
    prisma.productVariant.update.mockResolvedValue(undefined);
    prisma.orderItem.create.mockResolvedValue(undefined);
    prisma.payment.create.mockResolvedValue(undefined);
    prisma.payment.update.mockResolvedValue(undefined);

    paymentsService = {
      createPreference: jest.fn().mockResolvedValue({ init_point: 'http://mp', externalReference: 'payment-1' }),
    };

    jest.spyOn(handlerModule, 'handlePrismaError').mockImplementation(() => undefined);
    jest.useFakeTimers();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: prisma },
        { provide: PaymentsService, useValue: paymentsService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    const dto: CreateOrderDto = {
      userId: 'user-1',
      subtotal: 200,
      total: 200,
      shippingAddress: { street: 'Main', city: 'City', state: 'State', postalCode: '123', country: 'AR', contactName: 'Test' } as any,
      billingAddress: { street: 'Main', city: 'City', state: 'State', postalCode: '123', country: 'AR', contactName: 'Test' } as any,
      discount: 0,
      shipping: 0,
      currency: Currency.ARS,
    };

    it('should create order successfully and schedule cancellation', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);
      prisma.order.findFirst.mockResolvedValueOnce(null);
      prisma.order.create.mockResolvedValue(mockOrder);
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

      const result = await service.createOrder('user-1', dto);

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        include: expect.any(Object),
      });
      expect(prisma.productVariant.update).toHaveBeenCalledWith({
        where: { id: 'variant-1' },
        data: { stock: { decrement: 2 } },
      });
      expect(prisma.order.create).toHaveBeenCalled();
      expect(prisma.orderItem.create).toHaveBeenCalled();
      expect(prisma.payment.create).toHaveBeenCalled();
      expect(paymentsService.createPreference).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(mockOrder);
      expect(setTimeoutSpy).toHaveBeenCalled();
    });

    it('should throw when cart is empty', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce({ id: 'cart', items: [] });

      await expect(service.createOrder('user-1', dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw when pending order exists', async () => {
      prisma.cart.findUnique.mockResolvedValueOnce(mockCart);
      prisma.order.findFirst.mockResolvedValueOnce({ id: 'order-pending' });

      await expect(service.createOrder('user-1', dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel order and restore stock', async () => {
      prisma.$transaction.mockImplementation(async (cb) => cb(prisma));
      prisma.order.findUnique.mockResolvedValueOnce(mockOrder);

      const result = await service.cancelOrder('order-1');

      expect(prisma.productVariant.update).toHaveBeenCalledWith({
        where: { id: 'variant-1' },
        data: { stock: { increment: 2 } },
      });
      expect(prisma.order.update).toHaveBeenCalledWith({ where: { id: 'order-1' }, data: { status: 'CANCELLED' } });
      expect(prisma.payment.update).toHaveBeenCalledWith({ where: { id: 'payment-1' }, data: { status: 'CANCELLED' } });
      expect(result).toEqual({ message: 'Orden cancelada y stock restaurado' });
    });

    it('should throw when order not pending', async () => {
      prisma.$transaction.mockImplementation(async (cb) => cb(prisma));
      prisma.order.findUnique.mockResolvedValueOnce({ status: 'COMPLETED' });

      await expect(service.cancelOrder('order-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    const pagination: PaginationOrderDto = {
      page: 1,
      limit: 10,
      currency: Currency.ARS,
      status: 'PENDING',
    };

    it('should return paginated orders', async () => {
      prisma.order.findMany.mockResolvedValueOnce([mockOrder]);
      prisma.order.count.mockResolvedValueOnce(1);

      const result = await service.findAll(pagination);

      expect(prisma.order.findMany).toHaveBeenCalled();
      expect(prisma.order.count).toHaveBeenCalled();
      expect(result).toMatchObject({
        page: 1,
        limit: 10,
        total: 1,
        orders: [mockOrder],
      });
    });

    it('should throw generic error when Prisma throws specific exception', async () => {
      const error = new BadRequestException('invalid');
      prisma.order.findMany.mockRejectedValueOnce(error);

      await expect(service.findAll(pagination)).rejects.toThrow('invalid');
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.order.findMany.mockRejectedValueOnce(error);

      await expect(service.findAll(pagination)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding orders');
    });
  });

  describe('findOne', () => {
    it('should return order', async () => {
      prisma.order.findFirst.mockResolvedValueOnce(mockOrder);

      const result = await service.findOne('order-1');

      expect(prisma.order.findFirst).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException when order not found', async () => {
      prisma.order.findFirst.mockResolvedValueOnce(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.order.findFirst.mockRejectedValueOnce(error);

      await expect(service.findOne('order-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding order');
    });
  });

  describe('findAllByUserId', () => {
    const paginationUser: PaginationOrderUserIdDto = {
      page: 1,
      limit: 10,
      status: 'PENDING',
    };

    it('should return paginated orders for user', async () => {
      prisma.order.findMany.mockResolvedValueOnce([mockOrder]).mockResolvedValueOnce([mockOrder]);
      prisma.order.count.mockResolvedValueOnce(1);

      const result = await service.findAllByUserId('user-1', paginationUser);

      expect(prisma.order.findMany).toHaveBeenCalled();
      expect(prisma.order.count).toHaveBeenCalled();
      expect(result).toMatchObject({
        total: 1,
        orders: [mockOrder],
      });
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.order.findMany.mockRejectedValueOnce(error);

      await expect(service.findAllByUserId('user-1', paginationUser)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding orders by user');
    });
  });

  describe('update', () => {
    const updateDto: UpdateOrderDto = { status: 'COMPLETED' } as any;

    it('should update order', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder as any);
      prisma.order.update.mockResolvedValueOnce({ ...mockOrder, status: 'COMPLETED' });

      const result = await service.update('order-1', updateDto);

      expect(service.findOne).toHaveBeenCalledWith('order-1');
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: 'order-1' },
        data: expect.objectContaining(updateDto),
      });
      expect(result).toBeDefined();
      expect(result!.status).toBe('COMPLETED');
    });

    it('should delegate unexpected errors to handler', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder as any);
      const error = new Error('db error');
      prisma.order.update.mockRejectedValueOnce(error);

      await expect(service.update('order-1', updateDto)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error updating order');
    });
  });

  describe('remove', () => {
    it('should remove order', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder as any);
      prisma.order.delete.mockResolvedValueOnce(mockOrder);

      const result = await service.remove('order-1');

      expect(service.findOne).toHaveBeenCalledWith('order-1');
      expect(prisma.order.delete).toHaveBeenCalledWith({ where: { id: 'order-1' } });
      expect(result).toEqual(mockOrder);
    });

    it('should delegate unexpected errors to handler', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder as any);
      const error = new Error('db error');
      prisma.order.delete.mockRejectedValueOnce(error);

      await expect(service.remove('order-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error removing order');
    });
  });
});
