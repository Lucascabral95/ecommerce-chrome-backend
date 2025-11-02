import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto, GetCategoryDto, ResponseCreateCategoryDto, UpdateCategoryDto } from '../dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

type MockCategoriesService = {
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  update: jest.Mock;
  remove: jest.Mock;
};

const mockGuard = {
  canActivate: (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    request.user = { id: 'user-1' };
    return true;
  },
};

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: MockCategoriesService;

  const mockCategory: GetCategoryDto = {
    id: 'category-1',
    name: 'Category',
    slug: 'category',
    parentId: undefined,
  };

  const createResponse: ResponseCreateCategoryDto = {
    category: mockCategory,
    message: 'Category created successfully',
  };

  beforeEach(async () => {
    const mockService: MockCategoriesService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
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

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get(CategoriesService) as unknown as MockCategoriesService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'Category' };
      service.create.mockResolvedValueOnce(createResponse);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createResponse);
    });
  });

  describe('findAll', () => {
    it('should return categories', async () => {
      service.findAll.mockResolvedValueOnce([mockCategory]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('findOne', () => {
    it('should return category by id', async () => {
      service.findOne.mockResolvedValueOnce(mockCategory);

      const result = await controller.findOne('category-1');

      expect(service.findOne).toHaveBeenCalledWith('category-1');
      expect(result).toEqual(mockCategory);
    });
  });

  describe('update', () => {
    it('should update category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Category' };
      const updateResult = {
        category: { ...mockCategory, name: 'Updated Category' },
        message: 'Category updated successfully',
      };
      service.update.mockResolvedValueOnce(updateResult);

      const result = await controller.update('category-1', dto);

      expect(service.update).toHaveBeenCalledWith('category-1', dto);
      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove category', async () => {
      const removeResult = { message: 'Category removed successfully' };
      service.remove.mockResolvedValueOnce(removeResult);

      const result = await controller.remove('category-1');

      expect(service.remove).toHaveBeenCalledWith('category-1');
      expect(result).toEqual(removeResult);
    });
  });
});
