"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementModule = void 0;
const common_1 = require("@nestjs/common");
const element_controller_1 = require("./element.controller");
const element_service_1 = require("./element.service");
const typeorm_1 = require("@nestjs/typeorm");
const Element_1 = require("./interface/Element");
const formulaire_module_1 = require("../Formulaire/formulaire.module");
let ElementModule = class ElementModule {
};
exports.ElementModule = ElementModule;
exports.ElementModule = ElementModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Element_1.Element]),
            formulaire_module_1.FormulaireModule,],
        controllers: [element_controller_1.ElementController],
        providers: [element_service_1.ElementService],
        exports: [typeorm_1.TypeOrmModule],
    })
], ElementModule);
//# sourceMappingURL=element.module.js.map