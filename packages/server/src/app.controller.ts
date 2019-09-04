import { Controller, Get, UseInterceptors, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { AuthService } from './modules/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  @Get('hi')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
