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
const Schedule_1 = __importDefault(require("../models/Schedule"));
exports.default = {
    async create(request, response) {
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const schema = Yup.object().shape({
            time: Yup.date().required(),
            comments: Yup.string(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { vesselId } = request.params;
        const { time, comments } = request.body;
        const vesselExists = await vesselRepository.findOne({
            where: { id: vesselId },
        });
        if (!vesselExists) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        const timeParsed = date_fns_1.parseISO(time);
        const dateWithSub = date_fns_1.subDays(timeParsed, 2);
        if (date_fns_1.isBefore(dateWithSub, new Date())) {
            return response.status(400).json({
                error: "Agendamentos apenas com 2 dias de antecedencia.",
            });
        }
        const schedule = scheduleRepository.create({
            vesselId,
            time: timeParsed,
            comments,
        });
        await scheduleRepository.save(schedule);
        return response.status(201).json(schedule);
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
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const schedules = await scheduleRepository.find({ where: { vesselId } });
        return response.json(schedules);
    },
    async index(request, response) {
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(400)
                .json({ error: "Clientes não podem acessar essa rota" });
        }
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const schedulesNext = [];
        const schedules = await scheduleRepository.find();
        for (const schedule in schedules) {
            if (Object.prototype.hasOwnProperty.call(schedules, schedule)) {
                const element = schedules[schedule];
                const timeParsed = date_fns_1.subDays(new Date(), 1);
                if (!date_fns_1.isBefore(element.time, timeParsed)) {
                    schedulesNext.push(element);
                }
            }
        }
        return response.json(schedulesNext);
    },
    async update(request, response) {
        const { id } = request.params;
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const schedule = await scheduleRepository.findOne({ where: { id } });
        const schema = Yup.object().shape({
            time: Yup.date(),
            comments: Yup.string(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { time, comments } = request.body;
        const timeParsed = date_fns_1.parseISO(time);
        const dateWithSub = date_fns_1.subDays(timeParsed, 2);
        if (date_fns_1.isBefore(dateWithSub, new Date())) {
            return response.status(400).json({
                error: "Agendamentos apenas com 2 dias de antecedencia.",
            });
        }
        scheduleRepository.merge(schedule, {
            time: timeParsed,
            comments,
        });
        await scheduleRepository.save(schedule);
        return response.status(201).json(schedule);
    },
    async delete(request, response) {
        const scheduleRepository = typeorm_1.getRepository(Schedule_1.default);
        const { id } = request.params;
        const schedule = await scheduleRepository.findOne({ where: { id } });
        if (!schedule) {
            return response
                .status(400)
                .json({ error: "Agendamento não encontrado!" });
        }
        const deleteSchedule = await scheduleRepository.delete(id);
        return response.json(deleteSchedule);
    },
};
