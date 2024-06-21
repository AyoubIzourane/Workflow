import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { VersionService } from './version.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Version } from './interface/version';
import { UpdateVersionWithDetailsDto } from './dto/update-version-with-details.dto';

@Controller('version')
export class VersionController {
    constructor(private readonly versionService: VersionService) {}

    @Get()
    findAll() {
        return this.versionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.versionService.findOne(id);
    }

    @Post()
    create(@Body() createVersionDto: CreateVersionDto) {
        return this.versionService.create(createVersionDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateVersionDto: UpdateVersionDto) {
        return this.versionService.update(id, updateVersionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.versionService.remove(id);
    }
    @Get('VersionsByWorkflowId/:workflowId')
  async getVersionsByWorkflowId(@Param('workflowId') workflowId: number): Promise<Version[]> {
    return this.versionService.findByWorkflowId(workflowId);
  }
  @Post(':id')
  async updateVersionWithDetails(
      @Param('id') id: number,
      @Body() updateVersionWithDetailsDto: UpdateVersionWithDetailsDto
  ) {
      const version = await this.versionService.updateWithDetails(id, updateVersionWithDetailsDto);
      if (!version) {
          throw new NotFoundException(`Version with ID ${id} not found`);
      }
      return version;
  }
}
