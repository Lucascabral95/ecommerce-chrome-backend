import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { BrandsService } from '../brands.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as generateSlugModule from 'src/shared/utils/generate-slug';
import * as handlePrismaErrorModule from 'src/errors/handler-prisma-error';

type MockPrismaService = {
  brand: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
};

describe('BrandsService', () => {
  let service: BrandsService;
  let prisma: MockPrismaService;

  const mockBrand = {
    id: 'brand-1',
    name: 'Nike',
    slug: 'nike',
  };

  beforeEach(async () => {
    const mockPrismaService: MockPrismaService = {
      brand: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    jest.spyOn(generateSlugModule, 'generateSlug').mockReturnValue('nike');
    jest.spyOn(handlePrismaErrorModule, 'handlePrismaError').mockImplementation(() => {
      throw new InternalServerErrorException('Database error');
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    prisma = module.get(PrismaService) as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a brand', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);
      prisma.brand.create.mockResolvedValueOnce(mockBrand);

      const result = await service.create({ name: 'Nike' });

      if (!result) {
        throw new Error('Result is undefined');
      }

      expect(result.message).toBe('Brand created successfully');
      expect(prisma.brand.create).toHaveBeenCalledWith({
        data: { name: 'Nike', slug: 'nike' },
      });
    });

    it('should throw BadRequestException if brand exists', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);

      await expect(service.create({ name: 'Nike' })).rejects.toThrow(BadRequestException);
    });

    it('should throw on database error', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);
      prisma.brand.create.mockRejectedValueOnce(new Error());

      await expect(service.create({ name: 'Nike' })).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all brands', async () => {
      const brands = [mockBrand, { id: 'brand-2', name: 'Adidas', slug: 'adidas' }];
      prisma.brand.findMany.mockResolvedValueOnce(brands);

      const result = await service.findAll();

      expect(result).toEqual(brands);
    });

    it('should throw if no brands exist', async () => {
      prisma.brand.findMany.mockResolvedValueOnce([]);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a brand by id', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);

      const result = await service.findOne('1');

      expect(result).toBeDefined();
      expect(result).toEqual(mockBrand);
      expect(prisma.brand.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw if brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne('brand-999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a brand', async () => {
      const updatedBrand = { ...mockBrand, name: 'Nike Updated', slug: 'nike-updated' };
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);
      prisma.brand.update.mockResolvedValueOnce(updatedBrand);

      const result = await service.update('brand-1', { name: 'Nike Updated' });
      
      expect(result).toBeDefined();
      expect(result?.message).toBe('Brand updated successfully');
      expect(prisma.brand.update).toHaveBeenCalled();
    });

    it('should throw if brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.update('brand-999', { name: 'Nike' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a brand', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);
      prisma.brand.delete.mockResolvedValueOnce(mockBrand);

      const result = await service.remove('brand-1');
      
      // Type assertion to ensure TypeScript knows result is defined
      expect(result).toBeDefined();
      if (!result) {
        throw new Error('Result is undefined');
      }
      
      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Brand removed successfully');
      expect(prisma.brand.delete).toHaveBeenCalledWith({
        where: { id: 'brand-1' }
      });
    });

    it('should throw if brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.remove('brand-999')).rejects.toThrow(NotFoundException);
    });
  });
});
