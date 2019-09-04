import { Controller, UseInterceptors, Get, Post, UseGuards, Body, Request } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { LoggingInterceptor } from '../../interceptors/logger.interceptor';
import { AuthService } from '../auth/auth.service';

@ApiUseTags('users')
@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(@Request() req) {
    return [1, 2, 3];
  }
}
