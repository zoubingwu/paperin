import { IsEmail, IsString, IsEnum, IsNotEmpty, MinLength, MaxLength, IsOptional, IsInt } from 'class-validator';
import { UserRole, Sex } from './user.entity';

export interface UserData {
  id: number;
  email: string;
  name: string;
  sex: Sex;
  role: UserRole;
  ethnic?: string;
  phone?: string;
  address?: string;
  birthday?: number;
  degree?: string;
  department?: string;
  workId?: string;
  beginWorkAt?: number;
  password?: string;
}

export class CreateUserDto {
  @IsEmail(undefined, { message: '电子邮箱格式不正确' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: '密码最短需要 6 位' })
  @MaxLength(20, { message: '密码最长不超过 20 位' })
  password: string;

  @IsString()
  name: string;

  @IsEnum(Sex, { message: 'sex is not a valid value' })
  sex: Sex;

  @IsEnum(UserRole, { message: 'role is not a valid value' })
  role: UserRole;

  @IsString()
  @IsOptional()
  ethnic?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsInt()
  @IsOptional()
  birthday?: number;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  workId?: string;

  @IsInt()
  @IsOptional()
  beginWorkAt?: number;
}
