import { Role } from "../interface/Role";
export declare class UpdateUsersDto {
    readonly firstname: string;
    readonly lastname: string;
    readonly telephone: string;
    readonly email: string;
    readonly password: string;
    readonly address: string;
    readonly department: string;
    readonly position: string;
    readonly gender: string;
    readonly dateOfBirth: Date;
    readonly hireDate: Date;
    readonly createdAt: Date;
    readonly role: Role;
}
