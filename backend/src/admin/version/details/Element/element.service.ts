import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './interface/Element';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { Formulaire } from '../Formulaire/interface/Formulaire';

@Injectable()
export class ElementService {
    constructor(
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>,
        @InjectRepository(Formulaire)
        private readonly formulaireRepository: Repository<Formulaire>,
    ) {}

    async findAll(): Promise<Element[]> {
        return this.elementRepository.find({
            relations: ['formulaires']
        });
    }    

    async findOne(id: number): Promise<Element> {
        const element = await this.elementRepository.findOne({
            relations: ['formulaires'],
            where: { id }
        });
        if (!element) {
            throw new NotFoundException(`Element with ID ${id} not found`);
        }
        return element;
    }

    async create(createElementDto: CreateElementDto) {
        const { key, titre, approbateur, escalader, delaiEscalade,resultat, formulaire } = createElementDto;

        // Create new Element instance
        const newElement = this.elementRepository.create({
            key,
            titre,
            approbateur,
            escalader,
            delaiEscalade,
            resultat,
            //version: { id: version },
        });

        // Save the new Element
        const savedElement = await this.elementRepository.save(newElement);

        // Create Formulaire instances
        const formulaires = formulaire.map(f => {
            return this.formulaireRepository.create({
                ...f,
                element: savedElement,
            });
        });

        // Save Formulaire instances
        await this.formulaireRepository.save(formulaires);

        // Reload the element with the related Formulaires
        return this.elementRepository.findOne({
            where: { id: savedElement.id },
            relations: ['formulaires'],
        });
    }

    async update(id: number, updateElementDto: UpdateElementDto) {
        const element = await this.elementRepository.preload({
            id: +id,
            ...updateElementDto,
            //version: updateElementDto.version ? { id: updateElementDto.version } : undefined,
        });
        if (!element) {
            throw new NotFoundException(`Element with ID ${id} not found`);
        }
        return this.elementRepository.save(element);
    }

    async remove(id: number) {
        const element = await this.elementRepository.findOne({
            where: { id }
        });
        if (!element) {
            throw new NotFoundException(`Element with ID ${id} not found`);
        }
        await this.elementRepository.remove(element);
    }
    async findByVersionId(versionId: number): Promise<Element[]> {
        return this.elementRepository.createQueryBuilder('element')
            .leftJoinAndSelect('element.version', 'version')
            .leftJoinAndSelect('element.formulaires', 'formulaire')  // Join with formulaires
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
}
