import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, CreateProductVariantDto, CreateProductImageDto } from '../dto/create-product.dto';
import { UpdateProductDto, UpdateProductVariantDto, UpdateProductImageDto } from '../dto/update-product.dto';
import { PaginationProductDto, ProductSortField, SortOrder } from '../dto/pagination-product.dto';
import { ProductStatus, Size } from '@prisma/client';
import * as handlePrismaErrorModule from 'src/errors/handler-prisma-error';
import * as slugUtils from 'src/shared/utils/generate-slug';

type MockPrismaService = {
  product: {
    create: jest.Mock;
    findUnique: jest.Mock;
    findFirst: jest.Mock;
    findMany: jest.Mock;
    count: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  productVariant: {
    findUnique: jest.Mock;
    findMany: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  productImage: {
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  brand: {
    findUnique: jest.Mock;
  };
  category: {
    findUnique: jest.Mock;
  };
  color: {
    findUnique: jest.Mock;
  };
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: MockPrismaService;

  const mockProduct = {
    id: 'product-1',
    name: 'Test Product',
    slug: 'test-product',
    description: 'Test Description',
    basePrice: 1999,
    status: ProductStatus.ACTIVE,
    brandId: 'brand-1',
    categoryId: 'category-1',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProductVariant = {
    id: 'variant-1',
    productId: 'product-1',
    colorId: 'color-1',
    sku: 'TEST-SKU-001',
    barcode: '1234567890',
    size: Size.L,
    price: 2999,
    stock: 100,
    weightGrams: 500,
    product: mockProduct,
    color: { id: 'color-1', name: 'Red' },
  };

  const mockProductImage = {
    id: 'image-1',
    url: 'https://example.com/image.jpg',
    alt: 'Test Image',
    position: 1,
    productId: 'product-1',
    variantId: 'variant-1',
  };

  const mockBrand = {
    id: 'brand-1',
    name: 'Test Brand',
  };

  const mockCategory = {
    id: 'category-1',
    name: 'Test Category',
  };

  const mockColor = {
    id: 'color-1',
    name: 'Red',
  };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      product: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      productVariant: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      productImage: {
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      brand: {
        findUnique: jest.fn(),
      },
      category: {
        findUnique: jest.fn(),
      },
      color: {
        findUnique: jest.fn(),
      },
    };

    jest.spyOn(handlePrismaErrorModule, 'handlePrismaError').mockImplementation(() => {
      throw new InternalServerErrorException('Database error');
    });

    jest.spyOn(slugUtils, 'generateSlug').mockReturnValue('test-product');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      basePrice: 1999,
      status: ProductStatus.ACTIVE,
      brandId: 'brand-1',
      categoryId: 'category-1',
    };

    it('should create a product successfully', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);
      prisma.product.create.mockResolvedValueOnce(mockProduct);

      const result = await service.createProduct(createProductDto);

      expect(prisma.brand.findUnique).toHaveBeenCalledWith({ where: { id: 'brand-1' } });
      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: 'category-1' } });
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Product',
          slug: 'test-product',
          description: 'Test Description',
          basePrice: 1999,
          status: ProductStatus.ACTIVE,
          brand: { connect: { id: 'brand-1' } },
          category: { connect: { id: 'category-1' } },
        },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should create a product without brand and category', async () => {
      const dtoWithoutRelations = { ...createProductDto, brandId: undefined, categoryId: undefined };
      prisma.product.create.mockResolvedValueOnce(mockProduct);

      const result = await service.createProduct(dtoWithoutRelations);

      expect(prisma.brand.findUnique).not.toHaveBeenCalled();
      expect(prisma.category.findUnique).not.toHaveBeenCalled();
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          name: 'Test Product',
          slug: 'test-product',
          description: 'Test Description',
          basePrice: 1999,
          status: ProductStatus.ACTIVE,
        },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw BadRequestException when brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.createProduct(createProductDto)).rejects.toThrow(BadRequestException);
      expect(prisma.product.create).not.toHaveBeenCalled();
    });

    it('should delegate to handlePrismaError on database error', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);
      prisma.product.create.mockRejectedValueOnce(new Error('Database error'));

      await expect(service.createProduct(createProductDto)).rejects.toThrow(InternalServerErrorException);
      expect(handlePrismaErrorModule.handlePrismaError).toHaveBeenCalledWith(expect.any(Error), 'Product');
    });
  });

  describe('findColorById', () => {
    it('should return color when found', async () => {
      prisma.color.findUnique.mockResolvedValueOnce(mockColor);

      const result = await service.findColorById('color-1');

      expect(prisma.color.findUnique).toHaveBeenCalledWith({ where: { id: 'color-1' } });
      expect(result).toEqual(mockColor);
    });

    it('should throw BadRequestException when color not found', async () => {
      prisma.color.findUnique.mockResolvedValueOnce(null);

      await expect(service.findColorById('color-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findProductById', () => {
    it('should return product when found', async () => {
      prisma.product.findUnique.mockResolvedValueOnce(mockProduct);

      const result = await service.findProductById('product-1');

      expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 'product-1' } });
      expect(result).toEqual(mockProduct);
    });

    it('should throw BadRequestException when product not found', async () => {
      prisma.product.findUnique.mockResolvedValueOnce(null);

      await expect(service.findProductById('product-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findCategoryById', () => {
    it('should return category when found', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(mockCategory);

      const result = await service.findCategoryById('category-1');

      expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: 'category-1' } });
      expect(result).toEqual(mockCategory);
    });

    it('should throw BadRequestException when category not found', async () => {
      prisma.category.findUnique.mockResolvedValueOnce(null);

      await expect(service.findCategoryById('category-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findBrandById', () => {
    it('should return brand when found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(mockBrand);

      const result = await service.findBrandById('brand-1');

      expect(prisma.brand.findUnique).toHaveBeenCalledWith({ where: { id: 'brand-1' } });
      expect(result).toEqual(mockBrand);
    });

    it('should throw BadRequestException when brand not found', async () => {
      prisma.brand.findUnique.mockResolvedValueOnce(null);

      await expect(service.findBrandById('brand-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findSkuBySku', () => {
    it('should return null when SKU does not exist', async () => {
      prisma.productVariant.findUnique.mockResolvedValueOnce(null);

      const result = await service.findSkuBySku('NON-EXISTENT-SKU');

      expect(prisma.productVariant.findUnique).toHaveBeenCalledWith({ where: { sku: 'NON-EXISTENT-SKU' } });
      expect(result).toBeNull();
    });

    it('should throw BadRequestException when SKU already exists', async () => {
      prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);

      await expect(service.findSkuBySku('EXISTENT-SKU')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findVariantById', () => {
    it('should return variant when found', async () => {
      prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);

      const result = await service.findVariantById('variant-1');

      expect(prisma.productVariant.findUnique).toHaveBeenCalledWith({ where: { id: 'variant-1' } });
      expect(result).toEqual(mockProductVariant);
    });

    it('should throw BadRequestException when variant not found', async () => {
      prisma.productVariant.findUnique.mockResolvedValueOnce(null);

      await expect(service.findVariantById('variant-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    const paginationDto: PaginationProductDto = {
      page: 1,
      limit: 10,
      name: 'Test',
      minPrice: 1000,
      maxPrice: 5000,
      status: ProductStatus.ACTIVE,
      categoryId: 'category-1',
      brandId: 'brand-1',
      size: Size.L,
      stock: 50,
      sortBy: ProductSortField.CREATED_AT,
      sortOrder: SortOrder.DESC,
    };

    it('should return paginated products', async () => {
      prisma.product.findMany.mockResolvedValueOnce([mockProduct]);
      prisma.product.count.mockResolvedValueOnce(1);

      const result = await service.findAll(paginationDto);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          name: { contains: 'Test', mode: 'insensitive' },
          status: ProductStatus.ACTIVE,
          categoryId: 'category-1',
          brandId: 'brand-1',
          basePrice: { lte: 5000 },
          variants: {
            some: {
              size: Size.L,
              stock: { gte: 50 },
            },
          },
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: SortOrder.DESC },
        include: {
          variants: true,
          images: true,
          tags: true,
          brand: true,
          category: true,
        },
      });
      expect(result).toEqual({
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
        prevPage: false,
        nextPage: false,
        products: [mockProduct],
      });
    });

    it('should handle default pagination values', async () => {
      const emptyDto = {};
      prisma.product.findMany.mockResolvedValueOnce([mockProduct]);
      prisma.product.count.mockResolvedValueOnce(1);

      await service.findAll(emptyDto);

      expect(prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: expect.any(Number),
          orderBy: { createdAt: SortOrder.DESC },
        })
      );
    });
  });

  describe('findOne', () => {
    it('should return product with relations when found', async () => {
      prisma.product.findFirst.mockResolvedValueOnce(mockProduct);

      const result = await service.findOne('product-1');

      expect(prisma.product.findFirst).toHaveBeenCalledWith({
        where: { id: 'product-1' },
        include: {
          variants: true,
          images: true,
          tags: true,
          brand: true,
          category: true,
        },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      prisma.product.findFirst.mockResolvedValueOnce(null);

      await expect(service.findOne('product-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProduct', () => {
    const updateProductDto: UpdateProductDto = {
      name: 'Updated Product',
      status: ProductStatus.ARCHIVED,
    };

    it('should update product successfully', async () => {
      const updatedProduct = { 
        ...mockProduct, 
        name: 'Updated Product',
        slug: 'updated-product',
        status: ProductStatus.ARCHIVED 
      };
      prisma.product.update.mockResolvedValueOnce(updatedProduct);

      const result = await service.updateProduct('product-1', updateProductDto);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 'product-1' },
        data: {
          name: 'Updated Product',
          slug: 'test-product',
          status: ProductStatus.ARCHIVED,
        },
      });
      expect(result).toEqual({
        product: updatedProduct,
        message: 'Product updated successfully',
      });
    });
  });

  describe('removeProduct', () => {
    it('should delete product successfully', async () => {
      prisma.product.delete.mockResolvedValueOnce(undefined);

      const result = await service.removeProduct('product-1');

      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 'product-1' } });
      expect(result).toEqual({
        message: 'Product deleted successfully',
      });
    });
  });

  describe('Product Variant methods', () => {
    describe('findAllVariant', () => {
      it('should return all variants with relations', async () => {
        prisma.productVariant.findMany.mockResolvedValueOnce([mockProductVariant]);

        const result = await service.findAllVariant();

        expect(prisma.productVariant.findMany).toHaveBeenCalledWith({
          include: {
            product: true,
            color: true,
          },
        });
        expect(result).toEqual([mockProductVariant]);
      });
    });

    describe('findOneVariant', () => {
      it('should return variant when found', async () => {
        prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);

        const result = await service.findOneVariant('variant-1');

        expect(prisma.productVariant.findUnique).toHaveBeenCalledWith({
          where: { id: 'variant-1' },
          include: {
            product: true,
            color: true,
          },
        });
        expect(result).toEqual(mockProductVariant);
      });

      it('should throw NotFoundException when variant not found', async () => {
        prisma.productVariant.findUnique.mockResolvedValueOnce(null);

        await expect(service.findOneVariant('variant-1')).rejects.toThrow(NotFoundException);
      });
    });

    describe('createVariant', () => {
      const createVariantDto: CreateProductVariantDto = {
        productId: 'product-1',
        colorId: 'color-1',
        sku: 'NEW-SKU-001',
        barcode: '1234567890',
        size: Size.L,
        price: 2999,
        stock: 100,
        weightGrams: 500,
      };

      it('should create variant successfully', async () => {
        prisma.product.findUnique.mockResolvedValueOnce(mockProduct);
        prisma.color.findUnique.mockResolvedValueOnce(mockColor);
        prisma.productVariant.findUnique.mockResolvedValueOnce(null);
        prisma.productVariant.create.mockResolvedValueOnce(mockProductVariant);

        const result = await service.createVariant(createVariantDto);

        expect(prisma.productVariant.create).toHaveBeenCalledWith({
          data: createVariantDto,
        });
        expect(result).toEqual(mockProductVariant);
      });

      it('should throw BadRequestException when SKU already exists', async () => {
        prisma.product.findUnique.mockResolvedValueOnce(mockProduct);
        prisma.color.findUnique.mockResolvedValueOnce(mockColor);
        prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);

        await expect(service.createVariant(createVariantDto)).rejects.toThrow(BadRequestException);
        expect(prisma.productVariant.create).not.toHaveBeenCalled();
      });
    });

    describe('updateVariant', () => {
      const updateVariantDto: UpdateProductVariantDto = {
        price: 3499,
        stock: 150,
      };

      it('should update variant successfully', async () => {
        const updatedVariant = { ...mockProductVariant, price: 3499, stock: 150 };
        prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);
        prisma.productVariant.update.mockResolvedValueOnce(updatedVariant);

        const result = await service.updateVariant('variant-1', updateVariantDto);

        expect(prisma.productVariant.update).toHaveBeenCalledWith({
          where: { id: 'variant-1' },
          data: updateVariantDto,
        });
        expect(result).toEqual({
          variant: updatedVariant,
          message: 'Variant updated successfully',
        });
      });
    });

    describe('removeVariant', () => {
      it('should delete variant successfully', async () => {
        prisma.productVariant.findUnique.mockResolvedValueOnce(mockProductVariant);
        prisma.productVariant.delete.mockResolvedValueOnce(undefined);

        const result = await service.removeVariant('variant-1');

        expect(prisma.productVariant.delete).toHaveBeenCalledWith({ where: { id: 'variant-1' } });
        expect(result).toEqual({
          message: 'Variant deleted successfully',
        });
      });
    });
  });

  describe('Product Image methods', () => {
    describe('createImage', () => {
      const createImageDto: CreateProductImageDto = {
        url: 'https://example.com/image.jpg',
        alt: 'Test Image',
        position: 1,
        productId: 'product-1',
        variantId: 'variant-1',
      };

      it('should create image successfully', async () => {
        prisma.productImage.create.mockResolvedValueOnce(mockProductImage);

        const result = await service.createImage(createImageDto);

        expect(prisma.productImage.create).toHaveBeenCalledWith({
          data: createImageDto,
        });
        expect(result).toEqual(mockProductImage);
      });
    });

    describe('updateImage', () => {
      const updateImageDto: UpdateProductImageDto = {
        url: 'https://example.com/updated-image.jpg',
        alt: 'Updated Image',
      };

      it('should update image successfully', async () => {
        const updatedImage = { ...mockProductImage, url: 'https://example.com/updated-image.jpg', alt: 'Updated Image' };
        prisma.productImage.update.mockResolvedValueOnce(updatedImage);

        const result = await service.updateImage('image-1', updateImageDto);

        expect(prisma.productImage.update).toHaveBeenCalledWith({
          where: { id: 'image-1' },
          data: updateImageDto,
        });
        expect(result).toEqual(updatedImage);
      });
    });

    describe('removeImage', () => {
      it('should delete image successfully', async () => {
        prisma.productImage.delete.mockResolvedValueOnce(mockProductImage);

        const result = await service.removeImage('image-1');

        expect(prisma.productImage.delete).toHaveBeenCalledWith({ where: { id: 'image-1' } });
        expect(result).toEqual(mockProductImage);
      });
    });
  });
});