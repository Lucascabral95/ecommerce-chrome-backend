import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto, PayloadStrategyDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/errors/handler-prisma-error';
import { comparePassword, hashPassword } from 'src/shared/utils/hashed-password';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService,
    private jwt: JwtService,
    private cartService: CartService,
  ) { }

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      const { email, name, hashedPassword } = registerAuthDto;

      const emailLowerCase = email.toLowerCase().trim();

      const existentUser = await this.prisma.user.findUnique({
        where: {
          email: emailLowerCase
        }
      });

      if (existentUser) {
        throw new BadRequestException('Email already exists');
      }

      const passwordToHash = await hashPassword(hashedPassword);

      const user = await this.prisma.user.create({
        data: {
          email: emailLowerCase,
          name,
          hashedPassword: passwordToHash
        }
      });

      await this.cartService.create({
        userId: user.id,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        message: 'User created successfully'
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'User');
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, hashedPassword } = loginAuthDto;

      const emailLowerCase = email.toLowerCase().trim();

      const user = await this.prisma.user.findUnique({
        where: {
          email: emailLowerCase
        }
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      if (!user.hashedPassword) {
        throw new BadRequestException('User has no password');
      }

      const isPasswordValid = await comparePassword(hashedPassword, user.hashedPassword);

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      return {
        message: 'Login successful',
        accessToken: this.saveDataInToken(user as PayloadStrategyDto)
      };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      handlePrismaError(error, 'User');
    }
  }

  saveDataInToken(payload: PayloadStrategyDto) {
    const { id, email, name } = payload;

    return this.jwt.sign({ id, email, name });
  }
}
