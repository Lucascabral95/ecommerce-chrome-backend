import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/shared/utils/generate-slug';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { name, parentId } = createCategoryDto;

      const slug = generateSlug(name);

      const categoryExists = await this.prisma.category.findUnique({ where: { slug } });

      if (categoryExists) {
        throw new BadRequestException(`Category with slug: ${slug} already exists`);
      }

      const category = await this.prisma.category.create({ data: { name, slug, parentId } });

      return {
        category: category,
        message: 'Category created successfully'
      };

    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error creating category');
    }
  }

  async findAll() {
    try {
      const categories = await this.prisma.category.findMany();

      if (!categories) {
        throw new NotFoundException('No categories found');
      }

      return categories;
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error finding categories');
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.prisma.category.findFirst({
        where: {
          id: id,
        }
      });

      if (!category) {
        throw new NotFoundException(`Category with id: ${id} not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error finding category');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    try {
      const updatedCategory = await this.prisma.category.update({ where: { id }, data: updateCategoryDto });

      return {
        category: updatedCategory,
        message: 'Category updated successfully'
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error updating category');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      await this.prisma.category.delete({ where: { id } });

      return {
        message: "Category removed successfully"
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error removing category');
    }
  }
}
