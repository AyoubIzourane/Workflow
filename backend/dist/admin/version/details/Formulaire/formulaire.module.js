"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaireModule = void 0;
const common_1 = require("@nestjs/common");
const formulaire_controller_1 = require("./formulaire.controller");
const formulaire_service_1 = require("./formulaire.service");
const typeorm_1 = require("@nestjs/typeorm");
const Formulaire_1 = require("./interface/Formulaire");
let FormulaireModule = class FormulaireModule {
};
exports.FormulaireModule = FormulaireModule;
exports.FormulaireModule = FormulaireModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Formulaire_1.Formulaire])],
        controllers: [formulaire_controller_1.FormulaireController],
        providers: [formulaire_service_1.FormulaireService],
        exports: [typeorm_1.TypeOrmModule],
    })
], FormulaireModule);
//# sourceMappingURL=formulaire.module.js.map