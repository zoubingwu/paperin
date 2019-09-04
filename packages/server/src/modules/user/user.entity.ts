import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail } from 'class-validator';
import { hashPassword } from '../../utils/hashPassword';
import { BaseEntity } from '../../base/entity.base';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal',

}

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sex: string;

  @Column({ length: 10 })
  ethnic: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 50, unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 100 })
  address: string;

  @Column({ type: 'datetime' })
  birthday: Date;

  @Column({ length: 10 })
  degree: string;

  @Column({ length: 10 })
  department: string;

  @Column({})
  work_id: string;

  @Column({ length: 10, default: UserRole.NORMAL })
  role: UserRole;

  @Column({ type: 'datetime' })
  begin_work_at: Date;

  @Column({ length: 100 })
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashPassword(this.password);
  }
}
