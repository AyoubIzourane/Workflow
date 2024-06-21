import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from './dto/create-formulaire.dto';
import { UpdateFormulaireDto } from './dto/update-formulaire.dto';

@Controller('formulaire')
export class FormulaireController {
    constructor(private readonly formulaireService: FormulaireService) {}

    @Get()
    findAll() {
        return this.formulaireService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.formulaireService.findOne(id);
    }

    @Post()
    create(@Body() createFormulaireDto: CreateFormulaireDto) {
        return this.formulaireService.create(createFormulaireDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateFormulaireDto: UpdateFormulaireDto) {
        return this.formulaireService.update(id, updateFormulaireDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.formulaireService.remove(id);
    }
}
