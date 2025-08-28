import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

import { envs } from 'src/config/env.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stategy';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: envs.token_jwt,
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
