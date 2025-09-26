import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { RolesService } from './roles/roles.service';
import { JwtService } from '@nestjs/jwt';
import { CartModule } from 'src/cart/cart.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, RolesService, JwtService],
  imports: [PrismaModule, CartModule],
})
export class UsersModule { }
