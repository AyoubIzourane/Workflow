import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';

@Controller('node')
export class NodeController {
    constructor(private readonly nodeService: NodeService) {}

    @Get()
    findAll() {
        return this.nodeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.nodeService.findOne(id);
    }

    @Post()
    create(@Body() createNodeDto: CreateNodeDto) {
        return this.nodeService.create(createNodeDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateNodeDto: UpdateNodeDto) {
        return this.nodeService.update(id, updateNodeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.nodeService.remove(id);
    }
    @Get('version/:versionId')
    findByVersionId(@Param('versionId') versionId: number) {
        return this.nodeService.findByVersionId(versionId);
    }
}
