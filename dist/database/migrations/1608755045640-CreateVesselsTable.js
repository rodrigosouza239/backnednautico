"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVesselsTable1608755045640 = void 0;
const typeorm_1 = require("typeorm");
class CreateVesselsTable1608755045640 {
    async up(queryRunner) {
        //criação da minha tabelas do banco de dados
        await queryRunner.createTable(new typeorm_1.Table({
            name: "vessels",
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
                    name: "userId",
                    type: "integer",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "jetski",
                    type: "boolean",
                },
                {
                    name: "proprietario",
                    type: "varchar",
                },
                {
                    name: "marca",
                    type: "varchar",
                },
                {
                    name: "modelo",
                    type: "varchar",
                },
                {
                    name: "ano",
                    type: "varchar",
                },
                {
                    name: "comprimentototal",
                    type: "varchar",
                },
                {
                    name: "motor",
                    type: "varchar",
                },
                {
                    name: "combustivel",
                    type: "varchar",
                },
            ],
        }));
        //fechamento da coluna
    }
    async down(queryRunner) {
        await queryRunner.dropTable("vessels");
    }
}
exports.CreateVesselsTable1608755045640 = CreateVesselsTable1608755045640;
