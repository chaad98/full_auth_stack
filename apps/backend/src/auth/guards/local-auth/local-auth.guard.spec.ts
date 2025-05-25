import { ExecutionContext } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });

  it('should extend AuthGuard with "local" strategy', async () => {
    const guard = new LocalAuthGuard();

    // Mock ExecutionContext
    const mockContext = {} as ExecutionContext;

    // Check if it has the canActivate method (inherited from AuthGuard)
    expect(typeof guard.canActivate).toBe('function');

    // This indirectly confirm it behaves like an AuthGuard with a strategy
    // We can't directly access the string 'local'
    expect(guard).toBeInstanceOf(AuthGuard('local'));
  });
});
