import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users-dto';
import { UpdateUsersDto } from './dto/uptade-users-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

//to get now from Service
@Get()
findAllUsers(){
    return this.usersService.findAll();
}
@Get(':id')
findOne(@Param('id') id: number){
  return this.usersService.findOne(id)
}

@Post()
async create(@Body() CreateUsersDto : CreateUsersDto) {
return this.usersService.create(CreateUsersDto);
}


@Patch(':id')
update(@Param('id') id: number, @Body() UpdateUsersDto: UpdateUsersDto) {
  return this.usersService.update(id,UpdateUsersDto);
}

@Delete(':id')
remove(@Param('id') id: number) {
  return this.usersService.remove(id);
}    


}
