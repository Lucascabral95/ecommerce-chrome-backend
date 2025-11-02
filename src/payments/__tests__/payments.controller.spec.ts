import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from '../payments.controller';
import { PaymentsService } from '../payments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

type MockPaymentsService = {
  findAll: jest.Mock;
  createPreference: jest.Mock;
  handleWebhook: jest.Mock;
};

const mockGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'user-1' };
    return true;
  },
};

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: MockPaymentsService;

  beforeEach(async () => {
    const mockService: MockPaymentsService = {
      findAll: jest.fn(),
      createPreference: jest.fn(),
      handleWebhook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
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

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get(PaymentsService) as unknown as MockPaymentsService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should delegate to PaymentsService', async () => {
      const pagination = { page: 1, limit: 10 } as any;
      const response = { total: 1, payments: [] };
      service.findAll.mockResolvedValueOnce(response);

      const result = await controller.findAll(pagination);

      expect(service.findAll).toHaveBeenCalledWith(pagination);
      expect(result).toEqual(response);
    });
  });

  describe('getPreference', () => {
    it('should request preference creation', async () => {
      const expected = { ok: true } as any;
      service.createPreference.mockResolvedValueOnce(expected);

      const result = await controller.getPreference('user-1');

      expect(service.createPreference).toHaveBeenCalledWith('user-1');
      expect(result).toEqual(expected);
    });
  });

  describe('handleWebhook', () => {
    it('should handle webhook body', async () => {
      const payload = { data: { id: '123' } };
      service.handleWebhook.mockResolvedValueOnce({ status: 'APPROVED' });

      const result = await controller.handleWebhook({ body: payload } as any);

      expect(service.handleWebhook).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ status: 'APPROVED' });
    });
  });

  describe('test', () => {
    it('should return test message', () => {
      expect(controller.test()).toEqual({ message: 'Test OK' });
    });
  });

  describe('mpSuccess', () => {
    it('should return success response', async () => {
      const result = await controller.mpSuccess({ payment_id: '123', status: 'approved' });

      expect(result).toEqual({ ok: 'Payment success' });
    });
  });

  describe('pending', () => {
    it('should return pending status', () => {
      const query = { foo: 'bar' };
      const result = controller.pending(query);

      expect(result).toEqual({ status: 'pending', q: query });
    });
  });

  describe('failure', () => {
    it('should return failure status', () => {
      const query = { foo: 'bar' };
      const result = controller.failure(query);

      expect(result).toEqual({ status: 'failure', q: query });
    });
  });
});
