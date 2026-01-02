// import { Injectable } from "@nestjs/common";
// import { user } from "./user.entity";

// // import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {
//   private users = [];

//   createUser(user) {
//     this.users.push(user);
//     return user;
//   }

//   findByEmail(email: string) {
//     return this.users.find(u => u.email === email);
//   }
// }
import { Injectable } from '@nestjs/common';
import { Role } from '../roles/role.enum';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  // Create a new user
  createUser(dto: {
    name: string;
    email: string;
    password: string;
    role: Role;
  }): User {
    const user: User = {
      id: this.idCounter++,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    };
    this.users.push(user);
    return user;
  }

  // Find a user by email
  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
