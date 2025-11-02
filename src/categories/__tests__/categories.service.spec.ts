import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as slugUtils from 'src/shared/utils/generate-slug';
import * as handlerModule from 'src/errors/handler-prisma-error';

type MockPrismaService = {
  category: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    findFirst: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
};

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prisma: MockPrismaService;

  const mockCategory = {
    id: 'category-1',
    name: 'Category',
    slug: 'category',
    parentId: undefined,
  };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      category: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    jest.spyOn(slugUtils, 'generateSlug').mockReturnValue('category-slug');
    jest.spyOn(handlerModule, 'handlePrismaError').mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDto: CreateCategoryDto = { name: 'Category' };

    it('should create a category when slug is unique', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(null);
      prisma.category.create.mockResolvedValueOnce(mockCategory);

      const result = await service.create(createDto);

      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { slug: 'category-slug' } });
      expect(prisma.category.create).toHaveBeenCalledWith({ data: { name: 'Category', slug: 'category-slug', parentId: undefined } });
      expect(result).toEqual({
        category: mockCategory,
        message: 'Category created successfully',
      });
    });

    it('should throw BadRequestException when category already exists', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);

      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
      expect(prisma.category.create).not.toHaveBeenCalled();
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.category.findUnique.mockRejectedValueOnce(error);

      await expect(service.create(createDto)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error creating category');
    });
  });

  describe('findAll', () => {
    it('should return categories', async () => {
      prisma.category.findMany.mockResolvedValueOnce([mockCategory]);

      const result = await service.findAll();

      expect(prisma.category.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });

    it('should throw NotFoundException when no categories found', async () => {
      prisma.category.findMany.mockResolvedValueOnce(null);

      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.category.findMany.mockRejectedValueOnce(error);

      await expect(service.findAll()).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding categories');
    });
  });

  describe('findOne', () => {
    it('should return category by id', async () => {
      prisma.category.findFirst.mockResolvedValueOnce(mockCategory);

      const result = await service.findOne('category-1');

      expect(prisma.category.findFirst).toHaveBeenCalledWith({
        where: { id: 'category-1' },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException when category does not exist', async () => {
      prisma.category.findFirst.mockResolvedValueOnce(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });

    it('should delegate unexpected errors to handler', async () => {
      const error = new Error('db error');
      prisma.category.findFirst.mockRejectedValueOnce(error);

      await expect(service.findOne('category-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error finding category');
    });
  });

  describe('update', () => {
    const updateDto: UpdateCategoryDto = { name: 'Updated Category' };

    it('should update category successfully', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCategory as any);
      prisma.category.update.mockResolvedValueOnce({ ...mockCategory, name: 'Updated Category', slug: 'category-slug' });

      const result = await service.update('category-1', updateDto);

      expect(service.findOne).toHaveBeenCalledWith('category-1');
      expect(prisma.category.update).toHaveBeenCalledWith({
        where: { id: 'category-1' },
        data: {
          slug: 'category-slug',
          ...updateDto,
        },
      });
      expect(result).toEqual({
        category: { ...mockCategory, name: 'Updated Category', slug: 'category-slug' },
        message: 'Category updated successfully',
      });
    });

    it('should propagate NotFoundException from findOne', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('not found'));

      await expect(service.update('missing', updateDto)).rejects.toThrow(NotFoundException);
      expect(prisma.category.update).not.toHaveBeenCalled();
    });

    it('should delegate unexpected errors to handler', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCategory as any);
      const error = new Error('db error');
      prisma.category.update.mockRejectedValueOnce(error);

      await expect(service.update('category-1', updateDto)).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error updating category');
    });
  });

  describe('remove', () => {
    it('should remove category successfully', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCategory as any);
      prisma.category.delete.mockResolvedValueOnce(undefined);

      const result = await service.remove('category-1');

      expect(service.findOne).toHaveBeenCalledWith('category-1');
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 'category-1' } });
      expect(result).toEqual({ message: 'Category removed successfully' });
    });

    it('should propagate NotFoundException from findOne', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('not found'));

      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
      expect(prisma.category.delete).not.toHaveBeenCalled();
    });

    it('should delegate unexpected errors to handler', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockCategory as any);
      const error = new Error('db error');
      prisma.category.delete.mockRejectedValueOnce(error);

      await expect(service.remove('category-1')).resolves.toBeUndefined();
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Error removing category');
    });
  });
});
