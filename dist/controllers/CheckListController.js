"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Vessel_1 = __importDefault(require("../models/Vessel"));
const CheckListE_1 = __importDefault(require("../models/CheckListE"));
const CheckListJ_1 = __importDefault(require("../models/CheckListJ"));
exports.default = {
    async index(request, response) {
        const { id } = request.params;
        const vesselsRepository = typeorm_1.getRepository(Vessel_1.default);
        const checkListERepository = typeorm_1.getRepository(CheckListE_1.default);
        const checkListJRepository = typeorm_1.getRepository(CheckListJ_1.default);
        const vesselExists = await vesselsRepository.findOne({
            where: { id },
        });
        if (!vesselExists) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        if (vesselExists.jetski) {
            const checkList = await checkListJRepository.findOne({
                where: { vesselId: id },
            });
            if (!checkList) {
                return response.status(400).json({
                    error: "CheckList não encontradado, ou não relacionada com essa Embarcação",
                });
            }
            return response.json(checkList);
        }
        else {
            const checkList = await checkListERepository.findOne({
                where: { vesselId: id },
            });
            if (!checkList) {
                return response.status(400).json({
                    error: "CheckList não encontradado, ou não relacionada com essa Embarcação",
                });
            }
            return response.json(checkList);
        }
    },
    async update(request, response) {
        const { id } = request.params;
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const checkListERepository = typeorm_1.getRepository(CheckListE_1.default);
        const checkListJRepository = typeorm_1.getRepository(CheckListJ_1.default);
        const vessel = await vesselRepository.findOne({
            where: { id: id },
        });
        if (!vessel) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(400)
                .json({ error: "Clientes não podem acessar essa rota" });
        }
        if (vessel.jetski) {
            const checkList = await checkListJRepository.findOne({
                where: { vesselId: id },
            });
            if (!checkList) {
                return response.status(400).json({
                    error: "CheckList não encontradado, ou não relacionada com essa Embarcação",
                });
            }
            checkListJRepository.merge(checkList, request.body);
            const checkListEdited = await checkListJRepository.save(checkList);
            return response.status(200).json(checkListEdited);
        }
        else {
            const checkList = await checkListERepository.findOne({
                where: { vesselId: id },
            });
            if (!checkList) {
                return response.status(400).json({
                    error: "CheckList não encontradado, ou não relacionada com essa Embarcação",
                });
            }
            checkListERepository.merge(checkList, request.body);
            const checkListEdited = await checkListERepository.save(checkList);
            return response.status(200).json(checkListEdited);
        }
    },
    async indexAll(request, response) {
        const checkListERepository = typeorm_1.getRepository(CheckListE_1.default);
        const checkListJRepository = typeorm_1.getRepository(CheckListJ_1.default);
        const CheckList = await checkListERepository.find();
        const CheckListJetski = await checkListJRepository.find();
        return response.json({ CheckList, CheckListJetski });
    },
};
