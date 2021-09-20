import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const securePassword = require('secure-password');

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(demolayId: string, password: string): Promise<any> {
    const user = await this.usersService.findByDemolayId(demolayId);

    if (!user) {
      return null;
    }

    const result = await this.validatePassword(user.password, password);

    switch(result) {
      case securePassword.VALID_NEEDS_REHASH: {
        return await this.usersService.rehashUserPassword(user.id, password);
      }
      case securePassword.VALID: {
        return user;
      }
      default: {
        return null;
      }
    }
  }

  private async validatePassword(userPassword: string, comparePassword: string) {
    const pwd = securePassword();
    return pwd.verify(Buffer.from(comparePassword), Buffer.from(userPassword));
  }
}
