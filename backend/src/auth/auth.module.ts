import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../admin/users/interface/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './UserService';
import { MailService } from './mail/mail.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService,MailService]
})
export class AuthModule {}
