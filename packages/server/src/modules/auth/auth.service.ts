import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../../utils/hashPassword';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(email, password) {
    return { email, id: 1 };
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === hashPassword(password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      email: user.email,
      id: user.id,
      access_token: this.jwtService.sign(payload)
    }
  }
}
