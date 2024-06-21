import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './interface/version';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Element } from './details/Element/interface/Element'; 
import { Node } from './details/Node/interface/Node'; 
import { Link } from './details/Link/interface/Link'; 
import { Formulaire } from './details/Formulaire/interface/Formulaire';
import { UpdateVersionWithDetailsDto } from './dto/update-version-with-details.dto';

@Injectable()
export class VersionService {
    constructor(
        @InjectRepository(Version)
        private readonly versionRepository: Repository<Version>,
        @InjectRepository(Element)
        private readonly elementRepository: Repository<Element>,
        @InjectRepository(Node)
        private readonly nodeRepository: Repository<Node>,
        @InjectRepository(Link)
        private readonly linkRepository: Repository<Link>,
        @InjectRepository(Formulaire)
        private readonly formulaireRepository: Repository<Formulaire>,
    ){}

    async findAll(): Promise<Version[]> {
        return this.versionRepository.find({
            relations: ['workflow']
        });;
    }    

    async findOne(id: number): Promise<Version> {
        const version = await this.versionRepository.findOne({
            relations: ['workflow'],
            where: { id }
        });
        if (!version) {
            throw new NotFoundException(`Version with ID ${id} not found`);
        }
        return version;
    }  
    
    async create(createVersionDto: CreateVersionDto) {
        const { Element = [], nodeDataArray = [], linkDataArray = [], ...versionData } = createVersionDto;
    
        // Create the version entity
        const versionEntity = this.versionRepository.create(versionData);
        const savedVersion = await this.versionRepository.save(versionEntity);
    
        // Create the element entities
        const elementEntities = Element.map(async elementDto => {
            // Create the element entity
            const element = this.elementRepository.create({
                ...elementDto,
                version: savedVersion,
            });
    
            // Save the element entity
            const savedElement = await this.elementRepository.save(element);
    
            // Create Formulaire instances for this element
            const formulaires = elementDto.formulaire.map(f => {
                return this.formulaireRepository.create({
                    ...f,
                    element: savedElement,
                });
            });
    
            // Save Formulaire instances
            await this.formulaireRepository.save(formulaires);
    
            return savedElement;
        });
    
        // Save the element entities
        const savedElements = await Promise.all(elementEntities);
    
        // Create the Node entities
        const nodeEntities = nodeDataArray.map(nodeDto => {
            return this.nodeRepository.create({
                ...nodeDto,
                version: savedVersion,
            });
        });
    
        // Save the node entities
        await this.nodeRepository.save(nodeEntities);
    
        // Create the Link entities
        const linkEntities = linkDataArray.map(linkDto => {
            return this.linkRepository.create({
                ...linkDto,
                version: savedVersion,
            });
        });
    
        // Save the link entities
        await this.linkRepository.save(linkEntities);
    
        return savedVersion;
    }

    async updateWithDetails(id: number, updateVersionWithDetailsDto: UpdateVersionWithDetailsDto) {
        const version = await this.versionRepository.findOne({
            where: { id },
            relations: ['elements', 'nodes', 'links'],
        });

        if (!version) {
            throw new NotFoundException(`Version with ID ${id} not found`);
        }

        const { Element = [], nodeDataArray = [], linkDataArray = [] } = updateVersionWithDetailsDto;

        // Update Elements
         // Create the element entities
         const elementEntities = Element.map(async elementDto => {
            // Create the element entity
            const element = this.elementRepository.create({
                ...elementDto,
                version,
            });
    
            // Save the element entity
            const savedElement = await this.elementRepository.save(element);
    
            // Create Formulaire instances for this element
            const formulaires = elementDto.formulaire.map(f => {
                return this.formulaireRepository.create({
                    ...f,
                    element: savedElement,
                });
            });
    
            // Save Formulaire instances
            await this.formulaireRepository.save(formulaires);
    
            return savedElement;
        });

        // Update Nodes
        const nodeEntities = nodeDataArray.map(nodeDto => {
            return this.nodeRepository.create({
                ...nodeDto,
                version,
            });
        });

        await this.nodeRepository.save(nodeEntities);

        // Update Links
        const linkEntities = linkDataArray.map(linkDto => {
            return this.linkRepository.create({
                ...linkDto,
                version,
            });
        });

        await this.linkRepository.save(linkEntities);

        return this.versionRepository.findOne({
            where: { id },
            relations: ['elements', 'nodes', 'links'],
        });
    }
    

    async update(id: number, updateVersionDto: UpdateVersionDto) {
        const version = await this.versionRepository.preload({
            id: +id,
            ...updateVersionDto,
        });
        if (!version) {
            throw new NotFoundException(`Version with ID ${id} not found`);
        }
        return this.versionRepository.save(version);
    }

    async remove(id: number) {
        const version = await this.versionRepository.findOne({
            relations: [],
            where: { id }
        });;
        if (!version) {
            throw new NotFoundException(`Version with ID ${id} not found`);
        }
        await this.versionRepository.delete(id);
    }
    async findByWorkflowId(workflowId: number): Promise<Version[]> {
        return this.versionRepository.find({
            relations: ['workflow'],
            where: { workflow: { id: workflowId } }
        });
    }
    
}
