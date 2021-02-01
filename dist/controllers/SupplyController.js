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
const Vessel_1 = __importDefault(require("../models/Vessel"));
exports.default = {
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
            motor: Yup.string().required(),
            combustivel: Yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { motor, combustivel } = request.body;
        vesselRepository.merge(vessel, {
            motor,
            combustivel,
        });
        const vesselEdited = await vesselRepository.save(vessel);
        return response.status(200).json(vesselEdited);
    },
};
