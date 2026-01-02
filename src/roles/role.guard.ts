import { Injectable } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { CanActivate, ExecutionContext } from '@nestjs/common';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private allowedRoles: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userRole = (request.headers['role'] as string).toLowerCase() as Role;
    const userId = parseInt(request.headers['user-id']);
    if (!this.allowedRoles.includes(userRole)) {
      return false;
    }
    request.user = { id: userId, role: userRole };
    return true;
  }
}
