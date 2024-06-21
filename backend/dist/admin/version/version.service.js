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
exports.VersionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const version_1 = require("./interface/version");
const Element_1 = require("./details/Element/interface/Element");
const Node_1 = require("./details/Node/interface/Node");
const Link_1 = require("./details/Link/interface/Link");
const Formulaire_1 = require("./details/Formulaire/interface/Formulaire");
let VersionService = class VersionService {
    constructor(versionRepository, elementRepository, nodeRepository, linkRepository, formulaireRepository) {
        this.versionRepository = versionRepository;
        this.elementRepository = elementRepository;
        this.nodeRepository = nodeRepository;
        this.linkRepository = linkRepository;
        this.formulaireRepository = formulaireRepository;
    }
    async findAll() {
        return this.versionRepository.find({
            relations: ['workflow']
        });
        ;
    }
    async findOne(id) {
        const version = await this.versionRepository.findOne({
            relations: ['workflow'],
            where: { id }
        });
        if (!version) {
            throw new common_1.NotFoundException(`Version with ID ${id} not found`);
        }
        return version;
    }
    async create(createVersionDto) {
        const { Element = [], nodeDataArray = [], linkDataArray = [], ...versionData } = createVersionDto;
        const versionEntity = this.versionRepository.create(versionData);
        const savedVersion = await this.versionRepository.save(versionEntity);
        const elementEntities = Element.map(async (elementDto) => {
            const element = this.elementRepository.create({
                ...elementDto,
                version: savedVersion,
            });
            const savedElement = await this.elementRepository.save(element);
            const formulaires = elementDto.formulaire.map(f => {
                return this.formulaireRepository.create({
                    ...f,
                    element: savedElement,
                });
            });
            await this.formulaireRepository.save(formulaires);
            return savedElement;
        });
        const savedElements = await Promise.all(elementEntities);
        const nodeEntities = nodeDataArray.map(nodeDto => {
            return this.nodeRepository.create({
                ...nodeDto,
                version: savedVersion,
            });
        });
        await this.nodeRepository.save(nodeEntities);
        const linkEntities = linkDataArray.map(linkDto => {
            return this.linkRepository.create({
                ...linkDto,
                version: savedVersion,
            });
        });
        await this.linkRepository.save(linkEntities);
        return savedVersion;
    }
    async updateWithDetails(id, updateVersionWithDetailsDto) {
        const version = await this.versionRepository.findOne({
            where: { id },
            relations: ['elements', 'nodes', 'links'],
        });
        if (!version) {
            throw new common_1.NotFoundException(`Version with ID ${id} not found`);
        }
        const { Element = [], nodeDataArray = [], linkDataArray = [] } = updateVersionWithDetailsDto;
        const elementEntities = Element.map(async (elementDto) => {
            const element = this.elementRepository.create({
                ...elementDto,
                version,
            });
            const savedElement = await this.elementRepository.save(element);
            const formulaires = elementDto.formulaire.map(f => {
                return this.formulaireRepository.create({
                    ...f,
                    element: savedElement,
                });
            });
            await this.formulaireRepository.save(formulaires);
            return savedElement;
        });
        const nodeEntities = nodeDataArray.map(nodeDto => {
            return this.nodeRepository.create({
                ...nodeDto,
                version,
            });
        });
        await this.nodeRepository.save(nodeEntities);
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
    async update(id, updateVersionDto) {
        const version = await this.versionRepository.preload({
            id: +id,
            ...updateVersionDto,
        });
        if (!version) {
            throw new common_1.NotFoundException(`Version with ID ${id} not found`);
        }
        return this.versionRepository.save(version);
    }
    async remove(id) {
        const version = await this.versionRepository.findOne({
            relations: [],
            where: { id }
        });
        ;
        if (!version) {
            throw new common_1.NotFoundException(`Version with ID ${id} not found`);
        }
        await this.versionRepository.delete(id);
    }
    async findByWorkflowId(workflowId) {
        return this.versionRepository.find({
            relations: ['workflow'],
            where: { workflow: { id: workflowId } }
        });
    }
};
exports.VersionService = VersionService;
exports.VersionService = VersionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(version_1.Version)),
    __param(1, (0, typeorm_1.InjectRepository)(Element_1.Element)),
    __param(2, (0, typeorm_1.InjectRepository)(Node_1.Node)),
    __param(3, (0, typeorm_1.InjectRepository)(Link_1.Link)),
    __param(4, (0, typeorm_1.InjectRepository)(Formulaire_1.Formulaire)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VersionService);
//# sourceMappingURL=version.service.js.map