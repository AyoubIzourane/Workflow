import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/uptade-users-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository :Repository<User>,
        ){}

    async findAll(): Promise<User[]>{
        return this.usersRepository.find({
            relations:[]
        });
        }    

    async findOne( id: number) : Promise<User>{
        const users = this.usersRepository.findOne({
            relations:[],
            where:{id}
        }) ;
            if (!users) {
            throw new NotFoundException(`This user : ${id} not found`);
            }
            return users;
        }  
        
    async create(createUsersDto: CreateUsersDto) {
        
        const users = this.usersRepository.create({
            ...createUsersDto,
        });
        
        return this.usersRepository.save(users);
        }

    async update(id: number, updateUsersDto: UpdateUsersDto) {
            const updateUsers = await this.usersRepository.preload({
            id: +id,
            ...updateUsersDto,
            })
    
    
            if (!updateUsers) {
            throw new NotFoundException(`This User : ${id} not found`);
            }
    
            return this.usersRepository.save(updateUsers);
        }

    async remove(id: number) {
        const users = await this.usersRepository.findOne({
            relations:[],
            where:{id}
        }) ;
        if (!users) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    
        await this.usersRepository.delete(id);
        }
}
