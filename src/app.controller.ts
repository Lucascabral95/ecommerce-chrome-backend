import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOperation({ summary: 'Get Hello World', description: 'Get Hello World' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  @ApiOperation({ summary: 'Health check', description: 'Get health check' })
  healthCheck() {
    return 'OK';
  }

  @Post('create-seed')
  @ApiOperation({ summary: 'Create seed', description: 'Create seed for testing' })
  @UseGuards(JwtAuthGuard)
  createSeed() {
    return this.appService.createSeed();
  }
}
