import { Entity, Column, BeforeInsert } from 'typeorm';
import { IsEnum } from 'class-validator';
import { Exclude } from 'class-transformer';
import { hashPassword } from '../../utils/hashPassword';
import { BaseEntity } from '../../base/entity.base';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal',
}

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 50 })
  name: string;

  @IsEnum(Sex)
  @Column({ length: 10, default: Sex.MALE })
  sex: Sex;

  @Column({ length: 10, default: UserRole.NORMAL })
  role: UserRole;

  @Column({ length: 10, nullable: true })
  ethnic?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  address?: string;

  @Column({ nullable: true })
  birthday?: number;

  @Column({ length: 10, nullable: true })
  degree?: string;

  @Column({ length: 10, nullable: true })
  department?: string;

  @Column({ nullable: true })
  workId?: string;

  @Column({ nullable: true })
  beginWorkAt?: number;

  @Exclude()
  @Column({ length: 100 })
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
