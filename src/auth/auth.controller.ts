import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetResponseLoginDto, GetResponseRegisterDto, LoginAuthDto, RegisterAuthDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user', description: 'Register a new user' })
  @ApiResponse({ status: 201, type: GetResponseRegisterDto })
  @ApiResponse({ status: 400, description: 'Email already exists' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user', description: 'Login a user' })
  @ApiResponse({ status: 200, type: GetResponseLoginDto })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
