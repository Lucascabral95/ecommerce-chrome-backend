import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PayloadStrategyDto } from './dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        await super.canActivate(context);
        const request: Request = context.switchToHttp().getRequest();
        const user = request.user as PayloadStrategyDto;

        const adminLucas = user?.email === 'lucas@hotmail.com';

        if (!adminLucas) {
            throw new UnauthorizedException('You are not authorized. Only the admin Lucas can access this route');
        }

        return true;
    }
}
