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
exports.ElementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Element_1 = require("./interface/Element");
const Formulaire_1 = require("../Formulaire/interface/Formulaire");
let ElementService = class ElementService {
    constructor(elementRepository, formulaireRepository) {
        this.elementRepository = elementRepository;
        this.formulaireRepository = formulaireRepository;
    }
    async findAll() {
        return this.elementRepository.find({
            relations: ['formulaires']
        });
    }
    async findOne(id) {
        const element = await this.elementRepository.findOne({
            relations: ['formulaires'],
            where: { id }
        });
        if (!element) {
            throw new common_1.NotFoundException(`Element with ID ${id} not found`);
        }
        return element;
    }
    async create(createElementDto) {
        const { key, titre, approbateur, escalader, delaiEscalade, resultat, formulaire } = createElementDto;
        const newElement = this.elementRepository.create({
            key,
            titre,
            approbateur,
            escalader,
            delaiEscalade,
            resultat,
        });
        const savedElement = await this.elementRepository.save(newElement);
        const formulaires = formulaire.map(f => {
            return this.formulaireRepository.create({
                ...f,
                element: savedElement,
            });
        });
        await this.formulaireRepository.save(formulaires);
        return this.elementRepository.findOne({
            where: { id: savedElement.id },
            relations: ['formulaires'],
        });
    }
    async update(id, updateElementDto) {
        const element = await this.elementRepository.preload({
            id: +id,
            ...updateElementDto,
        });
        if (!element) {
            throw new common_1.NotFoundException(`Element with ID ${id} not found`);
        }
        return this.elementRepository.save(element);
    }
    async remove(id) {
        const element = await this.elementRepository.findOne({
            where: { id }
        });
        if (!element) {
            throw new common_1.NotFoundException(`Element with ID ${id} not found`);
        }
        await this.elementRepository.remove(element);
    }
    async findByVersionId(versionId) {
        return this.elementRepository.createQueryBuilder('element')
            .leftJoinAndSelect('element.version', 'version')
            .leftJoinAndSelect('element.formulaires', 'formulaire')
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
};
exports.ElementService = ElementService;
exports.ElementService = ElementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Element_1.Element)),
    __param(1, (0, typeorm_1.InjectRepository)(Formulaire_1.Formulaire)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ElementService);
//# sourceMappingURL=element.service.js.map