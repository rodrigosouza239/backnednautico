"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsers1607981150313 = void 0;
const typeorm_1 = require("typeorm");
class createUsers1607981150313 {
    async up(queryRunner) {
        //criação da minha do master tabelas do banco de dados
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
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
                    name: "master",
                    type: "boolean",
                },
                {
                    name: "employee",
                    type: "boolean",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "phone",
                    type: "varchar",
                },
                {
                    name: "token",
                    type: "varchar",
                    isNullable: true,
                },
            ],
        }));
        //fechamento da coluna
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.createUsers1607981150313 = createUsers1607981150313;
