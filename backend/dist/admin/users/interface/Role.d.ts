import { User } from "./User";
export declare enum Role {
    Admin = "Admin",
    User = "User"
}
export interface IAuthenticate {
    user: User;
    token: string;
}
