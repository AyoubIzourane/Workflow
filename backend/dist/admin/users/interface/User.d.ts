import { Role } from './Role';
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    telephone: string;
    email: string;
    password: string;
    address: string;
    department: string;
    position: string;
    gender: string;
    dateOfBirth: Date;
    hireDate: Date;
    createdAt: Date;
    role: Role;
    resetToken: string;
    setDefaults(): void;
}
