import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from '../catalog.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateTagDto } from '../dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as slugUtils from 'src/shared/utils/generate-slug';
import * as handlerModule from 'src/errors/handler-prisma-error';

type MockPrismaService = {
  brand: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
  };
  category: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
  };
  color: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
  };
  tag: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
  };
};

describe('CatalogService', () => {
  let service: CatalogService;
  let prisma: MockPrismaService;

  const mockBrand = { id: 'brand-1', name: 'Brand', slug: 'brand-slug' };
  const mockCategory = { id: 'category-1', name: 'Category', slug: 'category-slug', parentId: null };
  const mockColor = { id: 'color-1', name: 'Red', hex: '#FF0000' };
  const mockTag = { id: 'tag-1', name: 'Casual', slug: 'casual' };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      brand: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
      category: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
      color: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
      tag: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
    };

    jest.spyOn(slugUtils, 'generateSlug').mockReturnValue('test-slug');
    jest.spyOn(handlerModule, 'handlePrismaError').mockImplementation(() => undefined);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Brands', () => {
    const createBrandDto: CreateBrandDto = { name: 'Brand' };

    it('should create a brand when slug does not exist', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);
      prisma.brand.create.mockResolvedValueOnce(mockBrand);

      const result = await service.createBrand(createBrandDto);

      expect(prisma.brand.findUnique).toHaveBeenCalledWith({ where: { slug: 'test-slug' } });
      expect(prisma.brand.create).toHaveBeenCalledWith({
        data: {
          name: 'Brand',
          slug: 'test-slug',
        },
      });
      expect(result).toEqual({
        brand: mockBrand,
        message: 'Brand created successfully',
      });
    });

    it('should throw BadRequestException if brand already exists', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);

      await expect(service.createBrand(createBrandDto)).rejects.toThrow(BadRequestException);
      expect(prisma.brand.create).not.toHaveBeenCalled();
    });

    it('should return all brands', async () => {
      prisma.brand.findMany.mockResolvedValueOnce([mockBrand]);

      const result = await service.findBrandsAll();

      expect(prisma.brand.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockBrand]);
    });

    it('should delegate errors when retrieving brands', async () => {
      const error = new Error('db error');
      prisma.brand.findMany.mockRejectedValueOnce(error);

      await expect(service.findBrandsAll()).rejects.toThrow(error);
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Brand');
    });

    it('should find a brand by slug', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);

      const result = await service.findOneBrand('brand-slug');

      expect(prisma.brand.findUnique).toHaveBeenCalledWith({ where: { slug: 'brand-slug' } });
      expect(result).toEqual(mockBrand);
    });

    it('should throw NotFoundException when brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOneBrand('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('Categories', () => {
    const createCategoryDto: CreateCategoryDto = { name: 'Category' };

    it('should create a category when slug is unique', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(null);
      prisma.category.create.mockResolvedValueOnce(mockCategory);

      const result = await service.createCategory(createCategoryDto);

      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { slug: 'test-slug' } });
      expect(prisma.category.create).toHaveBeenCalledWith({
        data: {
          name: 'Category',
          slug: 'test-slug',
          parentId: undefined,
        },
      });
      expect(result).toEqual({
        category: mockCategory,
        message: 'Category created successfully',
      });
    });

    it('should throw BadRequestException when category already exists', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);

      await expect(service.createCategory(createCategoryDto)).rejects.toThrow(BadRequestException);
      expect(prisma.category.create).not.toHaveBeenCalled();
    });

    it('should return all categories', async () => {
      prisma.category.findMany.mockResolvedValueOnce([mockCategory]);

      const result = await service.findCategoriesAll();

      expect(prisma.category.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });

    it('should delegate errors when fetching categories', async () => {
      const error = new Error('db error');
      prisma.category.findMany.mockRejectedValueOnce(error);

      await expect(service.findCategoriesAll()).rejects.toThrow(error);
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Category');
    });

    it('should find a category by slug', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);

      const result = await service.findOneCategory('category-slug');

      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { slug: 'category-slug' } });
      expect(result).toEqual(mockCategory);
    });

    it('should throw NotFoundException when category not found', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOneCategory('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('Colors', () => {
    const createColorDto: CreateColorDto = { name: 'Red', hex: '#FF0000' };

    it('should create a color', async () => {
      prisma.color.create.mockResolvedValueOnce(mockColor);

      const result = await service.createColor(createColorDto);

      expect(prisma.color.create).toHaveBeenCalledWith({ data: createColorDto });
      expect(result).toEqual({
        color: mockColor,
        message: 'Color created successfully',
      });
    });

    it('should delegate errors when creating color', async () => {
      const error = new Error('db error');
      prisma.color.create.mockRejectedValueOnce(error);

      await expect(service.createColor(createColorDto)).rejects.toThrow(error);
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Color');
    });

    it('should return all colors', async () => {
      prisma.color.findMany.mockResolvedValueOnce([mockColor]);

      const result = await service.findColorsAll();

      expect(prisma.color.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockColor]);
    });

    it('should delegate errors when fetching colors', async () => {
      const error = new Error('db error');
      prisma.color.findMany.mockRejectedValueOnce(error);

      await expect(service.findColorsAll()).rejects.toThrow(error);
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Color');
    });

    it('should find a color by id', async () => {
      prisma.color.findUnique.mockResolvedValueOnce(mockColor);

      const result = await service.findOneColor('color-1');

      expect(prisma.color.findUnique).toHaveBeenCalledWith({ where: { id: 'color-1' } });
      expect(result).toEqual(mockColor);
    });

    it('should throw NotFoundException when color not found', async () => {
      prisma.color.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOneColor('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('Tags', () => {
    const createTagDto: CreateTagDto = { name: 'Casual' };

    it('should create a tag when slug unique', async () => {
      prisma.tag.findUnique.mockResolvedValueOnce(null);
      prisma.tag.create.mockResolvedValueOnce(mockTag);

      const result = await service.createTag(createTagDto);

      expect(prisma.tag.findUnique).toHaveBeenCalledWith({ where: { slug: 'test-slug' } });
      expect(prisma.tag.create).toHaveBeenCalledWith({
        data: {
          name: 'Casual',
          slug: 'test-slug',
        },
      });
      expect(result).toEqual({
        tag: mockTag,
        message: 'Tag created successfully',
      });
    });

    it('should throw BadRequestException when tag already exists', async () => {
      prisma.tag.findUnique.mockResolvedValueOnce(mockTag);

      await expect(service.createTag(createTagDto)).rejects.toThrow(BadRequestException);
      expect(prisma.tag.create).not.toHaveBeenCalled();
    });

    it('should delegate errors when creating tag', async () => {
      prisma.tag.findUnique.mockResolvedValueOnce(null);
      const error = new Error('db error');
      prisma.tag.create.mockRejectedValueOnce(error);

      await expect(service.createTag(createTagDto)).rejects.toThrow(error);
      expect(handlerModule.handlePrismaError).toHaveBeenCalledWith(error, 'Tag');
    });

    it('should return all tags', async () => {
      prisma.tag.findMany.mockResolvedValueOnce([mockTag]);

      const result = await service.findTagsAll();

      expect(prisma.tag.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockTag]);
    });

    it('should return empty array when no tags found', async () => {
      prisma.tag.findMany.mockResolvedValueOnce(null);

      const result = await service.findTagsAll();

      expect(result).toEqual([]);
    });

    it('should find tag by slug', async () => {
      prisma.tag.findUnique.mockResolvedValueOnce(mockTag);

      const result = await service.findOneTag('casual');

      expect(prisma.tag.findUnique).toHaveBeenCalledWith({ where: { slug: 'casual' } });
      expect(result).toEqual(mockTag);
    });

    it('should throw NotFoundException when tag not found', async () => {
      prisma.tag.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOneTag('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
