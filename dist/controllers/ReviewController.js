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
const Review_1 = __importDefault(require("../models/Review"));
const Vessel_1 = __importDefault(require("../models/Vessel"));
exports.default = {
    async create(request, response) {
        const reviewsRepository = typeorm_1.getRepository(Review_1.default);
        const vesselRepository = typeorm_1.getRepository(Vessel_1.default);
        const schema = Yup.object().shape({
            vesselId: Yup.number().required(),
            lastReview: Yup.date().required(),
            engineHour: Yup.string().required(),
            firm: Yup.string().required(),
            nextReview: Yup.date().required(),
            expert: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { vesselId, lastReview, engineHour, firm, nextReview, expert, } = request.body;
        const vesselExists = await vesselRepository.findOne({
            where: { id: vesselId },
        });
        if (!vesselExists) {
            return response.status(400).json({ error: "Embarcação não encontrada" });
        }
        const lastReviewParsed = date_fns_1.parseISO(lastReview);
        const nextReviewParsed = date_fns_1.parseISO(nextReview);
        const nowDate = new Date();
        if (date_fns_1.isBefore(nextReviewParsed, nowDate)) {
            return response.status(400).json({
                error: "A data para a proxima revisão já passou, tente novamente!",
            });
        }
        if (date_fns_1.isAfter(lastReviewParsed, nowDate)) {
            return response.status(400).json({
                error: "A data para a ultima revisão ainda não passou, tente novamente!",
            });
        }
        const review = reviewsRepository.create({
            vesselId,
            lastReview: lastReviewParsed,
            engineHour,
            firm,
            nextReview: nextReviewParsed,
            expert,
            created: nowDate,
        });
        await reviewsRepository.save(review);
        return response.status(201).json(review);
    },
    async index(request, response) {
        const { id } = request.params;
        const reviewsRepository = typeorm_1.getRepository(Review_1.default);
        const reviews = await reviewsRepository.find({
            where: { vesselId: id },
        });
        return response.json(reviews);
    },
    async update(request, response) {
        const { id } = request.params;
        const reviewsRepository = typeorm_1.getRepository(Review_1.default);
        const schema = Yup.object().shape({
            lastReview: Yup.date().required(),
            engineHour: Yup.string().required(),
            firm: Yup.string().required(),
            nextReview: Yup.date().required(),
            expert: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const review = await reviewsRepository.findOne({ where: { id } });
        if (!review) {
            return response.status(400).json({ error: "Revisão não encontrada." });
        }
        const { vesselId, lastReview, engineHour, firm, nextReview, expert, } = request.body;
        const lastReviewParsed = date_fns_1.parseISO(lastReview);
        const nextReviewParsed = date_fns_1.parseISO(nextReview);
        const nowDate = new Date();
        if (date_fns_1.isBefore(nextReviewParsed, nowDate)) {
            return response.status(400).json({
                error: "A data para a proxima revisão já passou, tente novamente!",
            });
        }
        if (date_fns_1.isAfter(lastReviewParsed, nowDate)) {
            return response.status(400).json({
                error: "A data para a ultima revisão ainda não passou, tente novamente!",
            });
        }
        reviewsRepository.merge(review, {
            vesselId,
            lastReview: lastReviewParsed,
            engineHour,
            firm,
            nextReview: nextReviewParsed,
            expert,
        });
        const reviewEdited = await reviewsRepository.save(review);
        return response.status(201).json(reviewEdited);
    },
    async delete(request, response) {
        const reviewRepository = typeorm_1.getRepository(Review_1.default);
        const { id } = request.params;
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(401)
                .json({ error: "Usuarios não podem acessar essa rota" });
        }
        const review = await reviewRepository.findOne({ where: { id } });
        if (!review) {
            return response.status(400).json({ error: "Revisão não encontrada!" });
        }
        const deleteReview = await reviewRepository.delete(id);
        return response.json(deleteReview);
    },
};
