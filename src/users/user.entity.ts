import { Role } from '../roles/role.enum';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}
