import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

type MockUsersService = {
  findAll: jest.Mock;
  findOne: jest.Mock;
  updateUserById: jest.Mock;
  deleteUserById: jest.Mock;
  createAddress: jest.Mock;
  getAddressesById: jest.Mock;
  deleteAddress: jest.Mock;
  updateAddress: jest.Mock;
  createRole: jest.Mock;
  updateRole: jest.Mock;
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: MockUsersService;

  beforeEach(async () => {
    const mockUsersService: MockUsersService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateUserById: jest.fn(),
      deleteUserById: jest.fn(),
      createAddress: jest.fn(),
      getAddressesById: jest.fn(),
      deleteAddress: jest.fn(),
      updateAddress: jest.fn(),
      createRole: jest.fn(),
      updateRole: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService) as MockUsersService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should delegate to UsersService.findAll', async () => {
      const dto = { page: 1 } as any;
      const expected = { items: [], total: 0 };
      service.findAll.mockResolvedValueOnce(expected);

      const result = await controller.findAll(dto);

      expect(result).toBe(expected);
      expect(service.findAll).toHaveBeenCalledWith(dto);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 'user-1' };
      service.findOne.mockResolvedValueOnce(user);

      const result = await controller.findOne('user-1');

      expect(result).toBe(user);
      expect(service.findOne).toHaveBeenCalledWith('user-1');
    });
  });

  describe('updateUserById', () => {
    it('should update a user', async () => {
      const dto = { name: 'New Name' } as any;
      const updated = { id: 'user-1', ...dto };
      service.updateUserById.mockResolvedValueOnce(updated);

      const result = await controller.updateUserById('user-1', dto);

      expect(result).toBe(updated);
      expect(service.updateUserById).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('deleteUserById', () => {
    it('should delete a user', async () => {
      service.deleteUserById.mockResolvedValueOnce('ok');

      const result = await controller.deleteUserById('user-1');

      expect(result).toBe('ok');
      expect(service.deleteUserById).toHaveBeenCalledWith('user-1');
    });
  });

  describe('createAddress', () => {
    it('should create an address for a user', async () => {
      const dto = { street1: 'Main', userId: 'user-1' } as any;
      const address = { id: 'address-1', ...dto };
      service.createAddress.mockResolvedValueOnce(address);

      const result = await controller.createAddress('user-1', dto);

      expect(result).toBe(address);
      expect(service.createAddress).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('getAddressesById', () => {
    it('should get addresses for user', async () => {
      const summary = { addressCount: 0 };
      service.getAddressesById.mockResolvedValueOnce(summary);

      const result = await controller.getAddressesById('user-1');

      expect(result).toBe(summary);
      expect(service.getAddressesById).toHaveBeenCalledWith('user-1');
    });
  });

  describe('deleteAddressesById', () => {
    it('should delete address by id', async () => {
      service.deleteAddress.mockResolvedValueOnce('deleted');

      const result = await controller.deleteAddressesById('address-1');

      expect(result).toBe('deleted');
      expect(service.deleteAddress).toHaveBeenCalledWith('address-1');
    });
  });

  describe('updateAddress', () => {
    it('should update address for a user', async () => {
      const dto = { street1: 'Updated' } as any;
      const address = { id: 'address-1', ...dto };
      service.updateAddress.mockResolvedValueOnce(address);

      const result = await controller.updateAddress('user-1', dto);

      expect(result).toBe(address);
      expect(service.updateAddress).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('createRole', () => {
    it('should create a role for user', async () => {
      const dto = { roleId: 'role-1' } as any;
      const role = { id: 'user-role-1' };
      service.createRole.mockResolvedValueOnce(role);

      const result = await controller.createRole('user-1', dto);

      expect(result).toBe(role);
      expect(service.createRole).toHaveBeenCalledWith('user-1', dto);
    });
  });

  describe('updateRole', () => {
    it('should update role for user', async () => {
      const dto = { roleId: 'role-2' } as any;
      const updated = { id: 'user-role-1', roleId: 'role-2' };
      service.updateRole.mockResolvedValueOnce(updated);

      const result = await controller.updateRole('user-1', dto);

      expect(result).toBe(updated);
      expect(service.updateRole).toHaveBeenCalledWith('user-1', dto);
    });
  });
});
