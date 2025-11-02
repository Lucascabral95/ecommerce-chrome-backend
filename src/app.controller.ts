import { Controller, Get, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Get Hello World', description: 'Get Hello World' })
  @ApiResponse({ status: 200, type: String, description: 'Hello World' })
  @ApiResponse({ status: 500, type: InternalServerErrorException, description: 'Internal Server Error' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  @ApiOperation({ summary: 'Health check', description: 'Get health check' })
  @ApiResponse({ status: 200, type: String, description: 'OK' })
  @ApiResponse({ status: 500, type: InternalServerErrorException, description: 'Internal Server Error' })
  healthCheck() {
    return 'OK';
  }

  @Post('create-seed')
  @ApiOperation({ summary: 'Create seed', description: 'Create seed for testing' })
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: String, description: 'Seed created successfully' })
  @ApiResponse({ status: 401, type: UnauthorizedException, description: 'Unauthorized' })
  @ApiResponse({ status: 500, type: InternalServerErrorException, description: 'Internal Server Error' })
  createSeed() {
    return this.appService.createSeed();
  }
}
