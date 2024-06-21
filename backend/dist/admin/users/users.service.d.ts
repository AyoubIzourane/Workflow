import { User } from './interface/User';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/uptade-users-dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(createUsersDto: CreateUsersDto): Promise<User>;
    update(id: number, updateUsersDto: UpdateUsersDto): Promise<User>;
    remove(id: number): Promise<void>;
}
