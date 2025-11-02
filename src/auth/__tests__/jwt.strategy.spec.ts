jest.mock('src/config/env.schema', () => ({
  envs: { token_jwt: 'test-secret' },
}));

const fromAuthHeaderMock = jest.fn(() => 'token');
jest.mock('passport-jwt', () => ({
  Strategy: class {},
  ExtractJwt: { fromAuthHeaderAsBearerToken: fromAuthHeaderMock },
}));

describe('JwtStrategy', () => {
  let JwtStrategy: any;

  beforeAll(() => {
    JwtStrategy = require('../jwt.stategy').JwtStrategy;
  });

  it('should construct without throwing', () => {
    expect(() => new JwtStrategy()).not.toThrow();
  });

  it('validate should map payload to user object', async () => {
    const strategy = new JwtStrategy();
    const payload = { id: '123', email: 'user@example.com', name: 'User' } as any;
    await expect(strategy.validate(payload)).resolves.toEqual({
      id: '123',
      email: 'user@example.com',
      name: 'User',
    });
  });
});

