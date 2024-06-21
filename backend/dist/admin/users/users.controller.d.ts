import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/uptade-users-dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<import("./interface/User").User[]>;
    findOne(id: number): Promise<import("./interface/User").User>;
    create(CreateUsersDto: CreateUsersDto): Promise<import("./interface/User").User>;
    update(id: number, UpdateUsersDto: UpdateUsersDto): Promise<import("./interface/User").User>;
    remove(id: number): Promise<void>;
}
