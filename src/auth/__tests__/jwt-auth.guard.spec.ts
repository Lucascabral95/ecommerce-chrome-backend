import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: () =>
    class {
      canActivate = jest.fn().mockImplementation(async (context) => {
        const req = context.switchToHttp().getRequest();
        if (!req.user) {
          throw new UnauthorizedException('No JWT token found');
        }
        return true;
      });
    },
}));

const createContext = (user?: any): ExecutionContext => {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user }),
      getResponse: () => ({}),
    }),
  } as unknown as ExecutionContext;
};

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    const reflector: any = { get: jest.fn() };
    guard = new JwtAuthGuard(reflector);
  });

  it('should allow access when user email is the admin lucas', async () => {
    const ctx = createContext({ email: 'lucas@hotmail.com' });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
  });

  it('should throw UnauthorizedException when no user is present', async () => {
    const ctx = createContext();
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
  });
});

