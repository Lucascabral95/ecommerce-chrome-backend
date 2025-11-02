import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateSlug } from 'src/shared/utils/generate-slug';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) { }

  async create(createBrandDto: CreateBrandDto) {
    try {
      const { name } = createBrandDto;
      const slug = generateSlug(name);

      const brandExists = await this.prisma.brand.findUnique({ where: { slug } });

      if (brandExists) {
        throw new BadRequestException(`Brand with slug: ${slug} already exists`);
      }

      const brand = await this.prisma.brand.create({ data: { name, slug } });

      return {
        brand: brand,
        message: 'Brand created successfully'
      };
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      handlePrismaError(error, 'Error creating brand');
    }
  }

  async findAll() {
    try {
      const brands = await this.prisma.brand.findMany();

      if (brands.length === 0) {
        throw new NotFoundException('No brands found');
      }

      return brands;
    } catch (error) {
      if (error instanceof InternalServerErrorException || error instanceof NotFoundException || error instanceof BadRequestException) throw error;
      handlePrismaError(error, 'Error finding brands');
    }
  }

  async findOne(id: string) {
    try {
      const brand = await this.prisma.brand.findUnique({ where: { id } });

      if (!brand) {
        throw new NotFoundException(`Brand with id: ${id} not found`);
      }

      return brand;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding brand');
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto) {
    await this.findOne(id);
    try {
      const { name } = updateBrandDto;
      const slug = name && generateSlug(name);

      const brand = await this.prisma.brand.update({
        where: {
          id
        }, data: {
          ...updateBrandDto,
          slug,
        }
      });

      return {
        brand: brand,
        message: 'Brand updated successfully'
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error updating brand');
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const brand = await this.prisma.brand.delete({
        where: {
          id: id,
        }
      });
      return {
        message: 'Brand removed successfully'
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error removing brand');
    }
  }
}
