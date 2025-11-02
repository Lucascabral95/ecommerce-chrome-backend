import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from '../brands.controller';
import { BrandsService } from '../brands.service';
import { CreateBrandDto, ResponseCreateBrandDto, UpdateBrandDto, GetBrandsDto } from '../dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const mockBrandsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockJwtAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: '1', email: 'test@example.com' };
    return true;
  },
};

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: typeof mockBrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        {
          provide: BrandsService,
          useValue: mockBrandsService,
        },
        {
          provide: JwtAuthGuard,
          useValue: mockJwtAuthGuard,
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get(BrandsService);
    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una nueva marca', async () => {
      const createBrandDto: CreateBrandDto = { name: 'Nike' };
      const expectedResult: ResponseCreateBrandDto = {
        brand: {
          id: '1',
          name: 'Nike',
          slug: 'nike',
        },
        message: 'Brand created successfully'
      };

      service.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createBrandDto);
      
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe('findAll', () => {
    it('debería retornar un array de marcas', async () => {
      const expectedResult: GetBrandsDto[] = [
        { id: '1', name: 'Nike', slug: 'nike' },
        { id: '2', name: 'Adidas', slug: 'adidas' },
      ];

      service.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería retornar una marca por ID', async () => {
      const brandId = '1';
      const expectedResult = {
        id: brandId,
        name: 'Nike',
        slug: 'nike',
      };

      service.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(brandId);
      
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(brandId);
    });
  });

  describe('update', () => {
    it('debería actualizar una marca', async () => {
      const brandId = '1';
      const updateBrandDto: UpdateBrandDto = { name: 'Nike Updated' };
      const expectedResult = {
        id: brandId,
        name: 'Nike Updated',
        slug: 'nike-updated',
      };

      service.update.mockResolvedValue(expectedResult);

      const result = await controller.update(brandId, updateBrandDto);
      
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(brandId, updateBrandDto);
    });
  });

  describe('remove', () => {
    it('debería eliminar una marca', async () => {
      const brandId = '1';
      const expectedResult = {
        id: brandId,
        name: 'Nike',
        slug: 'nike',
      };

      service.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(brandId);
      
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(brandId);
    });
  });
});