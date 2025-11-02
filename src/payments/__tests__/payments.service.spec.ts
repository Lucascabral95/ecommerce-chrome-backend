import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../payments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationPaymentDto } from '../dto';
import { PaymentStatus } from '@prisma/client';
import * as handlerModule from 'src/errors/handler-prisma-error';

jest.mock('mercadopago', () => {
  const preferenceCreate = jest.fn();
  const MercadoPagoConfig = jest.fn().mockImplementation(() => ({}));
  const Preference = jest.fn().mockImplementation(() => ({ create: preferenceCreate }));

  return {
    __esModule: true,
    default: MercadoPagoConfig,
    MercadoPagoConfig,
    Preference,
    __mocks__: { preferenceCreate, MercadoPagoConfig, Preference },
  };
});

type MockPrismaModel = {
  findFirst: jest.Mock;
  findUnique: jest.Mock;
  findMany: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  delete: jest.Mock;
  deleteMany: jest.Mock;
  count: jest.Mock;
};

type MockPrismaService = {
  user: MockPrismaModel;
  cart: MockPrismaModel;
  payment: MockPrismaModel;
  order: MockPrismaModel;
  cartItem: MockPrismaModel;
  $transaction: jest.Mock;
};

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prisma: MockPrismaService;
  let preferenceCreate: jest.Mock;

  const mockUser = { id: 'user-1', email: 'user@example.com' };
  const mockCart = {
    id: 'cart-1',
    items: [
      {
        quantity: 2,
        variant: {
          id: 'variant-1',
          price: 100,
          product: { name: 'Product 1' },
        },
      },
    ],
  };
  const mockPayment = {
    id: 'payment-1',
    status: PaymentStatus.PENDING,
    orderId: 'order-1',
    raw: {},
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const { __mocks__ } = jest.requireMock('mercadopago') as {
      __mocks__: {
        preferenceCreate: jest.Mock;
        MercadoPagoConfig: jest.Mock;
        Preference: jest.Mock;
      };
    };

    preferenceCreate = __mocks__.preferenceCreate;
    preferenceCreate.mockReset();
    __mocks__.Preference.mockClear();
    __mocks__.MercadoPagoConfig.mockClear();

    const createMockModel = (): MockPrismaModel => ({
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
    });

    prisma = {
      user: createMockModel(),
      cart: createMockModel(),
      payment: createMockModel(),
      order: createMockModel(),
      cartItem: createMockModel(),
      $transaction: jest.fn(),
    } as unknown as MockPrismaService;
    preferenceCreate.mockReset();

    jest.spyOn(handlerModule, 'handlePrismaError').mockImplementation(() => undefined);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        external_reference: 'payment-1',
        status: 'approved',
        installments: 1,
        payment_method_id: 'visa',
      }),
    } as any);

    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createPreference', () => {
    it('should create preference successfully', async () => {
      prisma.user.findFirst.mockResolvedValueOnce(mockUser);
      prisma.cart.findFirst.mockResolvedValueOnce(mockCart);
      preferenceCreate.mockResolvedValueOnce({ id: 'pref-1', init_point: 'http://mp', sandbox_init_point: 'http://sandbox' });

      const result = await service.createPreference('user-1');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { id: 'user-1' } });
      expect(prisma.cart.findFirst).toHaveBeenCalled();
      expect(preferenceCreate).toHaveBeenCalledWith(expect.objectContaining({
        body: expect.objectContaining({
          items: expect.any(Array),
          metadata: { user_id: 'user-1' },
        }),
      }));
      expect(result.ok).toBe(true);
      expect(result.init_point).toBe('http://mp');
    });

    it('should throw NotFoundException when user does not exist', async () => {
      prisma.user.findFirst.mockResolvedValueOnce(null);

      await expect(service.createPreference('missing')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when cart is empty', async () => {
      prisma.user.findFirst.mockResolvedValueOnce(mockUser);
      prisma.cart.findFirst.mockResolvedValueOnce({ id: 'cart-1', items: [] });

      await expect(service.createPreference('user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('handleWebhook', () => {
    const mpResponse = {
      data: { id: '123' },
      type: 'payment',
    };

    it('should process approved payment and update order status', async () => {
      prisma.payment.update.mockResolvedValueOnce({ ...mockPayment, status: PaymentStatus.APPROVED, order: { userId: 'user-1' }, orderId: 'order-1' });
      prisma.order.update.mockResolvedValueOnce({ id: 'order-1', status: 'PAID' });
      prisma.cart.findFirst.mockResolvedValueOnce({ id: 'cart-1' });
      prisma.cartItem.deleteMany.mockResolvedValueOnce(undefined);

      const result = (await service.handleWebhook(mpResponse)) as any;

      expect(prisma.payment.update).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 'payment-1' },
      }));
      expect(prisma.order.update).toHaveBeenCalledWith({ where: { id: 'order-1' }, data: { status: 'PAID' } });
      expect(prisma.cartItem.deleteMany).toHaveBeenCalledWith({ where: { cartId: 'cart-1' } });
      expect(result.status).toBe(PaymentStatus.APPROVED);
    });

    it('should throw InternalServerErrorException for invalid format', async () => {
      await expect(service.handleWebhook({})).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw InternalServerErrorException when update fails', async () => {
      prisma.payment.update.mockRejectedValueOnce(new Error('db error'));

      await expect(service.handleWebhook(mpResponse)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    const pagination: PaginationPaymentDto = { page: 1, limit: 10 };

    it('should return paginated payments', async () => {
      prisma.$transaction.mockResolvedValueOnce([[mockPayment], 1]);

      const result = await service.findAll(pagination);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(result).toMatchObject({
        total: 1,
        payments: [mockPayment],
      });
    });

    it('should delegate errors to handler', async () => {
      const error = new Error('db error');
      prisma.$transaction.mockRejectedValueOnce(error);

      await expect(service.findAll(pagination)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding payments');
    });
  });

  describe('findOne', () => {
    it('should return payment when found', async () => {
      prisma.payment.findUnique.mockResolvedValueOnce(mockPayment);

      const result = await service.findOne('payment-1');

      expect(result).toEqual(mockPayment);
    });

    it('should throw NotFoundException when missing', async () => {
      prisma.payment.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });

    it('should delegate errors', async () => {
      const error = new Error('db error');
      prisma.payment.findUnique.mockRejectedValueOnce(error);

      await expect(service.findOne('payment-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding payment');
    });
  });

  describe('update', () => {
    it('should update payment', async () => {
      prisma.payment.update.mockResolvedValueOnce({ ...mockPayment, status: PaymentStatus.APPROVED });

      const result = await service.update('payment-1', { status: PaymentStatus.APPROVED } as any);

      expect(prisma.payment.update).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result!.status).toBe(PaymentStatus.APPROVED);
    });

    it('should delegate errors', async () => {
      const error = new Error('db error');
      prisma.payment.update.mockRejectedValueOnce(error);

      await expect(service.update('payment-1', {} as any)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error updating payment');
    });
  });

  describe('remove', () => {
    it('should delete payment', async () => {
      prisma.payment.delete.mockResolvedValueOnce(mockPayment);

      const result = await service.remove('payment-1');

      expect(prisma.payment.delete).toHaveBeenCalledWith({ where: { id: 'payment-1' } });
      expect(result).toEqual(mockPayment);
    });

    it('should delegate errors', async () => {
      const error = new Error('db error');
      prisma.payment.delete.mockRejectedValueOnce(error);

      await expect(service.remove('payment-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error removing payment');
    });
  });
});
