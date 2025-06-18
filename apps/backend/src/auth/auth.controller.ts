import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth') // this is the parent endpoint API
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup') // the endpoint will be /auth/signup
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  /**
   * ❓ How does LocalAuthGuard communicate with LocalStrategy?
   *
   * Even though there's no direct import or reference between LocalAuthGuard and LocalStrategy,
   * PassportJS (together with NestJS integration) handles the connection automatically.
   *
   * Here's how:
   * - LocalAuthGuard extends `AuthGuard('local')`.
   * - The string `'local'` refers to the strategy name used in `LocalStrategy`, powered by `passport-local`.
   * - Passport uses this string to internally resolve the correct strategy when the guard is triggered.
   * - As long as `LocalStrategy` is registered in the module's `providers`, it becomes available globally.
   *
   * ✅ You do NOT need to manually connect the guard to the strategy.
   * Passport + NestJS uses metadata and dependency injection to make the link behind the scenes.
   */

  /**
   * The `@UseGuards` decorator acts like middleware to protect API routes
   *
   *
   *
   * How it works (step-by-step):
   *
   * 1) The client sends a POST request to /auth/signin.
   * 2) The request first passes through the LocalAuthGuard.
   * 3) LocalAuthGuard triggers the LocalStrategy (see: apps/backend/src/auth/strategies/local.strategy.ts).
   * 4) Inside LocalStrategy, email and password are extracted from the request body,
   *    then passed to the `validate()` method and the `validateLocalUser()` function in the AuthService.
   * 5) The `validateLocalUser()` function returns a user object (e.g. { id, name }).
   * 6) The result is attached to the request as `request.user` by Passport from `validate` function.
   */
  @UseGuards(LocalAuthGuard)
  @Post('signin') // this endpoint will be /auth/signin
  login(@Request() req) {
    // For now, this returns the user object.
    // In a real-world application, you would typically return a JWT access token and refresh token instead.
    return this.authService.login(req.user.id, req.user.name);
  }
}
