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
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Node_1 = require("./interface/Node");
let NodeService = class NodeService {
    constructor(nodeRepository) {
        this.nodeRepository = nodeRepository;
    }
    async findAll() {
        return this.nodeRepository.find({
            relations: []
        });
    }
    async findOne(id) {
        const node = await this.nodeRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!node) {
            throw new common_1.NotFoundException(`Node with ID ${id} not found`);
        }
        return node;
    }
    async create(createNodeDto) {
        const newNode = this.nodeRepository.create(createNodeDto);
        return this.nodeRepository.save(newNode);
    }
    async update(id, updateNodeDto) {
        const node = await this.nodeRepository.preload({
            id: +id,
            ...updateNodeDto,
        });
        if (!node) {
            throw new common_1.NotFoundException(`Node with ID ${id} not found`);
        }
        return this.nodeRepository.save(node);
    }
    async remove(id) {
        const node = await this.nodeRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!node) {
            throw new common_1.NotFoundException(`Node with ID ${id} not found`);
        }
        await this.nodeRepository.delete(id);
    }
    async findByVersionId(versionId) {
        return this.nodeRepository.createQueryBuilder('node')
            .leftJoinAndSelect('node.version', 'version')
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
};
exports.NodeService = NodeService;
exports.NodeService = NodeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Node_1.Node)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NodeService);
//# sourceMappingURL=node.service.js.map