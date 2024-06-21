import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
export declare class WorkflowController {
    private readonly workflowService;
    constructor(workflowService: WorkflowService);
    findAll(): Promise<import("./interface/workflow").Workflow[]>;
    findOne(id: number): Promise<import("./interface/workflow").Workflow>;
    create(createWorkflowDto: CreateWorkflowDto): Promise<import("./interface/workflow").Workflow>;
    update(id: number, updateWorkflowDto: UpdateWorkflowDto): Promise<import("./interface/workflow").Workflow>;
    remove(id: number): Promise<void>;
}
