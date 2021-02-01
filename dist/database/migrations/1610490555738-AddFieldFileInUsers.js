"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldFileInUsers1610490555738 = void 0;
const typeorm_1 = require("typeorm");
class AddFieldFileInUsers1610490555738 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: "avatar",
            type: "varchar",
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("users", "avatar");
    }
}
exports.AddFieldFileInUsers1610490555738 = AddFieldFileInUsers1610490555738;
