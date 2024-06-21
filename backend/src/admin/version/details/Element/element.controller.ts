import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';

@Controller('element')
export class ElementController {
    constructor(private readonly elementService: ElementService) {}

    @Get()
    findAll() {
        return this.elementService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.elementService.findOne(id);
    }

    @Post()
    create(@Body() createElementDto: CreateElementDto) {
        return this.elementService.create(createElementDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateElementDto: UpdateElementDto) {
        return this.elementService.update(id, updateElementDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.elementService.remove(id);
    }
    @Get('version/:versionId')
    findByVersionId(@Param('versionId') versionId: number) {
        return this.elementService.findByVersionId(versionId);
    }
}
