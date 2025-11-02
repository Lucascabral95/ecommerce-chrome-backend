import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';

jest.mock('src/config/env.schema', () => ({
  envs: {
    stripe_secret_key: 'sk_test_mock',
  },
}));

jest.mock('stripe', () => {
  const paymentIntentsCreate = jest.fn();
  const paymentIntentsRetrieve = jest.fn();
  const StripeMock = jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: paymentIntentsCreate,
      retrieve: paymentIntentsRetrieve,
    },
  }));

  return {
    __esModule: true,
    default: StripeMock,
    __mocks__: {
      StripeMock,
      paymentIntentsCreate,
      paymentIntentsRetrieve,
    },
  };
});

describe('StripeService', () => {
  let service: StripeService;
  let paymentIntentsCreate: jest.Mock;
  let paymentIntentsRetrieve: jest.Mock;

  beforeEach(async () => {
    const { __mocks__ } = jest.requireMock('stripe') as {
      __mocks__: {
        StripeMock: jest.Mock;
        paymentIntentsCreate: jest.Mock;
        paymentIntentsRetrieve: jest.Mock;
      };
    };

    paymentIntentsCreate = __mocks__.paymentIntentsCreate;
    paymentIntentsRetrieve = __mocks__.paymentIntentsRetrieve;
    __mocks__.StripeMock.mockClear();
    paymentIntentsCreate.mockReset();
    paymentIntentsRetrieve.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeService,
      ],
    }).compile();

    service = module.get<StripeService>(StripeService);
    (service as any).stripe = {
      paymentIntents: {
        create: paymentIntentsCreate,
        retrieve: paymentIntentsRetrieve,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent successfully', async () => {
      const mockPaymentIntent = {
        id: 'pi_test123',
        client_secret: 'client_secret_123',
        amount: 1000,
        currency: 'usd',
      };

      paymentIntentsCreate.mockResolvedValue(mockPaymentIntent);

      const result = await service.createPaymentIntent(1000, 'usd');

      expect(paymentIntentsCreate).toHaveBeenCalledWith({
        amount: 1000,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: { integration: 'ecommerce-doraemon' },
      });
      expect(result).toEqual({
        clientSecret: 'client_secret_123',
        paymentIntentId: 'pi_test123',
      });
    });

    it('should throw BadRequestException for invalid amount', async () => {
      await expect(service.createPaymentIntent(0, 'usd')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.createPaymentIntent(-100, 'usd')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when Stripe API fails', async () => {
      paymentIntentsCreate.mockRejectedValue(new Error('Stripe API error'));

      await expect(service.createPaymentIntent(1000, 'usd')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('retrievePaymentIntent', () => {
    it('should retrieve a payment intent successfully', async () => {
      const mockPaymentIntent = {
        id: 'pi_test123',
        status: 'succeeded',
        amount: 1000,
        currency: 'usd',
      };

      paymentIntentsRetrieve.mockResolvedValue(mockPaymentIntent);

      const result = await service.retrievePaymentIntent('pi_test123');

      expect(paymentIntentsRetrieve).toHaveBeenCalledWith('pi_test123');
      expect(result).toEqual(mockPaymentIntent);
    });

    it('should throw BadRequestException when payment intent not found', async () => {
      paymentIntentsRetrieve.mockRejectedValue(new Error('Not found'));

      await expect(service.retrievePaymentIntent('invalid_id')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});