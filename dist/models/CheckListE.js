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
let checkE = class checkE {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("increment"),
    __metadata("design:type", Number)
], checkE.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], checkE.prototype, "vesselId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "a", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "b", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "c", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "d", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "e", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "f", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "g", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "h", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "i", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "j", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "k", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "l", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "m", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "n", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "o", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "p", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "q", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "r", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "t", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "u", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "v", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ab", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ac", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ae", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "af", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ag", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ah", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ai", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aj", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ak", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "al", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "am", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "an", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ao", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ap", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aq", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "ar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "as", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "au", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "av", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aaa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aab", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aac", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aae", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aaf", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aag", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aah", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aai", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aaj", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aak", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aam", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aan", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], checkE.prototype, "aao", void 0);
checkE = __decorate([
    typeorm_1.Entity("checkE")
], checkE);
exports.default = checkE;
