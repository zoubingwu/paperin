import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserData, CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ email });
  }

  async create(dto: CreateUserDto) {
    const { email } = dto;
    const user = await this.findByEmail(email);

    if (user) {
      throw new BadRequestException('邮箱已被占用');
    }

    const newUser = new UserEntity(dto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, dto: Partial<UserData>): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;

    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email });
  }
}
