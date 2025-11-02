import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { CreateOrderDto, PaginationOrderDto, PaginationOrderUserIdDto, UpdateOrderDto } from '../dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Currency } from '@prisma/client';

type MockOrdersService = {
  createOrder: jest.Mock;
  findAll: jest.Mock;
  findAllByUserId: jest.Mock;
  findOne: jest.Mock;
  cancelOrder: jest.Mock;
  update: jest.Mock;
  remove: jest.Mock;
};

const mockGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'user-1' };
    return true;
  },
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: MockOrdersService;

  const mockOrder = {
    id: 'order-1',
    status: 'PENDING',
    total: 200,
  };

  beforeEach(async () => {
    const mockService: MockOrdersService = {
      createOrder: jest.fn(),
      findAll: jest.fn(),
      findAllByUserId: jest.fn(),
      findOne: jest.fn(),
      cancelOrder: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockService,
        },
        {
          provide: JwtAuthGuard,
          useValue: mockGuard,
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get(OrdersService) as unknown as MockOrdersService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create order for user', async () => {
      const dto: CreateOrderDto = {
        userId: 'user-1',
        subtotal: 200,
        total: 200,
        shippingAddress: { street: 'Main', city: 'City', state: 'State', postalCode: '123', country: 'AR', contactName: 'Test' } as any,
        billingAddress: { street: 'Main', city: 'City', state: 'State', postalCode: '123', country: 'AR', contactName: 'Test' } as any,
        currency: Currency.ARS,
        shipping: 0,
        discount: 0,
      };
      service.createOrder.mockResolvedValueOnce(mockOrder);

      const result = await controller.create('user-1', dto);

      expect(service.createOrder).toHaveBeenCalledWith('user-1', dto);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('findAll', () => {
    it('should return paginated orders', async () => {
      const pagination: PaginationOrderDto = { page: 1, limit: 10 };
      const response = { page: 1, limit: 10, orders: [mockOrder] };
      service.findAll.mockResolvedValueOnce(response);

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toEqual(response);
    });
  });

  describe('findAllByUserId', () => {
    it('should return orders for user', async () => {
      const pagination: PaginationOrderUserIdDto = { page: 1, limit: 10 };
      const response = { orders: [mockOrder], total: 1 };
      service.findAllByUserId.mockResolvedValueOnce(response);

      const result = await controller.findAllByUserId('user-1', pagination);

      expect(service.findAllByUserId).toHaveBeenCalledWith('user-1', pagination);
      expect(result).toEqual(response);
    });
  });

  describe('findOne', () => {
    it('should return order by id', async () => {
      service.findOne.mockResolvedValueOnce(mockOrder);

      const result = await controller.findOne('order-1');

      expect(service.findOne).toHaveBeenCalledWith('order-1');
      expect(result).toEqual(mockOrder);
    });
  });

  describe('cancelOrder', () => {
    it('should cancel order', async () => {
      const response = { message: 'Orden cancelada y stock restaurado' };
      service.cancelOrder.mockResolvedValueOnce(response);

      const result = await controller.cancelOrder('order-1');

      expect(service.cancelOrder).toHaveBeenCalledWith('order-1');
      expect(result).toEqual(response);
    });
  });

  describe('update', () => {
    it('should update order', async () => {
      const dto: UpdateOrderDto = { status: 'COMPLETED' } as any;
      service.update.mockResolvedValueOnce({ ...mockOrder, status: 'COMPLETED' });

      const result = await controller.update('order-1', dto);

      expect(service.update).toHaveBeenCalledWith('order-1', dto);
      expect(result).toBeDefined();
      expect(result!.status).toBe('COMPLETED');
    });
  });

  describe('remove', () => {
    it('should remove order', async () => {
      service.remove.mockResolvedValueOnce(mockOrder);

      const result = await controller.remove('order-1');

      expect(service.remove).toHaveBeenCalledWith('order-1');
      expect(result).toEqual(mockOrder);
    });
  });
});
