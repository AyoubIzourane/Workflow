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
exports.FormulaireController = void 0;
const common_1 = require("@nestjs/common");
const formulaire_service_1 = require("./formulaire.service");
const create_formulaire_dto_1 = require("./dto/create-formulaire.dto");
const update_formulaire_dto_1 = require("./dto/update-formulaire.dto");
let FormulaireController = class FormulaireController {
    constructor(formulaireService) {
        this.formulaireService = formulaireService;
    }
    findAll() {
        return this.formulaireService.findAll();
    }
    findOne(id) {
        return this.formulaireService.findOne(id);
    }
    create(createFormulaireDto) {
        return this.formulaireService.create(createFormulaireDto);
    }
    update(id, updateFormulaireDto) {
        return this.formulaireService.update(id, updateFormulaireDto);
    }
    remove(id) {
        return this.formulaireService.remove(id);
    }
};
exports.FormulaireController = FormulaireController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FormulaireController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaireController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_formulaire_dto_1.CreateFormulaireDto]),
    __metadata("design:returntype", void 0)
], FormulaireController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_formulaire_dto_1.UpdateFormulaireDto]),
    __metadata("design:returntype", void 0)
], FormulaireController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormulaireController.prototype, "remove", null);
exports.FormulaireController = FormulaireController = __decorate([
    (0, common_1.Controller)('formulaire'),
    __metadata("design:paramtypes", [formulaire_service_1.FormulaireService])
], FormulaireController);
//# sourceMappingURL=formulaire.controller.js.map