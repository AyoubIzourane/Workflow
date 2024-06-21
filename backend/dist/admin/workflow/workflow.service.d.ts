import { Workflow } from './interface/workflow';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { EntitePrimaire } from '../entitePrimaire/interface/entitePrimaire';
import { Version } from '../version/interface/version';
export declare class WorkflowService {
    private readonly workflowRepository;
    private readonly entitePrimaireRepository;
    private readonly versionRepository;
    constructor(workflowRepository: Repository<Workflow>, entitePrimaireRepository: Repository<EntitePrimaire>, versionRepository: Repository<Version>);
    findAll(): Promise<Workflow[]>;
    findOne(id: number): Promise<Workflow>;
    create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow>;
    update(id: number, updateWorkflowDto: UpdateWorkflowDto): Promise<Workflow>;
    remove(id: number): Promise<void>;
}
