"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSchedulesTable1609788096284 = void 0;
const typeorm_1 = require("typeorm");
class CreateSchedulesTable1609788096284 {
    async up(queryRunner) {
        //criação da minha tabelas do banco de dados
        await queryRunner.createTable(new typeorm_1.Table({
            name: "schedules",
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
                    name: "time",
                    type: "timestamp",
                },
                {
                    name: "comments",
                    type: "varchar",
                },
            ],
        }));
        //fechamento da coluna
    }
    async down(queryRunner) {
        await queryRunner.dropTable("schedules");
    }
}
exports.CreateSchedulesTable1609788096284 = CreateSchedulesTable1609788096284;
