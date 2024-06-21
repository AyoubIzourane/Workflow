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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Link_1 = require("./interface/Link");
let LinkService = class LinkService {
    constructor(linkRepository) {
        this.linkRepository = linkRepository;
    }
    async findAll() {
        return this.linkRepository.find({
            relations: []
        });
    }
    async findOne(id) {
        const link = await this.linkRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!link) {
            throw new common_1.NotFoundException(`Link with ID ${id} not found`);
        }
        return link;
    }
    async create(createLinkDto) {
        const from = { id: createLinkDto.from };
        const to = { id: createLinkDto.to };
        const newLink = await this.linkRepository.create({
            ...createLinkDto,
        });
        return this.linkRepository.save(newLink);
    }
    async update(id, updateLinkDto) {
        const link = await this.linkRepository.preload({
            id: +id,
            ...updateLinkDto,
        });
        if (!link) {
            throw new common_1.NotFoundException(`Link with ID ${id} not found`);
        }
        return this.linkRepository.save(link);
    }
    async remove(id) {
        const link = await this.linkRepository.findOne({
            where: { id }
        });
        if (!link) {
            throw new common_1.NotFoundException(`Link with ID ${id} not found`);
        }
        await this.linkRepository.remove(link);
    }
    async findByVersionId(versionId) {
        return this.linkRepository.createQueryBuilder('link')
            .leftJoinAndSelect('link.version', 'version')
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Link_1.Link)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LinkService);
//# sourceMappingURL=link.service.js.map