import { Role } from './Role';

export interface User {
  id: number;
  firstname?: string;
  lastname?: string;
  telephone?: string;
  email: string;
  password?: string;
  address?: string;
  department?: string;
  position?: string;
  gender?: string;
  dateOfBirth?: Date | null;
  hireDate?: Date | null;
  createdAt?: Date;
  role?: Role;
  resetToken?: string;
}
