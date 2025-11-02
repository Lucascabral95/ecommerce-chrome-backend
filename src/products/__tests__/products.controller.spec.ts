import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { CreateProductDto, CreateProductVariantDto, CreateProductImageDto } from '../dto/create-product.dto';
import { UpdateProductDto, UpdateProductVariantDto, UpdateProductImageDto } from '../dto/update-product.dto';
import { PaginationProductDto } from '../dto/pagination-product.dto';
import { ProductStatus, Size } from '@prisma/client';

type MockProductsService = {
  createProduct: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  updateProduct: jest.Mock;
  removeProduct: jest.Mock;
  findAllVariant: jest.Mock;
  findOneVariant: jest.Mock;
  createVariant: jest.Mock;
  updateVariant: jest.Mock;
  removeVariant: jest.Mock;
  createImage: jest.Mock;
  updateImage: jest.Mock;
  removeImage: jest.Mock;
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: MockProductsService;

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

  const mockPaginatedResponse = {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
    prevPage: false,
    nextPage: false,
    products: [mockProduct],
  };

  const mockCreateProductDto: CreateProductDto = {
    name: 'Test Product',
    description: 'Test Description',
    basePrice: 1999,
    status: ProductStatus.ACTIVE,
    brandId: 'brand-1',
    categoryId: 'category-1',
  };

  const mockUpdateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    status: ProductStatus.ARCHIVED,
  };

  const mockCreateVariantDto: CreateProductVariantDto = {
    productId: 'product-1',
    colorId: 'color-1',
    sku: 'NEW-SKU-001',
    barcode: '1234567890',
    size: Size.L,
    price: 2999,
    stock: 100,
    weightGrams: 500,
  };

  const mockUpdateVariantDto: UpdateProductVariantDto = {
    price: 3499,
    stock: 150,
  };

  const mockCreateImageDto: CreateProductImageDto = {
    url: 'https://example.com/image.jpg',
    alt: 'Test Image',
    position: 1,
    productId: 'product-1',
    variantId: 'variant-1',
  };

  const mockUpdateImageDto: UpdateProductImageDto = {
    url: 'https://example.com/updated-image.jpg',
    alt: 'Updated Image',
  };

  beforeEach(async () => {
    const mockProducts: MockProductsService = {
      createProduct: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateProduct: jest.fn(),
      removeProduct: jest.fn(),
      findAllVariant: jest.fn(),
      findOneVariant: jest.fn(),
      createVariant: jest.fn(),
      updateVariant: jest.fn(),
      removeVariant: jest.fn(),
      createImage: jest.fn(),
      updateImage: jest.fn(),
      removeImage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProducts,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get(ProductsService) as unknown as MockProductsService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Product Variant endpoints', () => {
    describe('findAllVariant', () => {
      it('should return all product variants', async () => {
        productsService.findAllVariant.mockResolvedValueOnce([mockProductVariant]);

        const result = await controller.findAllVariant();

        expect(productsService.findAllVariant).toHaveBeenCalled();
        expect(result).toEqual([mockProductVariant]);
      });

      it('should handle errors when finding all variants', async () => {
        const error = new Error('Service error');
        productsService.findAllVariant.mockRejectedValueOnce(error);

        await expect(controller.findAllVariant()).rejects.toThrow(error);
        expect(productsService.findAllVariant).toHaveBeenCalled();
      });
    });

    describe('findOneVariant', () => {
      it('should return a single product variant', async () => {
        productsService.findOneVariant.mockResolvedValueOnce(mockProductVariant);

        const result = await controller.findOneVariant('variant-1');

        expect(productsService.findOneVariant).toHaveBeenCalledWith('variant-1');
        expect(result).toEqual(mockProductVariant);
      });

      it('should handle errors when finding a variant', async () => {
        const error = new Error('Variant not found');
        productsService.findOneVariant.mockRejectedValueOnce(error);

        await expect(controller.findOneVariant('variant-1')).rejects.toThrow(error);
        expect(productsService.findOneVariant).toHaveBeenCalledWith('variant-1');
      });
    });

    describe('createVariant', () => {
      it('should create a new product variant', async () => {
        productsService.createVariant.mockResolvedValueOnce(mockProductVariant);

        const result = await controller.createVariant(mockCreateVariantDto);

        expect(productsService.createVariant).toHaveBeenCalledWith(mockCreateVariantDto);
        expect(result).toEqual(mockProductVariant);
      });

      it('should handle errors when creating a variant', async () => {
        const error = new Error('Creation failed');
        productsService.createVariant.mockRejectedValueOnce(error);

        await expect(controller.createVariant(mockCreateVariantDto)).rejects.toThrow(error);
        expect(productsService.createVariant).toHaveBeenCalledWith(mockCreateVariantDto);
      });
    });

    describe('updateVariant', () => {
      it('should update a product variant', async () => {
        const updatedVariant = { ...mockProductVariant, price: 3499, stock: 150 };
        const updateResponse = {
          variant: updatedVariant,
          message: 'Variant updated successfully',
        };
        productsService.updateVariant.mockResolvedValueOnce(updateResponse);

        const result = await controller.updateVariant('variant-1', mockUpdateVariantDto);

        expect(productsService.updateVariant).toHaveBeenCalledWith('variant-1', mockUpdateVariantDto);
        expect(result).toEqual(updateResponse);
      });

      it('should handle errors when updating a variant', async () => {
        const error = new Error('Update failed');
        productsService.updateVariant.mockRejectedValueOnce(error);

        await expect(controller.updateVariant('variant-1', mockUpdateVariantDto)).rejects.toThrow(error);
        expect(productsService.updateVariant).toHaveBeenCalledWith('variant-1', mockUpdateVariantDto);
      });
    });

    describe('removeVariant', () => {
      it('should delete a product variant', async () => {
        const deleteResponse = {
          message: 'Variant deleted successfully',
        };
        productsService.removeVariant.mockResolvedValueOnce(deleteResponse);

        const result = await controller.removeVariant('variant-1');

        expect(productsService.removeVariant).toHaveBeenCalledWith('variant-1');
        expect(result).toEqual(deleteResponse);
      });

      it('should handle errors when deleting a variant', async () => {
        const error = new Error('Deletion failed');
        productsService.removeVariant.mockRejectedValueOnce(error);

        await expect(controller.removeVariant('variant-1')).rejects.toThrow(error);
        expect(productsService.removeVariant).toHaveBeenCalledWith('variant-1');
      });
    });
  });

  describe('Product endpoints', () => {
    describe('create', () => {
      it('should create a new product', async () => {
        productsService.createProduct.mockResolvedValueOnce(mockProduct);

        const result = await controller.create(mockCreateProductDto);

        expect(productsService.createProduct).toHaveBeenCalledWith(mockCreateProductDto);
        expect(result).toEqual(mockProduct);
      });

      it('should handle errors when creating a product', async () => {
        const error = new Error('Creation failed');
        productsService.createProduct.mockRejectedValueOnce(error);

        await expect(controller.create(mockCreateProductDto)).rejects.toThrow(error);
        expect(productsService.createProduct).toHaveBeenCalledWith(mockCreateProductDto);
      });
    });

    describe('findAll', () => {
      it('should return paginated products', async () => {
        const paginationDto: PaginationProductDto = {
          page: 1,
          limit: 10,
          name: 'Test',
        };
        productsService.findAll.mockResolvedValueOnce(mockPaginatedResponse);

        const result = await controller.findAll(paginationDto);

        expect(productsService.findAll).toHaveBeenCalledWith(paginationDto);
        expect(result).toEqual(mockPaginatedResponse);
      });

      it('should handle empty pagination DTO', async () => {
        const emptyDto = {};
        productsService.findAll.mockResolvedValueOnce(mockPaginatedResponse);

        const result = await controller.findAll(emptyDto);

        expect(productsService.findAll).toHaveBeenCalledWith(emptyDto);
        expect(result).toEqual(mockPaginatedResponse);
      });

      it('should handle errors when finding all products', async () => {
        const error = new Error('Service error');
        productsService.findAll.mockRejectedValueOnce(error);

        await expect(controller.findAll({})).rejects.toThrow(error);
        expect(productsService.findAll).toHaveBeenCalledWith({});
      });
    });

    describe('findOne', () => {
      it('should return a single product', async () => {
        productsService.findOne.mockResolvedValueOnce(mockProduct);

        const result = await controller.findOne('product-1');

        expect(productsService.findOne).toHaveBeenCalledWith('product-1');
        expect(result).toEqual(mockProduct);
      });

      it('should handle errors when finding a product', async () => {
        const error = new Error('Product not found');
        productsService.findOne.mockRejectedValueOnce(error);

        await expect(controller.findOne('product-1')).rejects.toThrow(error);
        expect(productsService.findOne).toHaveBeenCalledWith('product-1');
      });
    });

    describe('updateProduct', () => {
      it('should update a product', async () => {
        const updateResponse = {
          product: { ...mockProduct, name: 'Updated Product' },
          message: 'Product updated successfully',
        };
        productsService.updateProduct.mockResolvedValueOnce(updateResponse);

        const result = await controller.updateProduct('product-1', mockUpdateProductDto);

        expect(productsService.updateProduct).toHaveBeenCalledWith('product-1', mockUpdateProductDto);
        expect(result).toEqual(updateResponse);
      });

      it('should handle errors when updating a product', async () => {
        const error = new Error('Update failed');
        productsService.updateProduct.mockRejectedValueOnce(error);

        await expect(controller.updateProduct('product-1', mockUpdateProductDto)).rejects.toThrow(error);
        expect(productsService.updateProduct).toHaveBeenCalledWith('product-1', mockUpdateProductDto);
      });
    });

    describe('remove', () => {
      it('should delete a product', async () => {
        const deleteResponse = {
          message: 'Product deleted successfully',
        };
        productsService.removeProduct.mockResolvedValueOnce(deleteResponse);

        const result = await controller.remove('product-1');

        expect(productsService.removeProduct).toHaveBeenCalledWith('product-1');
        expect(result).toEqual(deleteResponse);
      });

      it('should handle errors when deleting a product', async () => {
        const error = new Error('Deletion failed');
        productsService.removeProduct.mockRejectedValueOnce(error);

        await expect(controller.remove('product-1')).rejects.toThrow(error);
        expect(productsService.removeProduct).toHaveBeenCalledWith('product-1');
      });
    });
  });

  describe('Product Image endpoints', () => {
    describe('createImage', () => {
      it('should create a new product image', async () => {
        productsService.createImage.mockResolvedValueOnce(mockProductImage);

        const result = await controller.createImage(mockCreateImageDto);

        expect(productsService.createImage).toHaveBeenCalledWith(mockCreateImageDto);
        expect(result).toEqual(mockProductImage);
      });

      it('should handle errors when creating an image', async () => {
        const error = new Error('Creation failed');
        productsService.createImage.mockRejectedValueOnce(error);

        await expect(controller.createImage(mockCreateImageDto)).rejects.toThrow(error);
        expect(productsService.createImage).toHaveBeenCalledWith(mockCreateImageDto);
      });
    });

    describe('updateImage', () => {
      it('should update a product image', async () => {
        const updatedImage = { ...mockProductImage, url: 'https://example.com/updated-image.jpg', alt: 'Updated Image' };
        productsService.updateImage.mockResolvedValueOnce(updatedImage);

        const result = await controller.updateImage('image-1', mockUpdateImageDto);

        expect(productsService.updateImage).toHaveBeenCalledWith('image-1', mockUpdateImageDto);
        expect(result).toEqual(updatedImage);
      });

      it('should handle errors when updating an image', async () => {
        const error = new Error('Update failed');
        productsService.updateImage.mockRejectedValueOnce(error);

        await expect(controller.updateImage('image-1', mockUpdateImageDto)).rejects.toThrow(error);
        expect(productsService.updateImage).toHaveBeenCalledWith('image-1', mockUpdateImageDto);
      });
    });

    describe('removeImage', () => {
      it('should delete a product image', async () => {
        productsService.removeImage.mockResolvedValueOnce(mockProductImage);

        const result = await controller.removeImage('image-1');

        expect(productsService.removeImage).toHaveBeenCalledWith('image-1');
        expect(result).toEqual(mockProductImage);
      });

      it('should handle errors when deleting an image', async () => {
        const error = new Error('Deletion failed');
        productsService.removeImage.mockRejectedValueOnce(error);

        await expect(controller.removeImage('image-1')).rejects.toThrow(error);
        expect(productsService.removeImage).toHaveBeenCalledWith('image-1');
      });
    });
  });

  describe('Controller structure', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have all product variant methods', () => {
      expect(typeof controller.findAllVariant).toBe('function');
      expect(typeof controller.findOneVariant).toBe('function');
      expect(typeof controller.createVariant).toBe('function');
      expect(typeof controller.updateVariant).toBe('function');
      expect(typeof controller.removeVariant).toBe('function');
    });

    it('should have all product methods', () => {
      expect(typeof controller.create).toBe('function');
      expect(typeof controller.findAll).toBe('function');
      expect(typeof controller.findOne).toBe('function');
      expect(typeof controller.updateProduct).toBe('function');
      expect(typeof controller.remove).toBe('function');
    });

    it('should have all product image methods', () => {
      expect(typeof controller.createImage).toBe('function');
      expect(typeof controller.updateImage).toBe('function');
      expect(typeof controller.removeImage).toBe('function');
    });
  });

  describe('DTO validation', () => {
    it('should pass through DTOs correctly to service methods', async () => {
      productsService.createProduct.mockResolvedValueOnce(mockProduct);
      productsService.findAll.mockResolvedValueOnce(mockPaginatedResponse);
      productsService.updateProduct.mockResolvedValueOnce({ product: mockProduct, message: 'Updated' });
      productsService.createVariant.mockResolvedValueOnce(mockProductVariant);
      productsService.updateVariant.mockResolvedValueOnce({ variant: mockProductVariant, message: 'Updated' });
      productsService.createImage.mockResolvedValueOnce(mockProductImage);
      productsService.updateImage.mockResolvedValueOnce(mockProductImage);

      await controller.create(mockCreateProductDto);
      await controller.findAll(mockCreateProductDto as any);
      await controller.updateProduct('product-1', mockUpdateProductDto);
      await controller.createVariant(mockCreateVariantDto);
      await controller.updateVariant('variant-1', mockUpdateVariantDto);
      await controller.createImage(mockCreateImageDto);
      await controller.updateImage('image-1', mockUpdateImageDto);

      expect(productsService.createProduct).toHaveBeenCalledWith(mockCreateProductDto);
      expect(productsService.findAll).toHaveBeenCalledWith(mockCreateProductDto);
      expect(productsService.updateProduct).toHaveBeenCalledWith('product-1', mockUpdateProductDto);
      expect(productsService.createVariant).toHaveBeenCalledWith(mockCreateVariantDto);
      expect(productsService.updateVariant).toHaveBeenCalledWith('variant-1', mockUpdateVariantDto);
      expect(productsService.createImage).toHaveBeenCalledWith(mockCreateImageDto);
      expect(productsService.updateImage).toHaveBeenCalledWith('image-1', mockUpdateImageDto);
    });
  });
});