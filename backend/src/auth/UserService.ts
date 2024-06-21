import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../admin/users/interface/User';
import { Role } from '../admin/users/interface/Role';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, role: Role): Promise<User> {
    const user = this.userRepository.create({ email, password, role });
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }
  async findById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async getCurrentUser(userId: number): Promise<User | undefined> {
    return this.findById(userId);
  }

}
