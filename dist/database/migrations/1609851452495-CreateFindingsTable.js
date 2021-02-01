"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFindingsTable1609851452495 = void 0;
const typeorm_1 = require("typeorm");
class CreateFindingsTable1609851452495 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "findings",
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
                    name: "found",
                    type: "timestamp",
                },
                {
                    name: "comments",
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "rg",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "delivered",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("findings");
    }
}
exports.CreateFindingsTable1609851452495 = CreateFindingsTable1609851452495;
