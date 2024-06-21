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
exports.ElementController = void 0;
const common_1 = require("@nestjs/common");
const element_service_1 = require("./element.service");
const create_element_dto_1 = require("./dto/create-element.dto");
const update_element_dto_1 = require("./dto/update-element.dto");
let ElementController = class ElementController {
    constructor(elementService) {
        this.elementService = elementService;
    }
    findAll() {
        return this.elementService.findAll();
    }
    findOne(id) {
        return this.elementService.findOne(id);
    }
    create(createElementDto) {
        return this.elementService.create(createElementDto);
    }
    update(id, updateElementDto) {
        return this.elementService.update(id, updateElementDto);
    }
    remove(id) {
        return this.elementService.remove(id);
    }
    findByVersionId(versionId) {
        return this.elementService.findByVersionId(versionId);
    }
};
exports.ElementController = ElementController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_element_dto_1.CreateElementDto]),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_element_dto_1.UpdateElementDto]),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('version/:versionId'),
    __param(0, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ElementController.prototype, "findByVersionId", null);
exports.ElementController = ElementController = __decorate([
    (0, common_1.Controller)('element'),
    __metadata("design:paramtypes", [element_service_1.ElementService])
], ElementController);
//# sourceMappingURL=element.controller.js.map