"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntitePrimaireModule = void 0;
const common_1 = require("@nestjs/common");
const entitePrimaire_controller_1 = require("./entitePrimaire.controller");
const entitePrimaire_service_1 = require("./entitePrimaire.service");
const entitePrimaire_1 = require("./interface/entitePrimaire");
const typeorm_1 = require("@nestjs/typeorm");
let EntitePrimaireModule = class EntitePrimaireModule {
};
exports.EntitePrimaireModule = EntitePrimaireModule;
exports.EntitePrimaireModule = EntitePrimaireModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entitePrimaire_1.EntitePrimaire])],
        controllers: [entitePrimaire_controller_1.EntitePrimaireController],
        providers: [entitePrimaire_service_1.EntitePrimaireService],
        exports: [typeorm_1.TypeOrmModule],
    })
], EntitePrimaireModule);
//# sourceMappingURL=entitePrimaire.module.js.map