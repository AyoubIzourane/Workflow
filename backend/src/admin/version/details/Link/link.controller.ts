import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('link')
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @Get()
    findAll() {
        return this.linkService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.linkService.findOne(id);
    }

    @Post()
    create(@Body() createLinkDto: CreateLinkDto) {
        return this.linkService.create(createLinkDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateLinkDto: UpdateLinkDto) {
        return this.linkService.update(id, updateLinkDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.linkService.remove(id);
    }
    @Get('version/:versionId')
    findByVersionId(@Param('versionId') versionId: number) {
        return this.linkService.findByVersionId(versionId);
    }
}
