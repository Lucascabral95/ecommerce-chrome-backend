import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { RegisterAuthDto, LoginAuthDto } from '../dto';

type MockAuthService = {
  register: jest.Mock;
  login: jest.Mock;
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: MockAuthService;

  const mockRegisterDto: RegisterAuthDto = {
    email: 'john@example.com',
    name: 'John Doe',
    hashedPassword: 'password123',
  };

  const mockLoginDto: LoginAuthDto = {
    email: 'john@example.com',
    hashedPassword: 'password123',
  };

  const mockRegisterResponse = {
    user: {
      id: 'user-1',
      email: 'john@example.com',
      name: 'John Doe',
    },
    message: 'User created successfully',
  };

  const mockLoginResponse = {
    message: 'Login successful',
    accessToken: 'jwt-token',
  };

  beforeEach(async () => {
    const mockAuth: MockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuth,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService) as unknown as MockAuthService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      authService.register.mockResolvedValueOnce(mockRegisterResponse);

      const result = await controller.register(mockRegisterDto);

      expect(authService.register).toHaveBeenCalledWith(mockRegisterDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('Registration failed');
      authService.register.mockRejectedValueOnce(error);

      await expect(controller.register(mockRegisterDto)).rejects.toThrow(error);
      expect(authService.register).toHaveBeenCalledWith(mockRegisterDto);
    });

    it('should pass through the exact DTO to service', async () => {
      authService.register.mockResolvedValueOnce(mockRegisterResponse);

      const customDto: RegisterAuthDto = {
        email: 'test@example.com',
        name: 'Test User',
        hashedPassword: 'testpass123',
      };

      await controller.register(customDto);

      expect(authService.register).toHaveBeenCalledWith(customDto);
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      authService.login.mockResolvedValueOnce(mockLoginResponse);

      const result = await controller.login(mockLoginDto);

      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
      expect(result).toEqual(mockLoginResponse);
    });

    it('should handle login errors', async () => {
      const error = new Error('Login failed');
      authService.login.mockRejectedValueOnce(error);

      await expect(controller.login(mockLoginDto)).rejects.toThrow(error);
      expect(authService.login).toHaveBeenCalledWith(mockLoginDto);
    });

    it('should pass through the exact DTO to service', async () => {
      authService.login.mockResolvedValueOnce(mockLoginResponse);

      const customDto: LoginAuthDto = {
        email: 'test@example.com',
        hashedPassword: 'testpass123',
      };

      await controller.login(customDto);

      expect(authService.login).toHaveBeenCalledWith(customDto);
    });
  });

  describe('controller structure', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have register method', () => {
      expect(typeof controller.register).toBe('function');
    });

    it('should have login method', () => {
      expect(typeof controller.login).toBe('function');
    });
  });
});