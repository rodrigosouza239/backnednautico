"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewTable1609268405624 = void 0;
const typeorm_1 = require("typeorm");
class CreateReviewTable1609268405624 {
    async up(queryRunner) {
        //criação da minha tabelas do banco de dados
        await queryRunner.createTable(new typeorm_1.Table({
            name: "reviews",
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
                    name: "lastReview",
                    type: "timestamp",
                },
                {
                    name: "engineHour",
                    type: "varchar",
                },
                {
                    name: "firm",
                    type: "varchar",
                },
                {
                    name: "nextReview",
                    type: "timestamp",
                },
                {
                    name: "expert",
                    type: "varchar",
                },
                {
                    name: "created",
                    type: "timestamp",
                },
            ],
        }));
        //fechamento da coluna
    }
    async down(queryRunner) {
        await queryRunner.dropTable("reviews");
    }
}
exports.CreateReviewTable1609268405624 = CreateReviewTable1609268405624;
