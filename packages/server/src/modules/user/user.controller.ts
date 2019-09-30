import {
  Controller,
  UseInterceptors,
  Get,
  Put,
  Body,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from '../../interceptors/logger.interceptor';
import { UserService } from './user.service';
import { User } from './user.decorator';
import { UserData, CreateUserDto } from './user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { Roles } from '../roles/roles.decorator';
import { UserRole } from './user.entity';
import { RolesGuard } from '../roles/role.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@ApiUseTags('users')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/user.me')
  async findMe(@User('email') email: string): Promise<UserData> {
    return await this.userService.findByEmail(email);
  }

  @Get('/:id/user.get')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findById(parseInt(id, 10));
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  @Roles(UserRole.ADMIN)
  @Put('/user.update')
  async update(@Body('id') userId: number, @Body() userData: UserData) {
    return await this.userService.update(userId, userData);
  }

  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe())
  @Post('/user.create')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
