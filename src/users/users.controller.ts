import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from '../roles/role.enum';
import { RoleGuard } from '../roles/role.guard';

@Controller('users')
export class UsersController {
  constructor(private userservice: UserService) {}

  @Post('add-student')
  @UseGuards(new RoleGuard([Role.TEACHER, Role.ADMIN]))
  addStudent(
    @Body() user: { name: string; email: string; password: string; role: Role },
  ) {
    return this.userservice.createUser(user);
  }
}
