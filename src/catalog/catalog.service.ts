import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBrandDto, CreateCategoryDto, CreateColorDto, CreateTagDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { generateSlug } from 'src/shared/utils/generate-slug';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) { }

  /// Brands
  async createBrand(createBrandDto: CreateBrandDto) {
    try {
      const { name } = createBrandDto;
      const slug = generateSlug(name);

      const brandExists = await this.prisma.brand.findUnique({ where: { slug } });

      if (brandExists) {
        throw new BadRequestException(`Brand with slug: ${slug} already exists`);
      }

      const brand = await this.prisma.brand.create({
        data: {
          name,
          slug
        }
      });

      return {
        brand: brand,
        message: 'Brand created successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  async findBrandsAll() {
    try {
      const brands = await this.prisma.brand.findMany();
      return brands;
    } catch (error) {
      handlePrismaError(error, 'Brand');
      throw error;
    }
  }

  async findOneBrand(slug: string) {
    try {
      const brand = await this.prisma.brand.findUnique({ where: { slug } });

      if (!brand) {
        throw new NotFoundException(`Brand with slug: ${slug} not found`);
      }

      return brand;
    } catch (error) {
      handlePrismaError(error, 'Brand', slug);
      throw error;
    }
  }

  /// Category
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const { name, parentId } = createCategoryDto;
      const slug = generateSlug(name);

      const categoryExists = await this.prisma.category.findUnique({ where: { slug } });

      if (categoryExists) {
        throw new BadRequestException(`Category with slug: ${slug} already exists`);
      }

      const category = await this.prisma.category.create({
        data: {
          name,
          slug,
          parentId
        }
      });

      return {
        category: category,
        message: 'Category created successfully'
      };
    } catch (error) {
      handlePrismaError(error, 'Category');
      throw error;
    }
  }

  async findCategoriesAll() {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      handlePrismaError(error, 'Category');
      throw error;
    }
  }

  async findOneCategory(slug: string) {
    try {
      const category = await this.prisma.category.findUnique({ where: { slug } });

      if (!category) {
        throw new NotFoundException(`Category with slug: ${slug} not found`);
      }

      return category;
    } catch (error) {
      handlePrismaError(error, 'Category', slug);
      throw error;
    }
  }

  /// Color
  async createColor(createColorDto: CreateColorDto) {
    try {
      const color = await this.prisma.color.create({ data: createColorDto });
      return {
        color: color,
        message: 'Color created successfully'
      };
    } catch (error) {
      handlePrismaError(error, 'Color');
      throw error;
    }
  }

  async findColorsAll() {
    try {
      const colors = await this.prisma.color.findMany();
      return colors;
    } catch (error) {
      handlePrismaError(error, 'Color');
      throw error;
    }
  }

  async findOneColor(id: string) {
    try {
      const color = await this.prisma.color.findUnique({ where: { id } });

      if (!color) {
        throw new NotFoundException(`Color with id: ${id} not found`);
      }

      return color;
    } catch (error) {
      handlePrismaError(error, 'Color', id);
      throw error;
    }
  }

  /// Tag
  async createTag(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const slug = generateSlug(name);

    const tagExists = await this.prisma.tag.findUnique({ where: { slug } });

    if (tagExists) {
      throw new BadRequestException(`Tag with slug: ${slug} already exists`);
    }

    try {
      const tag = await this.prisma.tag.create({
        data: {
          name,
          slug
        }
      });

      return {
        tag: tag,
        message: 'Tag created successfully'
      };
    } catch (error) {
      handlePrismaError(error, 'Tag');
      throw error;
    }
  }

  async findTagsAll() {
    try {
      const tags = await this.prisma.tag.findMany();

      if (!tags) return [];

      return tags;
    } catch (error) {
      handlePrismaError(error, 'Tag');
      throw error;
    }
  }

  async findOneTag(slug: string) {
    try {
      const tag = await this.prisma.tag.findUnique({ where: { slug } });

      if (!tag) {
        throw new NotFoundException(`Tag with slug: ${slug} not found`);
      }

      return tag;
    } catch (error) {
      handlePrismaError(error, 'Tag', slug);
      throw error;
    }
  }
}
