import { Injectable, NotFoundException } from '@nestjs/common';
import { Workflow } from './interface/workflow';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { EntitePrimaire } from '../entitePrimaire/interface/entitePrimaire';
import { Version } from '../version/interface/version';

@Injectable()
export class WorkflowService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowRepository: Repository<Workflow>,
        @InjectRepository(EntitePrimaire)
        private readonly entitePrimaireRepository: Repository<EntitePrimaire>,
        @InjectRepository(Version) 
        private readonly versionRepository: Repository<Version>, 
    ){}

    async findAll(): Promise<Workflow[]> {
        return this.workflowRepository.find({
            relations: ['entitePrimaire', 'versions']
        });
    }    

    async findOne(id: number): Promise<Workflow> {
        const workflow = this.workflowRepository.findOne({
            relations: ['versions'],
            where: { id }
        });
        if (!workflow) {
            throw new NotFoundException(`This Workflow : ${id} not found`);
        }
        return workflow;
    }  
    
    async create(createWorkflowDto: CreateWorkflowDto) {
        const { entitePrimaire, ...rest } = createWorkflowDto;

        const newEntitePrimaire = this.entitePrimaireRepository.create(entitePrimaire);

        const savedEntitePrimaire = await this.entitePrimaireRepository.save(newEntitePrimaire);
        const createWorkflow = this.workflowRepository.create({
            ...rest,
            entitePrimaire: savedEntitePrimaire
        });

        const savedWorkflow = await this.workflowRepository.save(createWorkflow);

        const newVersion = this.versionRepository.create({
            versionNumber: 1,
            description: createWorkflowDto.description,
            createdAt: new Date(),
            default: true,
            workflow: savedWorkflow,
        });
        await this.versionRepository.save(newVersion);

        return savedWorkflow;
    }

    async update(id: number, updateWorkflowDto: UpdateWorkflowDto) {
        const workflow = await this.workflowRepository.preload({
            id: +id,
            ...updateWorkflowDto,
        });
        if (!workflow) {
            throw new NotFoundException(`This Workflow : ${id} not found`);
        }
        return this.workflowRepository.save(workflow);
    }

    async remove(id: number) {
        const workflow = await this.workflowRepository.findOne({
            relations: ['versions'],
            where: { id }
        });
    
        if (!workflow) {
            throw new NotFoundException(`Workflow with ID ${id} not found`);
        }
    
        for (const version of workflow.versions) {
            await this.versionRepository.remove(version);
        }
    
        await this.workflowRepository.remove(workflow);
    }
    
}