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
exports.Element = void 0;
const typeorm_1 = require("typeorm");
const Formulaire_1 = require("../../Formulaire/interface/Formulaire");
const version_1 = require("../../../interface/version");
let Element = class Element {
};
exports.Element = Element;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Element.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Element.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Element.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Element.prototype, "approbateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Element.prototype, "escalader", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Element.prototype, "delaiEscalade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Element.prototype, "workflow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Element.prototype, "resultat", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Formulaire_1.Formulaire, formulaire => formulaire.element),
    __metadata("design:type", Array)
], Element.prototype, "formulaires", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => version_1.Version, version => version.elements),
    (0, typeorm_1.JoinColumn)({ name: "versionId", referencedColumnName: "id" }),
    __metadata("design:type", version_1.Version)
], Element.prototype, "version", void 0);
exports.Element = Element = __decorate([
    (0, typeorm_1.Entity)()
], Element);
//# sourceMappingURL=Element.js.map