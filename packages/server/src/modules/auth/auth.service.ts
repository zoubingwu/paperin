import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../../utils/hashPassword';
import { UserService } from '../user/user.service';
import { UserData } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === hashPassword(password)) {
      return user;
    }
    return null;
  }

  async login(user: Partial<UserData>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
