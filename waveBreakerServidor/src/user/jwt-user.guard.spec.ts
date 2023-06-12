import { JwtAuthGuard } from './jwt-user.guard';

describe('JwtAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
