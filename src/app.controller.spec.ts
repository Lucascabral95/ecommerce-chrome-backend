import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

jest.mock('mock/Rolename.seed', () => ({}));
jest.mock('mock/Colors.seed', () => ({}));
jest.mock('mock/Categories.seed', () => ({}));
jest.mock('mock/Tags.seed', () => ({}));
jest.mock('mock/Brands.seed', () => ({}));
jest.mock('mock/Products.seed', () => ({}));
jest.mock('mock/ProductVariants.seed', () => ({}));
jest.mock('mock/Users.seed', () => ({}));

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue({ message: 'Hello World!' }),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getHello', () => {
    it('debería devolver un objeto con un mensaje de saludo', () => {
      const expected = { message: 'Hello World!' };
      
      const result = appController.getHello();
      
      expect(result).toEqual(expected);
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
