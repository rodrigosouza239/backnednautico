"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckJTable1610028037215 = void 0;
const typeorm_1 = require("typeorm");
class CreateCheckJTable1610028037215 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "checkJ",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "vesselId",
                    type: "integer",
                },
                {
                    name: "a",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "b",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "c",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "d",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "e",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "f",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "g",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "h",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "i",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "j",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "k",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "l",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "m",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "n",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "o",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "p",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "q",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "r",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "s",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "t",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "u",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "v",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "aa",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ab",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ac",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ad",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ae",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "af",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ag",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ah",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "ai",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "aj",
                    type: "boolean",
                    default: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("checkJ");
    }
}
exports.CreateCheckJTable1610028037215 = CreateCheckJTable1610028037215;
