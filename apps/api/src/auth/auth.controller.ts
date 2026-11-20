import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import type { RegisterRequest, LoginRequest } from './auth.interfaces.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterRequest) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: LoginRequest) {
    return this.authService.login(body.email, body.password);
  }
}

