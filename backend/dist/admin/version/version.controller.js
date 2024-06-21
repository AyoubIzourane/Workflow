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
exports.VersionController = void 0;
const common_1 = require("@nestjs/common");
const version_service_1 = require("./version.service");
const create_version_dto_1 = require("./dto/create-version.dto");
const update_version_dto_1 = require("./dto/update-version.dto");
const update_version_with_details_dto_1 = require("./dto/update-version-with-details.dto");
let VersionController = class VersionController {
    constructor(versionService) {
        this.versionService = versionService;
    }
    findAll() {
        return this.versionService.findAll();
    }
    findOne(id) {
        return this.versionService.findOne(id);
    }
    create(createVersionDto) {
        return this.versionService.create(createVersionDto);
    }
    update(id, updateVersionDto) {
        return this.versionService.update(id, updateVersionDto);
    }
    remove(id) {
        return this.versionService.remove(id);
    }
    async getVersionsByWorkflowId(workflowId) {
        return this.versionService.findByWorkflowId(workflowId);
    }
    async updateVersionWithDetails(id, updateVersionWithDetailsDto) {
        const version = await this.versionService.updateWithDetails(id, updateVersionWithDetailsDto);
        if (!version) {
            throw new common_1.NotFoundException(`Version with ID ${id} not found`);
        }
        return version;
    }
};
exports.VersionController = VersionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_version_dto_1.CreateVersionDto]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_version_dto_1.UpdateVersionDto]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VersionController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('VersionsByWorkflowId/:workflowId'),
    __param(0, (0, common_1.Param)('workflowId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "getVersionsByWorkflowId", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_version_with_details_dto_1.UpdateVersionWithDetailsDto]),
    __metadata("design:returntype", Promise)
], VersionController.prototype, "updateVersionWithDetails", null);
exports.VersionController = VersionController = __decorate([
    (0, common_1.Controller)('version'),
    __metadata("design:paramtypes", [version_service_1.VersionService])
], VersionController);
//# sourceMappingURL=version.controller.js.map