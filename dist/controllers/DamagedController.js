"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const typeorm_1 = require("typeorm");
const Damaged_1 = __importDefault(require("../models/Damaged"));
const Vessel_1 = __importDefault(require("../models/Vessel"));
exports.default = {
    async create(request, response) {
        const schema = Yup.object().shape({
            comments: Yup.string().required("campo obrigatório"),
            vesselId: Yup.number().required("campo obrigatório"),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { comments, vesselId } = request.body;
        const damagedRepository = typeorm_1.getRepository(Damaged_1.default);
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const vessel = await vesselRepository.findOne({
            where: { id: vesselId },
        });
        if (!vessel) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        // if (!request.useMaster) {
        //   return response
        //     .status(401)
        //     .json({ error: "Somente Adminstradores podem criar embarcações!" });
        // }
        const damaged = damagedRepository.create({ comments, vesselId });
        await damagedRepository.save(damaged);
        return response.status(201).json(damaged);
    },
    async index(request, response) {
        const { id } = request.params;
        const damagedRepository = typeorm_1.getRepository(Damaged_1.default);
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const vessel = await vesselRepository.findOne({
            where: { id: id },
        });
        if (!vessel) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        const damaged = await damagedRepository.find({
            where: { vesselId: id },
        });
        return response.status(200).json({ vessel, damaged });
    },
    async update(request, response) {
        const { id } = request.params;
        const damagedRepository = typeorm_1.getRepository(Damaged_1.default);
        const damaged = await damagedRepository.findOne({
            where: { id: id },
        });
        if (!damaged) {
            return response.status(400).json({ error: "Avaria não encontrada" });
        }
        const schema = Yup.object().shape({
            comments: Yup.string().required("campo obrigatório"),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { comments } = request.body;
        damagedRepository.merge(damaged, { comments });
        const damagedEdited = await damagedRepository.save(damaged);
        return response.json(damagedEdited);
    },
    async delete(request, response) {
        const damagedRepository = typeorm_1.getRepository(Damaged_1.default);
        const { id } = request.params;
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(401)
                .json({ error: "Usuarios não podem acessar essa rota" });
        }
        const damaged = await damagedRepository.findOne({ where: { id } });
        if (!damaged) {
            return response.status(400).json({ error: "Avaria não encontrada!" });
        }
        const deleteDamaged = await damagedRepository.delete(id);
        return response.json(deleteDamaged);
    },
};
