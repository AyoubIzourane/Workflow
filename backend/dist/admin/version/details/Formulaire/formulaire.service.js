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
exports.FormulaireService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Formulaire_1 = require("./interface/Formulaire");
let FormulaireService = class FormulaireService {
    constructor(formulaireRepository) {
        this.formulaireRepository = formulaireRepository;
    }
    async findAll() {
        return this.formulaireRepository.find({
            relations: ['element']
        });
    }
    async findOne(id) {
        const formulaire = await this.formulaireRepository.findOne({
            relations: ['element'],
            where: { id }
        });
        if (!formulaire) {
            throw new common_1.NotFoundException(`Formulaire with ID ${id} not found`);
        }
        return formulaire;
    }
    async create(formulaire) {
        const newFormulaire = this.formulaireRepository.create(formulaire);
        return this.formulaireRepository.save(newFormulaire);
    }
    async update(id, formulaire) {
        const updatedFormulaire = await this.formulaireRepository.preload({
            id: +id,
            ...formulaire,
        });
        if (!updatedFormulaire) {
            throw new common_1.NotFoundException(`Formulaire with ID ${id} not found`);
        }
        return this.formulaireRepository.save(updatedFormulaire);
    }
    async remove(id) {
        const formulaire = await this.formulaireRepository.findOne({
            relations: [],
            where: { id }
        });
        if (!formulaire) {
            throw new common_1.NotFoundException(`Formulaire with ID ${id} not found`);
        }
        await this.formulaireRepository.delete(id);
    }
};
exports.FormulaireService = FormulaireService;
exports.FormulaireService = FormulaireService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Formulaire_1.Formulaire)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FormulaireService);
//# sourceMappingURL=formulaire.service.js.map