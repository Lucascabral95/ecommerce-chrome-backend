import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { envs } from 'src/config/env.schema';
import { PayloadStrategyDto } from './dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 401 si expira
            secretOrKey: envs.token_jwt,
        });
    }

    async validate(payload: PayloadStrategyDto) {
        return {
            id: payload.id,
            email: payload.email,
            name: payload.name
        };
    }
}
