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
const typeorm_1 = require("typeorm");
let checkListJ = class checkListJ {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], checkListJ.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], checkListJ.prototype, "vesselId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "a", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "b", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "c", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "e", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "f", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "g", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "h", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "i", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "j", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "k", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "l", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "m", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "n", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "o", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "p", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "q", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "r", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "t", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "u", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "v", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "aa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ab", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ac", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ae", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "af", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ag", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ah", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "ai", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkListJ.prototype, "aj", void 0);
checkListJ = __decorate([
    typeorm_1.Entity("checkJ")
], checkListJ);
exports.default = checkListJ;
