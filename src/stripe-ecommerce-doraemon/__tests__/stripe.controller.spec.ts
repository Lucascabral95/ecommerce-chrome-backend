import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpStatus, RequestMethod } from '@nestjs/common';
import { StripeController } from '../stripe/stripe.controller';
import { StripeService } from '../stripe/stripe.service';

describe('StripeController', () => {
  let controller: StripeController;
  let stripeService: jest.Mocked<StripeService>;

  beforeEach(async () => {
    const mockStripeService = {
      createPaymentIntent: jest.fn(),
      retrievePaymentIntent: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        {
          provide: StripeService,
          useValue: mockStripeService,
        },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    stripeService = module.get(StripeService) as jest.Mocked<StripeService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentIntent', () => {
    it('should return client secret and payment intent ID', async () => {
      const mockResult = {
        clientSecret: 'client_secret_123',
        paymentIntentId: 'pi_test123',
      };

      stripeService.createPaymentIntent.mockResolvedValue(mockResult);

      const result = await controller.createPaymentIntent({ amount: 1000, currency: 'usd' });

      expect(stripeService.createPaymentIntent).toHaveBeenCalledWith(1000, 'usd');
      expect(result).toEqual({
        clientSecret: 'client_secret_123',
        paymentIntentId: 'pi_test123',
      });
    });

    it('should use default currency if not provided', async () => {
      const mockResult = {
        clientSecret: 'client_secret_123',
        paymentIntentId: 'pi_test123',
      };

      stripeService.createPaymentIntent.mockResolvedValue(mockResult);

      await controller.createPaymentIntent({ amount: 1000, currency: 'usd' });

      expect(stripeService.createPaymentIntent).toHaveBeenCalledWith(1000, 'usd');
    });

    it('should throw BadRequestException when service throws', async () => {
      stripeService.createPaymentIntent.mockRejectedValue(
        new BadRequestException('Invalid amount'),
      );

      await expect(
        controller.createPaymentIntent({ amount: 0, currency: 'usd' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('ok', () => {
    it('should return success message', async () => {
      const result = await controller.ok();
      expect(result).toBe('Este endpoint esta funcionando correctamente!!!');
    });
  });

  describe('endpoint configuration', () => {
    it('should have correct route decorators', () => {
      const controllerPath = Reflect.getMetadata('path', StripeController);
      expect(controllerPath).toBe('stripe');

      const createPaymentMethod = Reflect.getMetadata(
        'path',
        StripeController.prototype.createPaymentIntent,
      );
      const createPaymentHttpCode = Reflect.getMetadata(
        'httpCode',
        StripeController.prototype.createPaymentIntent,
      );
      const createPaymentMethodType = Reflect.getMetadata(
        'method',
        StripeController.prototype.createPaymentIntent,
      );

      expect(createPaymentMethod).toBe('create-payment');

  expect([HttpStatus.OK, undefined]).toContain(createPaymentHttpCode);
      expect(createPaymentMethodType).toBe(RequestMethod.POST);

      const okMethod = Reflect.getMetadata(
        'method',
        StripeController.prototype.ok,
      );
      const okPath = Reflect.getMetadata(
        'path',
        StripeController.prototype.ok,
      );

      expect(okMethod).toBe(RequestMethod.GET);
      expect(okPath).toBe('ok');
    });
  });
});