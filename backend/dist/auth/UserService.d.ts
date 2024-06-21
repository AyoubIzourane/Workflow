import { Repository } from 'typeorm';
import { User } from '../admin/users/interface/User';
import { Role } from '../admin/users/interface/Role';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(email: string, password: string, role: Role): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(userId: number): Promise<User | undefined>;
    save(user: User): Promise<User>;
    getCurrentUser(userId: number): Promise<User | undefined>;
}
