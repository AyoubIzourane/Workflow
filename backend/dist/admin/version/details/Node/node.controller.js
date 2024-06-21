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
exports.NodeController = void 0;
const common_1 = require("@nestjs/common");
const node_service_1 = require("./node.service");
const create_node_dto_1 = require("./dto/create-node.dto");
const update_node_dto_1 = require("./dto/update-node.dto");
let NodeController = class NodeController {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    findAll() {
        return this.nodeService.findAll();
    }
    findOne(id) {
        return this.nodeService.findOne(id);
    }
    create(createNodeDto) {
        return this.nodeService.create(createNodeDto);
    }
    update(id, updateNodeDto) {
        return this.nodeService.update(id, updateNodeDto);
    }
    remove(id) {
        return this.nodeService.remove(id);
    }
    findByVersionId(versionId) {
        return this.nodeService.findByVersionId(versionId);
    }
};
exports.NodeController = NodeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_node_dto_1.CreateNodeDto]),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_node_dto_1.UpdateNodeDto]),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('version/:versionId'),
    __param(0, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NodeController.prototype, "findByVersionId", null);
exports.NodeController = NodeController = __decorate([
    (0, common_1.Controller)('node'),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], NodeController);
//# sourceMappingURL=node.controller.js.map