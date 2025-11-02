import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { isObservable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PayloadStrategyDto } from './dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const activationResult = super.canActivate(context);

        const handleResult = (canActivate: boolean) => {
            if (!canActivate) {
                return false;
            }

            return this.ensureAdminAccess(context);
        };

        if (activationResult instanceof Promise) {
            return activationResult.then(handleResult);
        }

        if (isObservable(activationResult)) {
            return activationResult.pipe(map(handleResult));
        }

        return handleResult(activationResult as boolean);
    }

    private ensureAdminAccess(context: ExecutionContext) {
        const request = context
            .switchToHttp()
            .getRequest<Request & { user?: PayloadStrategyDto }>();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException('No authenticated user found');
        }

        const isAdminLucas = user.email?.toLowerCase() === 'lucas@hotmail.com';

        if (!isAdminLucas) {
            throw new UnauthorizedException(
                'You are not authorized. Only the admin Lucas can access this route',
            );
        }

        return true;
    }
}
