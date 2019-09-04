import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { BaseService } from '../../base/service.base';
import { Request } from 'express';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super();
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ email })
  }

  async createOne(req: Request, dto: any) {
    console.log(req);
    console.log(dto);
    const newUser = new UserEntity();
    console.log(newUser)
    if (true) {
      this.throwBadRequestException('test');
    }
    return newUser;
  }

  async create(user: any) {
    const maybeUser = await this.findOneByEmail(user.email);

    if (maybeUser) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException({
        message: 'Input data validation failed',
        errors,
      }, HttpStatus.BAD_REQUEST);
    }

    const newUser = new UserEntity();

    // TODO validate input

    this.userRepository.save(newUser);
    return newUser;
  }

}
