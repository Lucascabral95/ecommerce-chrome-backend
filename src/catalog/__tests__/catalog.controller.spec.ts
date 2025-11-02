import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from '../catalog.controller';
import { CatalogService } from '../catalog.service';
import { CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateTagDto, Color, TagDto } from '../dto';
import { GetBrandsDto } from 'src/brands/dto';
import { GetCategoryDto } from 'src/categories/dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

type MockCatalogService = {
  createBrand: jest.Mock;
  findBrandsAll: jest.Mock;
  findOneBrand: jest.Mock;
  createCategory: jest.Mock;
  findCategoriesAll: jest.Mock;
  findOneCategory: jest.Mock;
  createColor: jest.Mock;
  findColorsAll: jest.Mock;
  findOneColor: jest.Mock;
  createTag: jest.Mock;
  findOneTag: jest.Mock;
  findTagsAll: jest.Mock;
};

const mockJwtGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'user-1' };
    return true;
  },
};

describe('CatalogController', () => {
  let controller: CatalogController;
  let service: MockCatalogService;

  const mockBrandResponse = {
    brand: { id: 'brand-1', name: 'Brand', slug: 'brand' },
    message: 'Brand created successfully',
  };

  const mockBrands: GetBrandsDto[] = [
    { id: 'brand-1', name: 'Brand', slug: 'brand' },
  ];

  const mockCategoryResponse = {
    category: { id: 'category-1', name: 'Category', slug: 'category', parentId: undefined },
    message: 'Category created successfully',
  };

  const mockCategories: GetCategoryDto[] = [
    { id: 'category-1', name: 'Category', slug: 'category', parentId: undefined },
  ];

  const mockColorResponse = {
    color: { id: 'color-1', name: 'Red', hex: '#FF0000' } as Color,
    message: 'Color created successfully',
  };

  const mockColors: Color[] = [
    { id: 'color-1', name: 'Red', hex: '#FF0000' },
  ];

  const mockTagResponse = {
    tag: { id: 'tag-1', name: 'Casual', slug: 'casual' } as TagDto,
    message: 'Tag created successfully',
  };

  const mockTags: TagDto[] = [
    { id: 'tag-1', name: 'Casual', slug: 'casual' },
  ];

  beforeEach(async () => {
    const mockService: MockCatalogService = {
      createBrand: jest.fn(),
      findBrandsAll: jest.fn(),
      findOneBrand: jest.fn(),
      createCategory: jest.fn(),
      findCategoriesAll: jest.fn(),
      findOneCategory: jest.fn(),
      createColor: jest.fn(),
      findColorsAll: jest.fn(),
      findOneColor: jest.fn(),
      createTag: jest.fn(),
      findOneTag: jest.fn(),
      findTagsAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [
        {
          provide: CatalogService,
          useValue: mockService,
        },
        {
          provide: JwtAuthGuard,
          useValue: mockJwtGuard,
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatalogController>(CatalogController);
    service = module.get(CatalogService) as unknown as MockCatalogService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Brands endpoints', () => {
    it('should create a brand', async () => {
      const dto: CreateBrandDto = { name: 'Brand' };
      service.createBrand.mockResolvedValueOnce(mockBrandResponse);

      const result = await controller.createBrand(dto);

      expect(service.createBrand).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockBrandResponse);
    });

    it('should return all brands', async () => {
      service.findBrandsAll.mockResolvedValueOnce(mockBrands);

      const result = await controller.findBrandsAll();

      expect(service.findBrandsAll).toHaveBeenCalled();
      expect(result).toEqual(mockBrands);
    });

    it('should return brand by slug', async () => {
      service.findOneBrand.mockResolvedValueOnce(mockBrands[0]);

      const result = await controller.findOneBrand('brand');

      expect(service.findOneBrand).toHaveBeenCalledWith('brand');
      expect(result).toEqual(mockBrands[0]);
    });
  });

  describe('Categories endpoints', () => {
    it('should create category', async () => {
      const dto: CreateCategoryDto = { name: 'Category' };
      service.createCategory.mockResolvedValueOnce(mockCategoryResponse);

      const result = await controller.createCategory(dto);

      expect(service.createCategory).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCategoryResponse);
    });

    it('should return all categories', async () => {
      service.findCategoriesAll.mockResolvedValueOnce(mockCategories);

      const result = await controller.findCategoriesAll();

      expect(service.findCategoriesAll).toHaveBeenCalled();
      expect(result).toEqual(mockCategories);
    });

    it('should return category by slug', async () => {
      service.findOneCategory.mockResolvedValueOnce(mockCategories[0]);

      const result = await controller.findOneCategory('category');

      expect(service.findOneCategory).toHaveBeenCalledWith('category');
      expect(result).toEqual(mockCategories[0]);
    });
  });

  describe('Colors endpoints', () => {
    it('should create color', async () => {
      const dto: CreateColorDto = { name: 'Red', hex: '#FF0000' };
      service.createColor.mockResolvedValueOnce(mockColorResponse);

      const result = await controller.createColor(dto);

      expect(service.createColor).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockColorResponse);
    });

    it('should return all colors', async () => {
      service.findColorsAll.mockResolvedValueOnce(mockColors);

      const result = await controller.findColorsAll();

      expect(service.findColorsAll).toHaveBeenCalled();
      expect(result).toEqual(mockColors);
    });

    it('should return color by id', async () => {
      service.findOneColor.mockResolvedValueOnce(mockColors[0]);

      const result = await controller.findOneColor('color-1');

      expect(service.findOneColor).toHaveBeenCalledWith('color-1');
      expect(result).toEqual(mockColors[0]);
    });
  });

  describe('Tags endpoints', () => {
    it('should create tag', async () => {
      const dto: CreateTagDto = { name: 'Casual' };
      service.createTag.mockResolvedValueOnce(mockTagResponse);

      const result = await controller.createTag(dto);

      expect(service.createTag).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockTagResponse);
    });

    it('should return tag by slug', async () => {
      service.findOneTag.mockResolvedValueOnce(mockTags[0]);

      const result = await controller.findOneTag('casual');

      expect(service.findOneTag).toHaveBeenCalledWith('casual');
      expect(result).toEqual(mockTags[0]);
    });

    it('should return all tags', async () => {
      service.findTagsAll.mockResolvedValueOnce(mockTags);

      const result = await controller.findTagsAll();

      expect(service.findTagsAll).toHaveBeenCalled();
      expect(result).toEqual(mockTags);
    });
  });
});
