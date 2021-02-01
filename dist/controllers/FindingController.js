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
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const Vessel_1 = __importDefault(require("../models/Vessel"));
const Finding_1 = __importDefault(require("../models/Finding"));
exports.default = {
    async create(request, response) {
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const schema = Yup.object().shape({
            comments: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { vesselId } = request.params;
        const { comments } = request.body;
        const vesselExists = await vesselRepository.findOne({
            where: { id: vesselId },
        });
        if (!vesselExists) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        const finding = findingRepository.create({
            vesselId,
            comments,
            found: new Date(),
        });
        await findingRepository.save(finding);
        return response.status(201).json(finding);
    },
    async show(request, response) {
        const { vesselId } = request.params;
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const vessel = await vesselRepository.find({
            where: { id: vesselId },
        });
        if (!vessel) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const findings = await findingRepository.find({ where: { vesselId } });
        const findingsMonth = [];
        for (const finding in findings) {
            if (Object.prototype.hasOwnProperty.call(findings, finding)) {
                const element = findings[finding];
                const timeParsed = date_fns_1.subDays(new Date(), 31);
                if (!date_fns_1.isBefore(element.delivered, timeParsed)) {
                    findingsMonth.push(element);
                }
            }
        }
        return response.json(findingsMonth);
    },
    async index(request, response) {
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(400)
                .json({ error: "Clientes não podem acessar essa rota" });
        }
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const findings = await findingRepository.find();
        return response.json(findings);
    },
    async update(request, response) {
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const schema = Yup.object().shape({
            comments: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { id } = request.params;
        const { comments } = request.body;
        const finding = await findingRepository.findOne({
            id,
        });
        if (!finding) {
            return response.status(400).json({ error: "Item não encontrado" });
        }
        findingRepository.merge(finding, {
            comments,
        });
        await findingRepository.save(finding);
        return response.status(201).json(finding);
    },
    async delete(request, response) {
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const { id } = request.params;
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(401)
                .json({ error: "Usuarios não podem acessar essa rota" });
        }
        const finding = await findingRepository.findOne({ where: { id } });
        if (!finding) {
            return response
                .status(400)
                .json({ error: "Item de achados e perdidos, não encontrado!" });
        }
        const deleteFinding = await findingRepository.delete(id);
        return response.json(deleteFinding);
    },
    async delivered(request, response) {
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rg: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { id } = request.params;
        const { name, rg } = request.body;
        const finding = await findingRepository.findOne({
            id,
        });
        if (!finding) {
            return response.status(400).json({ error: "Item não encontrado" });
        }
        findingRepository.merge(finding, {
            name,
            rg,
            delivered: new Date(),
        });
        await findingRepository.save(finding);
        return response.status(201).json(finding);
    },
};
