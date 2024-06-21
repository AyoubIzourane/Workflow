"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowService = void 0;
const common_1 = require("@nestjs/common");
const workflow_1 = require("./interface/workflow");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entitePrimaire_1 = require("../entitePrimaire/interface/entitePrimaire");
const version_1 = require("../version/interface/version");
let WorkflowService = class WorkflowService {
    constructor(workflowRepository, entitePrimaireRepository, versionRepository) {
        this.workflowRepository = workflowRepository;
        this.entitePrimaireRepository = entitePrimaireRepository;
        this.versionRepository = versionRepository;
    }
    async findAll() {
        return this.workflowRepository.find({
            relations: ['entitePrimaire', 'versions']
        });
    }
    async findOne(id) {
        const workflow = this.workflowRepository.findOne({
            relations: ['versions'],
            where: { id }
        });
        if (!workflow) {
            throw new common_1.NotFoundException(`This Workflow : ${id} not found`);
        }
        return workflow;
    }
    async create(createWorkflowDto) {
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
    async update(id, updateWorkflowDto) {
        const workflow = await this.workflowRepository.preload({
            id: +id,
            ...updateWorkflowDto,
        });
        if (!workflow) {
            throw new common_1.NotFoundException(`This Workflow : ${id} not found`);
        }
        return this.workflowRepository.save(workflow);
    }
    async remove(id) {
        const workflow = await this.workflowRepository.findOne({
            relations: ['versions'],
            where: { id }
        });
        if (!workflow) {
            throw new common_1.NotFoundException(`Workflow with ID ${id} not found`);
        }
        for (const version of workflow.versions) {
            await this.versionRepository.remove(version);
        }
        await this.workflowRepository.remove(workflow);
    }
};
exports.WorkflowService = WorkflowService;
exports.WorkflowService = WorkflowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workflow_1.Workflow)),
    __param(1, (0, typeorm_1.InjectRepository)(entitePrimaire_1.EntitePrimaire)),
    __param(2, (0, typeorm_1.InjectRepository)(version_1.Version)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WorkflowService);
//# sourceMappingURL=workflow.service.js.map