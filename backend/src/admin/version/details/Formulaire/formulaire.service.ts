import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulaire } from './interface/Formulaire';
import { CreateFormulaireDto } from './dto/create-formulaire.dto';
import { UpdateFormulaireDto } from './dto/update-formulaire.dto';

@Injectable()
export class FormulaireService {
    constructor(
        @InjectRepository(Formulaire)
        private readonly formulaireRepository: Repository<Formulaire>,
    ){}

    async findAll(): Promise<Formulaire[]> {
        return this.formulaireRepository.find({
            relations: ['element']
        });
    }    

    async findOne(id: number): Promise<Formulaire> {
        const formulaire = await this.formulaireRepository.findOne({
            relations: ['element'],
            where: { id }
        });
        if (!formulaire) {
            throw new NotFoundException(`Formulaire with ID ${id} not found`);
        }
        return formulaire;
    }  
    
    async create(formulaire: CreateFormulaireDto) {
        const newFormulaire = this.formulaireRepository.create(formulaire);
        return this.formulaireRepository.save(newFormulaire);
    }

    async update(id: number, formulaire: UpdateFormulaireDto) {
        const updatedFormulaire = await this.formulaireRepository.preload({
            id: +id,
            ...formulaire,
        });
        if (!updatedFormulaire) {
            throw new NotFoundException(`Formulaire with ID ${id} not found`);
        }
        return this.formulaireRepository.save(updatedFormulaire);
    }

    async remove(id: number) {
        const formulaire = await this.formulaireRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!formulaire) {
            throw new NotFoundException(`Formulaire with ID ${id} not found`);
        }
        await this.formulaireRepository.delete(id);
    }
}
