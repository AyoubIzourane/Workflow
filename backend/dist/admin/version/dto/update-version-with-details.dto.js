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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVersionWithDetailsDto = void 0;
const class_validator_1 = require("class-validator");
const create_node_dto_1 = require("../details/Node/dto/create-node.dto");
const class_transformer_1 = require("class-transformer");
const create_link_dto_1 = require("../details/Link/dto/create-link.dto");
const create_element_dto_1 = require("../details/Element/dto/create-element.dto");
class UpdateVersionWithDetailsDto {
}
exports.UpdateVersionWithDetailsDto = UpdateVersionWithDetailsDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_node_dto_1.CreateNodeDto),
    __metadata("design:type", Array)
], UpdateVersionWithDetailsDto.prototype, "nodeDataArray", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_link_dto_1.CreateLinkDto),
    __metadata("design:type", Array)
], UpdateVersionWithDetailsDto.prototype, "linkDataArray", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_element_dto_1.CreateElementDto),
    __metadata("design:type", Array)
], UpdateVersionWithDetailsDto.prototype, "Element", void 0);
//# sourceMappingURL=update-version-with-details.dto.js.map