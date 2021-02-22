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
const User_1 = __importDefault(require("../models/User"));
const Vessel_1 = __importDefault(require("../models/Vessel"));
const Damaged_1 = __importDefault(require("../models/Damaged"));
const Review_1 = __importDefault(require("../models/Review"));
const Schedule_1 = __importDefault(require("../models/Schedule"));
const Finding_1 = __importDefault(require("../models/Finding"));
const CheckListE_1 = __importDefault(require("../models/CheckListE"));
const CheckListJ_1 = __importDefault(require("../models/CheckListJ"));
exports.default = {
    async create(request, response) {
        const schema = Yup.object().shape({
            userId: Yup.number().required("campo obrigatório"),
            jetski: Yup.bool().required("campo obrigatório"),
            name: Yup.string().required("campo obrigatório"),
            proprietario: Yup.string().required("campo obrigatório"),
            marca: Yup.string().required("campo obrigatório"),
            modelo: Yup.string().required("campo obrigatório"),
            ano: Yup.string().required("campo obrigatório"),
            comprimentototal: Yup.string().required("campo obrigatório"),
            motor: Yup.string().required("campo obrigatório"),
            combustivel: Yup.string().required("campo obrigatório"),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { userId, jetski, name, proprietario, marca, modelo, ano, comprimentototal, motor, combustivel, } = request.body;
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const userRepository = typeorm_1.getRepository(User_1.default);
        const checkListERepository = typeorm_1.getRepository(CheckListE_1.default);
        const checkListJRepository = typeorm_1.getRepository(CheckListJ_1.default);
        if (!request.useMaster) {
            return response
                .status(401)
                .json({ error: "Somente Adminstradores podem criar embarcações!" });
        }
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return response
                .status(400)
                .json({ error: "Dono da embarcação não encontrado" });
        }
        const vessel = vesselRepository.create({
            userId,
            jetski,
            name,
            proprietario,
            marca,
            modelo,
            ano,
            comprimentototal,
            motor,
            combustivel,
        });
        await vesselRepository.save(vessel);
        console.log(vessel.id);
        if (!vessel.jetski) {
            try {
                const check = checkListERepository.create({ vesselId: vessel.id, a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false, k: false, l: false, m: false, n: false, o: false, p: false, q: false, r: false, s: false, t: false, u: false, v: false, aa: false, ab: false, ac: false, ad: false, ae: false, af: false, ag: false, ah: false, ai: false, aj: false, ak: false, al: false, am: false, an: false, ao: false, ap: false, aq: false, ar: false, as: false, at: false, au: false, av: false, aaa: false, aab: false, aac: false, aad: false, aae: false, aaf: false, aag: false, aah: false, aai: false, aaj: false, aak: false, aal: false, aam: false, aan: false, aao: false });
                await checkListERepository.save(check);
            }
            catch (err) {
                console.log(err);
            }
        }
        if (vessel.jetski) {
            try {
                const check = checkListJRepository.create({ vesselId: vessel.id, a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false, k: false, l: false, m: false, n: false, o: false, p: false, q: false, r: false, s: false, t: false, u: false, v: false, aa: false, ab: false, ac: false, ad: false, ae: false, af: false, ag: false, ah: false, ai: false, aj: false });
                await checkListJRepository.save(check);
            }
            catch (err) {
                console.log(err);
            }
        }
        return response.status(201).json(vessel);
    },
    async show(request, response) {
        const { id } = request.params;
        const vesselsRepository = typeorm_1.getRepository(Vessel_1.default);
        const allVessels = await vesselsRepository.find({
            where: { userId: id, jetski: false },
        });
        const allJetski = await vesselsRepository.find({
            where: { userId: id, jetski: true },
        });
        return response.json({ allJetski, allVessels });
    },
    async index(request, response) {
        const vesselsRepository = typeorm_1.getRepository(Vessel_1.default);
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const formatedAllVessels = [];
        const formatedallMotorBoats = [];
        const allVessels = await vesselsRepository.find();
        const allJetski = await vesselsRepository.find({
            where: { jetski: true },
        });
        const allMotorBoats = await vesselsRepository.find({
            where: { jetski: false },
        });
        for (const vessel in allVessels) {
            if (Object.prototype.hasOwnProperty.call(allVessels, vessel)) {
                const element = allVessels[vessel];
                const user = await usersRepository.findOne({
                    where: { id: element.userId },
                });
                allVessels[vessel] = Object.assign(Object.assign({}, element), { user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        telephone: user.phone,
                    } });
                formatedAllVessels.push(allVessels[vessel]);
            }
        }
        for (const jetski in allMotorBoats) {
            if (Object.prototype.hasOwnProperty.call(allMotorBoats, jetski)) {
                const element = allMotorBoats[jetski];
                const user = await usersRepository.findOne({
                    where: { id: element.userId },
                });
                const schema = Object.assign(Object.assign({}, element), { user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        telephone: user.phone,
                    } });
                formatedallMotorBoats.push(schema);
            }
        }
        console.log(formatedAllVessels);
        console.log(formatedallMotorBoats);
        return response.json({ allVessels, allJetski, allMotorBoats });
    },
    async update(request, response) {
        const { id } = request.params;
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
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
        const schema = Yup.object().shape({
            name: Yup.string(),
            proprietario: Yup.string(),
            marca: Yup.string(),
            modelo: Yup.string(),
            ano: Yup.string(),
            comprimentototal: Yup.string(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { name, proprietario, marca, modelo, ano, comprimentototal, } = request.body;
        vesselRepository.merge(vessel, {
            name,
            proprietario,
            marca,
            modelo,
            ano,
            comprimentototal,
        });
        const vesselEdited = await vesselRepository.save(vessel);
        return response.status(200).json(vesselEdited);
    },
    async delete(request, response) {
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const reviewsRepository = typeorm_1.getRepository(Review_1.default);
        const damagedRepository = typeorm_1.getRepository(Damaged_1.default);
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const findingRepository = typeorm_1.getRepository(Finding_1.default);
        const checkListERepository = typeorm_1.getRepository(CheckListE_1.default);
        const checkListJRepository = typeorm_1.getRepository(CheckListJ_1.default);
        const { id } = request.params;
        if (!request.useMaster) {
            return response
                .status(401)
                .json({ error: "Apenas administradores podem acessar essa rota" });
        }
        const vessel = await vesselRepository.findOne({ where: { id } });
        if (!vessel) {
            return response
                .status(400)
                .json({ error: "Essa embarcação não existe!" });
        }
        const deleteReviews = await reviewsRepository.delete({ vesselId: id });
        const deleteDamaged = await damagedRepository.delete({ vesselId: id });
        const deleteSchedules = await scheduleRepository.delete({ vesselId: id });
        const deleteFindings = await findingRepository.delete({ vesselId: id });
        const deleteCheckListE = await checkListERepository.delete({
            vesselId: id,
        });
        const deleteCheckListJ = await checkListJRepository.delete({
            vesselId: id,
        });
        const deleteVessel = await vesselRepository.delete(id);
        return response.json({
            deleteVessel,
            deleteDamaged,
            deleteReviews,
            deleteSchedules,
            deleteFindings,
            deleteCheckListE,
            deleteCheckListJ,
        });
    },
};
