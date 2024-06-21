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
exports.EntitePrimaireService = void 0;
const common_1 = require("@nestjs/common");
const entitePrimaire_1 = require("./interface/entitePrimaire");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let EntitePrimaireService = class EntitePrimaireService {
    constructor(entitePrimaireRepository) {
        this.entitePrimaireRepository = entitePrimaireRepository;
        this.entitePrimaire = [];
    }
    async findAll() {
        return this.entitePrimaireRepository.find({
            relations: []
        });
    }
    async findOne(id) {
        const entitePrimaire = this.entitePrimaireRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!entitePrimaire) {
            throw new common_1.NotFoundException(`This entitePrimaire : ${id} not found`);
        }
        return entitePrimaire;
    }
    async create(createEntitePrimaireDto) {
        const createEntitePrimaire = this.entitePrimaireRepository.create({
            ...createEntitePrimaireDto,
        });
        return this.entitePrimaireRepository.save(createEntitePrimaire);
    }
    async update(id, updateEntitePrimaireDto) {
        const entitePrimaire = await this.entitePrimaireRepository.preload({
            id: +id,
            ...updateEntitePrimaireDto,
        });
        if (!entitePrimaire) {
            throw new common_1.NotFoundException(`This EntitePrimaire : ${id} not found`);
        }
        return this.entitePrimaireRepository.save(entitePrimaire);
    }
    async remove(id) {
        const entitePrimaire = await this.entitePrimaireRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!entitePrimaire) {
            throw new common_1.NotFoundException(`entitePrimaire with ID ${id} not found`);
        }
        await this.entitePrimaireRepository.delete(id);
    }
};
exports.EntitePrimaireService = EntitePrimaireService;
exports.EntitePrimaireService = EntitePrimaireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entitePrimaire_1.EntitePrimaire)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EntitePrimaireService);
//# sourceMappingURL=entitePrimaire.service.js.map