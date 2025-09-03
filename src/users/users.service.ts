import { BadGatewayException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { CreateAddressUserDto, CreateRolesUserDto, PaginationUserDto, UpdateAddressUserDto, UpdateRolesUserDto } from './dto';
import { envs } from 'src/config/env.schema';
import { Prisma } from '@prisma/client';
import { SortOrder } from 'src/products/dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll(paginationUserDto: PaginationUserDto) {
    try {
      const { page = 1, limit = envs.limit, name, email, orderBy = SortOrder.DESC } = paginationUserDto;

      const take = Math.max(1, Number(limit));
      const currentPage = Math.max(1, Number(page));
      const skip = (currentPage - 1) * take;

      const where: Prisma.UserWhereInput = {
        ...(name && { name: { contains: name, mode: 'insensitive' as const } }),
        ...(email && { email: { contains: email, mode: 'insensitive' as const } }),
      };

      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true
          },
          where,
          skip,
          take,
          orderBy: {
            createdAt: orderBy === SortOrder.DESC ? 'desc' : 'asc'
          },
        }),
        this.prisma.user.count({ where }),
      ]);

      const totalPages = Math.max(1, Math.ceil(total / take));
      const prevPage = currentPage > 1;
      const nextPage = currentPage * take < total;

      return {
        page: currentPage,
        limit: take,
        total,
        totalPages,
        prevPage,
        nextPage,
        users,
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding users');
      throw new BadGatewayException();
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        select: {
          id: true,
          email: true,
          name: true
        },
        where: {
          id
        }
      });

      if (!user) {
        throw new NotFoundException(`User with id: ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding user');
    }
  }

  // Addresss
  async createAddress(userId: string, createAddressDto: CreateAddressUserDto) {
    await this.findOne(userId);

    try {
      const address = await this.prisma.address.create({
        data: {
          ...createAddressDto,
          userId: userId
        },
      });

      return address;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error creating address');
    }
  }

  async updateAddress(userId: string, updateAddressDto: UpdateAddressUserDto) {
    await this.findOne(userId);

    try {
      const existingAddress = await this.prisma.address.findFirst({
        where: { userId: userId }
      });

      if (!existingAddress) {
        throw new NotFoundException('No address found for this user');
      }

      const address = await this.prisma.address.update({
        where: { id: existingAddress.id },
        data: updateAddressDto
      });

      return address;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'Error updating address');
    }
  }

  ///Roles
  async createRole(userId: string, createRoleDto: CreateRolesUserDto) {
    await this.findOne(userId);
    await this.findRoleById(createRoleDto.roleId);

    try {
      const role = await this.prisma.userRole.create({
        data: {
          roleId: createRoleDto.roleId,
          userId
        },
      });

      return role;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error creating role');
    }
  }

  async updateRole(userId: string, updateRoleDto: UpdateRolesUserDto) {
    await this.findOne(userId);
    await this.findRoleById(updateRoleDto.roleId!);

    try {
      const { roleId } = updateRoleDto;

      const existinRole = await this.prisma.userRole.findFirst({
        where: {
          userId: userId
        }
      });

      if (!existinRole) {
        throw new NotFoundException('No role found for this user');
      }

      const role = await this.prisma.userRole.update({
        where: {
          userId_roleId: {
            userId,
            roleId: existinRole.roleId
          }
        },
        data: {
          roleId: roleId
        }
      })

      return role;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error updating role');
    }
  }

  // Find Roles and Addressses
  async findRoleById(id: string) {
    try {
      const role = await this.prisma.role.findUnique({
        where: {
          id
        }
      });

      if (!role) {
        throw new NotFoundException(`Role with id: ${id} not found`);
      }

      return role;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof InternalServerErrorException) throw error;
      handlePrismaError(error, 'Error finding role');
    }
  }
}
