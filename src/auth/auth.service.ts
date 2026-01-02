// import { Injectable } from '@nestjs/common';
// import { UserService } from '../users/user.service';
// import { signupDto as SignupDto } from './dto/signup.dto';
// @Injectable()
// export class AuthService {
//   constructor(private usersService: UserService) {}

//   signup(dto: SignupDto) {
//     return this.usersService.createUser({
//       id: Date.now(),
//       ...dto
//     });
//   }

//   login(email: string, password: string) {
//     return {
//       "message": "Login successful",
//     }
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { Role } from '../roles/role.enum';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  signup(dto: { name: string; email: string; password: string; role: Role }) {
    return this.usersService.createUser(dto);
  }

  login(email: string, password: string) {
    const user = this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      message: 'Login successful',
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
