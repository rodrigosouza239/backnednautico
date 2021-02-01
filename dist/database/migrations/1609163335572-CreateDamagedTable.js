"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDamagedTable1609163335572 = void 0;
const typeorm_1 = require("typeorm");
class CreateDamagedTable1609163335572 {
    async up(queryRunner) {
        //criação da minha tabelas do banco de dados
        await queryRunner.createTable(new typeorm_1.Table({
            name: "damaged",
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
                    name: "comments",
                    type: "varchar",
                },
                {
                    name: "vesselId",
                    type: "integer",
                },
            ],
        }));
        //fechamento da coluna
    }
    async down(queryRunner) {
        await queryRunner.dropTable("damaged");
    }
}
exports.CreateDamagedTable1609163335572 = CreateDamagedTable1609163335572;
