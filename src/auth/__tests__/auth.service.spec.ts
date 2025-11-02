import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { RegisterAuthDto, LoginAuthDto } from '../dto';
import * as handlePrismaErrorModule from 'src/errors/handler-prisma-error';
import * as passwordUtils from 'src/shared/utils/hashed-password';

type MockPrismaService = {
  user: {
    findUnique: jest.Mock;
    create: jest.Mock;
  };
};

type MockCartService = {
  create: jest.Mock;
};

type MockJwtService = {
  sign: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;
  let prisma: MockPrismaService;
  let cartService: MockCartService;
  let jwtService: MockJwtService;

  const mockUser = {
    id: 'user-1',
    email: 'john@example.com',
    name: 'John Doe',
    hashedPassword: 'hashedPassword123',
  };

  const mockRegisterDto: RegisterAuthDto = {
    email: 'john@example.com',
    name: 'John Doe',
    hashedPassword: 'password123',
  };

  const mockLoginDto: LoginAuthDto = {
    email: 'john@example.com',
    hashedPassword: 'password123',
  };

  beforeEach(async () => {
    const mockPrisma: MockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const mockCart: MockCartService = {
      create: jest.fn(),
    };

    const mockJwt: MockJwtService = {
      sign: jest.fn(),
    };

    jest.spyOn(handlePrismaErrorModule, 'handlePrismaError').mockImplementation(() => {
      throw new InternalServerErrorException('Database error');
    });

    jest.spyOn(passwordUtils, 'hashPassword').mockResolvedValue('hashedPassword123');
    jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
        {
          provide: JwtService,
          useValue: mockJwt,
        },
        {
          provide: CartService,
          useValue: mockCart,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
    cartService = module.get(CartService) as unknown as MockCartService;
    jwtService = module.get(JwtService) as unknown as MockJwtService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);
      prisma.user.create.mockResolvedValueOnce(mockUser);
      cartService.create.mockResolvedValueOnce(undefined);

      const result = await service.register(mockRegisterDto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(passwordUtils.hashPassword).toHaveBeenCalledWith('password123');
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'john@example.com',
          name: 'John Doe',
          hashedPassword: 'hashedPassword123',
        },
      });
      expect(cartService.create).toHaveBeenCalledWith({
        userId: 'user-1',
      });
      expect(result).toEqual({
        user: {
          id: 'user-1',
          email: 'john@example.com',
          name: 'John Doe',
        },
        message: 'User created successfully',
      });
    });

    it('should throw BadRequestException when email already exists', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);

      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('should handle email with uppercase letters and spaces', async () => {
      const registerDtoWithSpaces: RegisterAuthDto = {
        email: '  JOHN@EXAMPLE.COM  ',
        name: 'John Doe',
        hashedPassword: 'password123',
      };

      prisma.user.findUnique.mockResolvedValueOnce(null);
      prisma.user.create.mockResolvedValueOnce(mockUser);
      cartService.create.mockResolvedValueOnce(undefined);

      await service.register(registerDtoWithSpaces);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'john@example.com',
          name: 'John Doe',
          hashedPassword: 'hashedPassword123',
        },
      });
    });

    it('should delegate to handlePrismaError on database error', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);
      prisma.user.create.mockRejectedValueOnce(new Error('Database error'));

      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(handlePrismaErrorModule.handlePrismaError).toHaveBeenCalledWith(
        expect.any(Error),
        'User',
      );
    });

    it('should rethrow BadRequestException', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);
      prisma.user.create.mockRejectedValueOnce(
        new BadRequestException('Custom error'),
      );

      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(handlePrismaErrorModule.handlePrismaError).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      jwtService.sign.mockReturnValueOnce('jwt-token');

      const result = await service.login(mockLoginDto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
        'password123',
        'hashedPassword123',
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'user-1',
        email: 'john@example.com',
        name: 'John Doe',
      });
      expect(result).toEqual({
        message: 'Login successful',
        accessToken: 'jwt-token',
      });
    });

    it('should throw BadRequestException when user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
      expect(passwordUtils.comparePassword).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when user has no password', async () => {
      const userWithoutPassword = { ...mockUser, hashedPassword: null };
      prisma.user.findUnique.mockResolvedValueOnce(userWithoutPassword);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(passwordUtils.comparePassword).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when password is invalid', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      jest.spyOn(passwordUtils, 'comparePassword').mockResolvedValueOnce(false);

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
        'password123',
        'hashedPassword123',
      );
    });

    it('should handle email with uppercase letters and spaces', async () => {
      const loginDtoWithSpaces: LoginAuthDto = {
        email: '  JOHN@EXAMPLE.COM  ',
        hashedPassword: 'password123',
      };

      prisma.user.findUnique.mockResolvedValueOnce(mockUser);
      jwtService.sign.mockReturnValueOnce('jwt-token');

      await service.login(loginDtoWithSpaces);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
    });

    it('should delegate to handlePrismaError on database error', async () => {
      prisma.user.findUnique.mockRejectedValueOnce(new Error('Database error'));

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        InternalServerErrorException,
      );
      expect(handlePrismaErrorModule.handlePrismaError).toHaveBeenCalledWith(
        expect.any(Error),
        'User',
      );
    });

    it('should rethrow BadRequestException', async () => {
      prisma.user.findUnique.mockRejectedValueOnce(
        new BadRequestException('Custom error'),
      );

      await expect(service.login(mockLoginDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(handlePrismaErrorModule.handlePrismaError).not.toHaveBeenCalled();
    });
  });

  describe('saveDataInToken', () => {
    it('should generate JWT token with user data', () => {
      const payload = {
        id: 'user-1',
        email: 'john@example.com',
        name: 'John Doe',
      };
      jwtService.sign.mockReturnValueOnce('jwt-token');

      const result = service.saveDataInToken(payload);

      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'user-1',
        email: 'john@example.com',
        name: 'John Doe',
      });
      expect(result).toBe('jwt-token');
    });
  });
});