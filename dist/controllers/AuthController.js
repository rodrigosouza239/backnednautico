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
const crypto = __importStar(require("crypto"));
const Yup = __importStar(require("yup"));
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const mailer_1 = __importDefault(require("../modules/mailer"));
exports.default = {
    async session(request, response) {
        const repository = typeorm_1.getRepository(User_1.default);
        const { email, password } = request.body;
        const user = await repository.findOne({ where: { email } });
        if (!user) {
            return response.status(400).json({ error: "Usuario não já existe!" });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return response
                .status(400)
                .json({ error: "Senha ou Usuario errado, tente novamente" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, master: user.master, employee: user.employee }, "secret", {
            expiresIn: "1d",
        });
        return response.json({ user, token });
    },
    async forgotPassword(request, response) {
        const { email } = request.body;
        const repository = typeorm_1.getRepository(User_1.default);
        const user = await repository.findOne({ where: { email } });
        if (!user) {
            return response.status(400).json({ error: "Usuario não já existe!" });
        }
        const tokenForUser = crypto.randomBytes(3).toString("hex");
        repository.merge(user, {
            token: tokenForUser,
        });
        await repository.save(user);
        try {
            await mailer_1.default.sendMail({
                from: "Administrador <0ae140a8d7-581724@inbox.mailtrap.io>",
                to: email,
                subject: "Recuperação de Senha!",
                html: `<p>Olá o seu codigo de acesso para a recuperação de senha é: ${tokenForUser}</p></br><a>Equipe Enos</a>`,
            });
            return response.json({ message: "Email enviado com sucesso" });
        }
        catch (error) {
            return response.status(401).json({ message: "Faild to send" });
        }
    },
    async verifyToken(request, response) {
        const { email, token } = request.body;
        const repository = typeorm_1.getRepository(User_1.default);
        const user = await repository.findOne({ where: { email, token } });
        const userTeste = await repository.findOne({ where: { email } });
        if (!user) {
            return response.status(400).json({
                userTeste,
                error: "Usuario não existe, ou o Token está invalido!",
            });
        }
        const tokenForLogin = jsonwebtoken_1.default.sign({ id: user.id, master: user.master, employee: user.employee }, "secret", {
            expiresIn: "365d",
        });
        return response.json({ user, tokenForLogin });
        // return response.json(userTeste);
    },
    async changePassword(request, response) {
        const { id } = request.params;
        const userRepository = typeorm_1.getRepository(User_1.default);
        if (!request.useMaster) {
            return response
                .status(401)
                .json({ error: "Apenas administradores podem acessar essa rota" });
        }
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            return response.status(400).json({ error: "User not found" });
        }
        const schema = Yup.object().shape({
            password: Yup.string().max(6).required(),
            confirmPassword: Yup.string().max(6).required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { password, confirmPassword } = request.body;
        if (password !== confirmPassword) {
            return response.status(401).json({
                error: "As senhas não se coicidem",
            });
        }
        userRepository.merge(user, {
            password,
        });
        const userEdited = await userRepository.save(user);
        return response.status(200).json(userEdited);
    },
};
