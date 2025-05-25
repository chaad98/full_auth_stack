import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth') // this is the parent endpoint API
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup') // the endpoint will be /auth/signup
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('signin') // this endpoint will be /auth/signin
  login() {}
}
