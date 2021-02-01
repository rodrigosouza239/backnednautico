"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async post(request, response) {
        const { filename } = request.file;
        const { id } = request.params;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const user = await userRepository.findOne({ where: { id } });
        user.avatar = filename;
        await userRepository.save(user);
        const userUpdated = await userRepository.findOne({ where: { id } });
        return response.json(userUpdated);
    },
};
