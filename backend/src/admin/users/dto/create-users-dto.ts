import { IsString,  IsOptional, IsDate, IsNotEmpty } from "class-validator";
import { Role } from "../interface/Role";
import { Type } from 'class-transformer';

export class CreateUsersDto {

    @IsOptional()
    @IsString()
    readonly firstname: string;

    @IsOptional()
    @IsString()
    readonly lastname: string;

    @IsOptional()
    @IsString()
    readonly telephone: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsOptional()
    @IsString()
    readonly password: string = 'password'; 

    @IsOptional()
    @IsString()
    readonly address: string;

    @IsOptional()
    @IsString()
    readonly department: string;

    @IsOptional()
    @IsString()
    readonly position: string;

    @IsOptional()
    @IsString()
    readonly gender: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly dateOfBirth: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly hireDate: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly createdAt: Date = new Date(); 

    @IsNotEmpty()
    @IsString()
    readonly role: Role;


}
