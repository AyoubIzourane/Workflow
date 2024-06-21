import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EntitePrimaireService } from './entitePrimaire.service';
import { CreateEntitePrimaireDto } from './dto/create-entitePrimaire.dto';
import { UpdateEntitePrimaireDto } from './dto/update-entitePrimaire.dto';

@Controller('entitePrimaire')
export class EntitePrimaireController {
  constructor(private readonly entitePrimaireService: EntitePrimaireService) {}

  @Get()
  findAll() {
    return this.entitePrimaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.entitePrimaireService.findOne(id);
  }

  @Post()
  create(@Body() createEntitePrimaireDto: CreateEntitePrimaireDto) {
    return this.entitePrimaireService.create(createEntitePrimaireDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEntitePrimaireDto: UpdateEntitePrimaireDto) {
    return this.entitePrimaireService.update(id, updateEntitePrimaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.entitePrimaireService.remove(id);
  }
  
}

