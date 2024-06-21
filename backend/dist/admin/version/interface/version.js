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
exports.Version = void 0;
const typeorm_1 = require("typeorm");
const workflow_1 = require("../../workflow/interface/workflow");
const Element_1 = require("../details/Element/interface/Element");
const Node_1 = require("../details/Node/interface/Node");
const Link_1 = require("../details/Link/interface/Link");
let Version = class Version {
    setDefaults() {
        this.createdAt = new Date();
        this.status = "Brouillon";
    }
};
exports.Version = Version;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Version.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Version.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Version.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Version.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'date' }),
    __metadata("design:type", Date)
], Version.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Version.prototype, "default", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Version.prototype, "versionNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workflow_1.Workflow, workflow => workflow.versions),
    (0, typeorm_1.JoinColumn)({ name: "workflowId", referencedColumnName: "id" }),
    __metadata("design:type", workflow_1.Workflow)
], Version.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Element_1.Element, element => element.version),
    __metadata("design:type", Array)
], Version.prototype, "elements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Node_1.Node, node => node.version),
    __metadata("design:type", Array)
], Version.prototype, "nodes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Link_1.Link, link => link.version),
    __metadata("design:type", Array)
], Version.prototype, "links", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Version.prototype, "setDefaults", null);
exports.Version = Version = __decorate([
    (0, typeorm_1.Entity)()
], Version);
//# sourceMappingURL=version.js.map