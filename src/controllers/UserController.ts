import * as Yup from "yup";
import * as crypto from "crypto";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

import User from "../models/User";
import MailerModule from "../modules/mailer";

export default {
  async create(request: Request, response: Response) {
    const usersRepository = getRepository(User);
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

  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const userRepository = getRepository(User);

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

    if(email && email !== user.email){
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
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return response.status(400).json({
          error:
            "A senha fornecida não coincide com a senha cadastrada, por favor tente novamente!",
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

  async delete(request: Request, response: Response) {
    const usersRepository = getRepository(User);
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

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body;

    const newPassword = crypto.randomBytes(4).toString("hex");
    let password = await bcrypt.hash(newPassword, 8);

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return response
        .status(400)
        .json({ error: "Email não cadastrado na aplicação" });
    }

    try {
      await MailerModule.sendMail({
        from: "Administrador <0ae140a8d7-581724@inbox.mailtrap.io>",
        to: email,
        subject: "Recuperação de Senha!",
        html: `<p>Olá sua nova senha para acessa o aplicativo nautico é:${newPassword}</p></br><a>Sistema</a>`,
      });

      // user.password = password;
      // await usersRepository.save(user);

      return response.json({ message: "Email enviado com sucesso" });
    } catch (error) {
      return response.status(401).json({ message: "Faild to send" });
    }
  },

  async new(request: Request, response: Response) {
    const usersRepository = getRepository(User);
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
