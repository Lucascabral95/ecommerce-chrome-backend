import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, CreateProductImageDto, CreateProductVariantDto } from './dto/create-product.dto';
import { UpdateProductDto, UpdateProductImageDto, UpdateProductVariantDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { generateSlug } from 'src/shared/utils/generate-slug';
import { Prisma, ProductStatus } from '@prisma/client';
import { PaginationProductDto, ProductSortField, SortOrder } from './dto';
import { envs } from 'src/config/env.schema';
import { Size } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateProductDto) {
    try {
      const { name, description, basePrice, status, brandId, categoryId } = dto;
      const slug = generateSlug(name);

      await this.findBrandById(brandId);
      await this.findCategoryById(categoryId);

      const product = await this.prisma.product.create({
        data: {
          name,
          slug,
          description,
          basePrice,
          status: status as ProductStatus,
          brand: { connect: { id: brandId } },
          category: { connect: { id: categoryId } },
        },
      });

      return product;

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  async findColorById(id?: string) {
    try {
      const color = await this.prisma.color.findUnique({
        where: {
          id: id
        }
      });

      if (!color) {
        throw new BadRequestException('Color not found');
      }

      return color;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Color');
      throw new InternalServerErrorException();
    }
  }

  async findProductById(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: id
        }
      });

      if (!product) {
        throw new BadRequestException('Product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  async findCategoryById(id?: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id: id
        }
      });

      if (!category) {
        throw new BadRequestException('Category not found');
      }

      return category;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Category');
      throw new InternalServerErrorException();
    }
  }

  async findBrandById(id?: string) {
    try {
      const brand = await this.prisma.brand.findUnique({
        where: {
          id: id
        }
      });

      if (!brand) {
        throw new BadRequestException('Brand not found');
      }

      return brand;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Brand');
      throw new InternalServerErrorException();
    }
  }

  async findSkuBySku(sku: string) {
    try {
      const skuVariant = await this.prisma.productVariant.findUnique({
        where: {
          sku: sku
        }
      });

      if (skuVariant) {
        throw new BadRequestException('Sku already exists');
      }

      return skuVariant;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Sku');
      throw new InternalServerErrorException();
    }
  }

  async findVariantById(id: string) {
    try {
      const variant = await this.prisma.productVariant.findUnique({
        where: {
          id: id
        }
      });

      if (!variant) {
        throw new BadRequestException('Variant not found');
      }

      return variant;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Variant');
      throw new InternalServerErrorException();
    }
  }

  async findAll(paginationProductDto: PaginationProductDto) {
    try {
      const {
        page = 1,
        limit = envs.limit,
        name,
        minPrice,
        maxPrice,
        status = ProductStatus.ACTIVE,
        categoryId,
        brandId,
        size,
        stock,
        sortBy = ProductSortField.CREATED_AT,
        sortOrder = SortOrder.DESC,
      } = paginationProductDto

      const take = Math.max(1, Number(limit));
      const skip = (Number(page) - 1) * take;

      const where: Prisma.ProductWhereInput = {
        ... (name && { name: { contains: name, mode: 'insensitive' as const } }),
        ... (status && { status: status as ProductStatus }),
        ... (categoryId && { categoryId: categoryId }),
        ... (brandId && { brandId: brandId }),
        ... (minPrice && { basePrice: { gte: Number(minPrice) } }),
        ... (maxPrice && { basePrice: { lte: Number(maxPrice) } }),
        ...((size || stock) && {
          variants: {
            some: {
              ...(size && { size: size as Size }),
              ...(stock && { stock: { gte: Number(stock) } }), // mayor stock que
            },
          },
        }),
      };

      const [products, total] = await Promise.all([
        this.prisma.product.findMany({
          where,
          skip,
          take,
          orderBy: {
            [sortBy]: sortOrder,
          },
          include: {
            variants: true,
            images: true,
            tags: true,
            brand: true,
            category: true,
          },
        }),
        this.prisma.product.count({ where }),
      ]);

      const totalPages = Math.max(1, Math.ceil(total / take));
      const prevPage = Number(page) > 1;
      const nextPage = Number(page) * take < total;

      return {
        page: Number(page),
        limit: take,
        total,
        totalPages,
        prevPage,
        nextPage,
        products,
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          id: id
        },
        include: {
          variants: true,
          images: true,
          tags: true,
          brand: true,
          category: true,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    try {
      const { id, name, status, ...rest } = updateProductDto;

      const product = await this.prisma.product.update({
        where: {
          id: productId
        },
        data: {
          name: name,
          slug: name && generateSlug(name),
          status: status as ProductStatus,
          ...rest
        }
      });

      return {
        product: product,
        message: 'Product updated successfully'
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  async removeProduct(id: string) {
    try {
      await this.prisma.product.delete({
        where: {
          id: id
        },
      });

      return {
        message: 'Product deleted successfully'
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Product');
      throw new InternalServerErrorException();
    }
  }

  /////////////////////////////////
  /// Product Variant
  /////////////////////////////////
  async findAllVariant() {
    try {
      const variants = await this.prisma.productVariant.findMany({
        include: {
          product: true,
          color: true,
        },
      });

      return variants;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductVariant');
      throw new InternalServerErrorException();
    }
  }

  async findOneVariant(id: string) {
    try {
      const variant = await this.prisma.productVariant.findUnique({
        where: {
          id: id
        },
        include: {
          product: true,
          color: true,
        },
      });

      if (!variant) {
        throw new NotFoundException('Variant not found');
      }

      return variant;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductVariant');
      throw new InternalServerErrorException();
    }
  }

  async createVariant(dto: CreateProductVariantDto) { // El trio productId, colorId y size debe ser unico
    try {
      const { productId, colorId, sku, barcode, size, price, stock, weightGrams } = dto;

      await this.findProductById(productId);
      await this.findColorById(colorId);
      await this.findSkuBySku(sku);

      const productVariant = await this.prisma.productVariant.create({
        data: {
          productId,
          colorId,
          sku,
          barcode,
          size,
          price,
          stock,
          weightGrams,
        },
      });

      return productVariant;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductVariant');
    }
  }

  async updateVariant(variantId: string, updateProductVariantDto: UpdateProductVariantDto) {
    await this.findOneVariant(variantId);

    try {
      const { productId, colorId, sku, barcode, size, price, stock, weightGrams } = updateProductVariantDto;

      const variant = await this.prisma.productVariant.update({
        where: {
          id: variantId
        },
        data: {
          productId,
          colorId,
          sku,
          barcode,
          size,
          price,
          stock,
          weightGrams,
        }
      });

      return {
        variant: variant,
        message: 'Variant updated successfully'
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductVariant');
      throw new InternalServerErrorException();
    }
  }

  async removeVariant(variantId: string) {
    await this.findOneVariant(variantId);

    try {
      await this.prisma.productVariant.delete({
        where: {
          id: variantId
        },
      });

      return {
        message: 'Variant deleted successfully'
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductVariant');
      throw new InternalServerErrorException();
    }
  }

  /////////////////////////////////
  /////////////////////////////////

  async createImage(dto: CreateProductImageDto) {
    try {
      const { url, alt, position, productId, variantId } = dto;

      const productImage = await this.prisma.productImage.create({
        data: {
          url,
          alt,
          position,
          productId,
          variantId,
        },
      });

      return productImage;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductImage');
    }
  }

  updateImage(imageId: string, updateProductImageDto: UpdateProductImageDto) {
    try {
      const { url, alt, position, productId, variantId } = updateProductImageDto;

      const image = this.prisma.productImage.update({
        where: {
          id: imageId
        },
        data: {
          url,
          alt,
          position,
          productId,
          variantId,
        }
      });

      return image;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductImage');
      throw new InternalServerErrorException();
    }
  }

  removeImage(imageId: string) {
    try {
      const image = this.prisma.productImage.delete({
        where: {
          id: imageId
        },
      });

      return image;
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'ProductImage');
      throw new InternalServerErrorException();
    }
  }
}
