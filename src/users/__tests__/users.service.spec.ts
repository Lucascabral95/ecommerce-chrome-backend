import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as handlePrismaErrorModule from 'src/errors/handler-prisma-error';

type MockPrismaService = {
  user: {
    findMany: jest.Mock;
    count: jest.Mock;
    findUnique: jest.Mock;
    delete: jest.Mock;
    update: jest.Mock;
  };
  address: {
    findMany: jest.Mock;
    count: jest.Mock;
    findUnique: jest.Mock;
    findFirst: jest.Mock;
    delete: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
  };
  userRole: {
    findFirst: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
  };
  role: {
    findUnique: jest.Mock;
  };
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: MockPrismaService;

  const mockUser = {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    roles: [],
    addresses: [],
    carts: [],
  };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      user: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
      },
      address: {
        findMany: jest.fn(),
        count: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        delete: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      userRole: {
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      role: {
        findUnique: jest.fn(),
      },
    };

    jest.spyOn(handlePrismaErrorModule, 'handlePrismaError').mockImplementation(() => {
      throw new InternalServerErrorException('Database error');
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return paginated users data', async () => {
      const users = [mockUser];
      prisma.user.findMany.mockResolvedValueOnce(users);
      prisma.user.count.mockResolvedValueOnce(users.length);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalled();
      expect(result).toMatchObject({
        page: 1,
        limit: 10,
        total: 1,
        users,
      });
    });

    it('should delegate to handlePrismaError on failure', async () => {
      prisma.user.findMany.mockRejectedValueOnce(new Error('Unexpected error'));

      await expect(service.findAll({} as any)).rejects.toThrow(InternalServerErrorException);

      expect(handlePrismaErrorModule.handlePrismaError).toHaveBeenCalledWith(expect.any(Error), 'Error finding users');
    });
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);

      const result = await service.findOne('user-1');

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        select: expect.any(Object),
        where: { id: 'user-1' },
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.findOne('missing-user')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAddress', () => {
    it('should create an address after validating the user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      const newAddress = { id: 'address-1', userId: 'user-1', street1: 'Main St' };
      prisma.address.create.mockResolvedValueOnce(newAddress);

      const result = await service.createAddress('user-1', newAddress as any);

      expect(result).toEqual(newAddress);
      expect(prisma.address.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ userId: 'user-1' }),
      });
    });

    it('should rethrow known errors from createAddress', async () => {
      const notFound = new NotFoundException();
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      prisma.address.create.mockRejectedValueOnce(notFound);

      await expect(
        service.createAddress('user-1', { userId: 'user-1', street1: 'Main St' } as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAddress', () => {
    it('should update an existing address', async () => {
      const existingAddress = { id: 'address-1', userId: 'user-1' };
      const updatedAddress = { id: 'address-1', userId: 'user-1', street1: 'Updated St' };

      prisma.address.findFirst.mockResolvedValueOnce(existingAddress);
      prisma.address.update.mockResolvedValueOnce(updatedAddress);

      const result = await service.updateAddress('user-1', { street1: 'Updated St' } as any);

      expect(prisma.address.findFirst).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
      expect(result).toEqual(updatedAddress);
      expect(prisma.address.update).toHaveBeenCalledWith({
        where: { id: 'address-1' },
        data: { street1: 'Updated St' },
      });
    });

    it('should throw NotFoundException when no address exists', async () => {
      prisma.address.findFirst.mockResolvedValueOnce(null);

      await expect(service.updateAddress('user-1', { street1: 'Updated St' } as any)).rejects.toThrow(NotFoundException);
      expect(prisma.address.update).not.toHaveBeenCalled();
    });
  });

  describe('getAddressesById', () => {
    it('should return addresses summary for a user', async () => {
      const addresses = [{ id: 'address-1', userId: 'user-1' }];
      prisma.address.findMany.mockResolvedValueOnce(addresses);
      prisma.address.count.mockResolvedValueOnce(addresses.length);

      const result = await service.getAddressesById('user-1');

      expect(result).toMatchObject({
        addressCount: 1,
        firstAddress: addresses[0],
        addresses,
      });
      expect(prisma.address.findMany).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
      });
    });

    it('should throw when no address found for user', async () => {
      prisma.address.findMany.mockResolvedValueOnce(null);

      await expect(service.getAddressesById('user-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteAddress', () => {
    it('should delete an address when it exists', async () => {
      const address = { id: 'address-1', userId: 'user-1' };
      prisma.address.findUnique.mockResolvedValueOnce(address);

      const result = await service.deleteAddress('address-1');

      expect(result).toBe('Address deleted successfully');
      expect(prisma.address.delete).toHaveBeenCalledWith({ where: { id: 'address-1' } });
    });

    it('should throw NotFoundException when address missing', async () => {
      prisma.address.findUnique.mockResolvedValueOnce(null);

      await expect(service.deleteAddress('missing-address')).rejects.toThrow(NotFoundException);
      expect(prisma.address.delete).not.toHaveBeenCalled();
    });
  });

  describe('createRole', () => {
    it('should create a role for an existing user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      const role = { id: 'role-1', name: 'Admin' };
      prisma.role.findUnique.mockResolvedValueOnce(role);
      const createdRole = { id: 'user-role-1', roleId: 'role-1', userId: 'user-1' };
      prisma.userRole.create.mockResolvedValueOnce(createdRole);

      const result = await service.createRole('user-1', { userId: 'user-1', roleId: 'role-1' });

      expect(result).toEqual(createdRole);
      expect(prisma.userRole.create).toHaveBeenCalledWith({
        data: { roleId: 'role-1', userId: 'user-1' },
      });
    });

    it('should throw if role does not exist', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      prisma.role.findUnique.mockResolvedValueOnce(null);

      await expect(service.createRole('user-1', { userId: 'user-1', roleId: 'role-1' })).rejects.toThrow(NotFoundException);
      expect(prisma.userRole.create).not.toHaveBeenCalled();
    });
  });

  describe('updateRole', () => {
    it('should update existing user role', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.role.findUnique.mockResolvedValue({ id: 'role-1' });
      const existingUserRole = { userId: 'user-1', roleId: 'role-old' };
      prisma.userRole.findFirst.mockResolvedValueOnce(existingUserRole);
      const updatedUserRole = { userId: 'user-1', roleId: 'role-1' };
      prisma.userRole.update.mockResolvedValueOnce(updatedUserRole);

      const result = await service.updateRole('user-1', { userId: 'user-1', roleId: 'role-1' });

      expect(result).toEqual(updatedUserRole);
      expect(prisma.userRole.update).toHaveBeenCalledWith({
        where: {
          userId_roleId: { userId: 'user-1', roleId: 'role-old' },
        },
        data: { roleId: 'role-1' },
      });
    });

    it('should throw when user role not found', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.role.findUnique.mockResolvedValue({ id: 'role-1' });
      prisma.userRole.findFirst.mockResolvedValueOnce(null);

      await expect(service.updateRole('user-1', { userId: 'user-1', roleId: 'role-1' })).rejects.toThrow(NotFoundException);
      expect(prisma.userRole.update).not.toHaveBeenCalled();
    });
  });

  describe('findRoleById', () => {
    it('should return role when found', async () => {
      const role = { id: 'role-1', name: 'Admin' };
      prisma.role.findUnique.mockResolvedValueOnce(role);

      const result = await service.findRoleById('role-1');

      expect(result).toEqual(role);
    });

    it('should throw NotFoundException when role missing', async () => {
      prisma.role.findUnique.mockResolvedValueOnce(null);

      await expect(service.findRoleById('role-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateUserById', () => {
    it('should update user data when user exists', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      const updatedUser = { ...mockUser, name: 'Jane Doe' };
      prisma.user.update.mockResolvedValueOnce(updatedUser);

      const result = await service.updateUserById('user-1', { name: 'Jane Doe' });

      expect(result).toEqual({ id: 'user-1', name: 'Jane Doe', email: mockUser.email });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { name: 'Jane Doe', email: undefined },
      });
    });
  });
  describe('deleteUserById', () => {
    it('should delete a user when found', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      prisma.user.delete.mockResolvedValueOnce(undefined);

      const result = await service.deleteUserById('user-1');

      expect(result).toBe('User deleted successfully');
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 'user-1' } });
    });

    it('should throw NotFoundException when user is missing', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.deleteUserById('missing-user')).rejects.toThrow(NotFoundException);
      expect(prisma.user.delete).not.toHaveBeenCalled();
    });
  });
});
