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
const crypto = __importStar(require("crypto"));
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const mailer_1 = __importDefault(require("../modules/mailer"));
exports.default = {
    async create(request, response) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const { name, email, password, phone } = request.body;
        const userExists = await usersRepository.findOne({ where: { email } });
        if (userExists) {
            return response.status(400).json({ error: "Usuario já existe!" });
        }
        const data = {
            name,
            master: true,
            employee: false,
            email,
            password,
            phone,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required("Nome obrigatório"),
            email: Yup.string().required("email obrigatório"),
            password: Yup.string().required("senha obrigatório").max(6),
            phone: Yup.string().required("celular obrigatório"),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        await schema.validate(data, {
            abortEarly: false,
        });
        const users = usersRepository.create(data);
        await usersRepository.save(users);
        return response.status(201).json(users);
    },
    async index(request, response) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        if (!request.useMaster && !request.useEmployee) {
            return response
                .status(401)
                .json({ error: "Clientes não podem usar essa rota" });
        }
        const allUsers = await usersRepository.find();
        const allClients = await usersRepository.find({
            where: { employee: false, master: false },
        });
        const allEmployees = await usersRepository.find({
            where: { employee: true },
        });
        const allMasters = await usersRepository.find({
            where: { master: true },
        });
        return response.json({ allUsers, allClients, allEmployees, allMasters });
    },
    async update(request, response) {
        const { id } = request.params;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const user = await userRepository.findOne({ where: { id } });
        if (!user) {
            return response.status(400).json({ error: "User not found" });
            // AQUI PODE FAZER UMA VERIFICAÇÃO CASO O USUARIO NÃO SEJA DESSE ID
        }
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().max(6),
            password: Yup.string().max(6),
            phone: Yup.string(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        const { name, email, oldPassword, password, phone } = request.body;
        if (email && email !== user.email) {
            const usersExists = await userRepository.findOne({
                where: { email },
            });
            if (usersExists) {
                return response
                    .status(400)
                    .json({ error: "Usuario com esse email já existe" });
            }
        }
        if (password && !oldPassword) {
            return response.status(401).json({
                error: "Para mudar a senha é necessario informar a senha antiga",
            });
        }
        if (oldPassword) {
            const isValidPassword = await bcryptjs_1.default.compare(oldPassword, user.password);
            if (!isValidPassword) {
                return response.status(400).json({
                    error: "A senha fornecida não coincide com a senha cadastrada, por favor tente novamente!",
                });
            }
        }
        userRepository.merge(user, {
            name,
            email,
            password,
            phone,
        });
        const userEdited = await userRepository.save(user);
        return response.status(200).json(userEdited);
    },
    async delete(request, response) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const { id } = request.params;
        if (!request.useMaster) {
            return response
                .status(401)
                .json({ error: "Apenas administradores podem acessar essa rota" });
        }
        const user = await usersRepository.findOne({ where: { id } });
        if (!user) {
            return response.status(400).json({ error: "Esse usuario não existe!" });
        }
        const results = await usersRepository.delete(id);
        return response.send(results);
    },
    //Recuperar senha
    async forgotPassword(request, response) {
        const { email } = request.body;
        const newPassword = crypto.randomBytes(4).toString("hex");
        let password = await bcryptjs_1.default.hash(newPassword, 8);
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOne({
            where: { email },
        });
        if (!user) {
            return response
                .status(400)
                .json({ error: "Email não cadastrado na aplicação" });
        }
        try {
            await mailer_1.default.sendMail({
                from: "Administrador <0ae140a8d7-581724@inbox.mailtrap.io>",
                to: email,
                subject: "Recuperação de Senha!",
                html: `<p>Olá sua nova senha para acessa o aplicativo nautico é:${newPassword}</p></br><a>Sistema</a>`,
            });
            // user.password = password;
            // await usersRepository.save(user);
            return response.json({ message: "Email enviado com sucesso" });
        }
        catch (error) {
            return response.status(401).json({ message: "Faild to send" });
        }
    },
    async new(request, response) {
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const { name, email, password, phone, employee } = request.body;
        const userExists = await usersRepository.findOne({ where: { email } });
        if (userExists) {
            return response.status(400).json({ error: "Usuario já existe!" });
        }
        if (!request.useMaster) {
            return response.status(401).json({
                error: "Somente Adminstradores podem criar esse tipo de usuario!",
            });
        }
        const data = {
            name,
            email,
            password,
            phone,
            employee,
            master: false,
        };
        const schema = Yup.object().shape({
            name: Yup.string().required("Nome obrigatório"),
            email: Yup.string().required("email obrigatório"),
            password: Yup.string().required("senha obrigatório").max(6),
            phone: Yup.string().required("celular obrigatório"),
            employee: Yup.boolean().required("Cargo obrigatório"),
        });
        if (!(await schema.isValid(request.body))) {
            return response.status(401).json({ error: "Validation Fails" });
        }
        await schema.validate(data, {
            abortEarly: false,
        });
        const users = usersRepository.create(data);
        await usersRepository.save(users);
        return response.status(201).json(users);
    },
};
