"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const authMiddlewe_1 = __importDefault(require("./middlewares/authMiddlewe"));
const multer_2 = __importDefault(require("./modules/multer"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const FileController_1 = __importDefault(require("./controllers/FileController"));
const VesselController_1 = __importDefault(require("./controllers/VesselController"));
const DamagedController_1 = __importDefault(require("./controllers/DamagedController"));
const ReviewController_1 = __importDefault(require("./controllers/ReviewController"));
const ScheduleController_1 = __importDefault(require("./controllers/ScheduleController"));
const FindingController_1 = __importDefault(require("./controllers/FindingController"));
const CheckListController_1 = __importDefault(require("./controllers/CheckListController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const SupplyController_1 = __importDefault(require("./controllers/SupplyController"));
const routes = express_1.Router();
const upload = multer_1.default(multer_2.default);
//Criação de Master
routes.post("/usersMasters", UserController_1.default.create);
//Autenticações na Aplicação
routes.post("/login", AuthController_1.default.session);
routes.post("/forgot", AuthController_1.default.forgotPassword);
routes.post("/verify", AuthController_1.default.verifyToken);
routes.use(authMiddlewe_1.default);
routes.post("/user/:id/changePassword", AuthController_1.default.changePassword);
//Criar e ver Funcionarios/Clientes
routes.get("/users", UserController_1.default.index);
routes.post("/users", UserController_1.default.new);
routes.put("/users/:id", UserController_1.default.update);
routes.delete("/users/:id", UserController_1.default.delete);
//File/Avatar
routes.patch("/users/:id/avatar", upload.single("avatar"), FileController_1.default.post);
//Embarcações
routes.post("/vessels", VesselController_1.default.create);
routes.get("/vessels", VesselController_1.default.index);
routes.get("/users/:id/vessels", VesselController_1.default.show);
routes.put("/vessels/:id", VesselController_1.default.update);
routes.delete("/vessels/:id", VesselController_1.default.delete);
//Abastecimento
routes.put("/vessels/:id/supply", SupplyController_1.default.update);
//Avarias
routes.post("/damaged", DamagedController_1.default.create);
routes.get("/damaged/:id", DamagedController_1.default.index);
routes.put("/damaged/:id", DamagedController_1.default.update);
routes.delete("/damaged/:id", DamagedController_1.default.delete);
//Revisões
routes.post("/reviews", ReviewController_1.default.create);
routes.get("/reviews/:id", ReviewController_1.default.index);
routes.put("/reviews/:id", ReviewController_1.default.update);
routes.delete("/reviews/:id", ReviewController_1.default.delete);
//Achados e Perdidos
routes.post("/vessels/:vesselId/findings", FindingController_1.default.create);
routes.get("/vessels/:vesselId/findings", FindingController_1.default.show);
routes.get("/findings", FindingController_1.default.index);
routes.put("/findings/:id", FindingController_1.default.update);
routes.delete("/findings/:id", FindingController_1.default.delete);
routes.put("/findings/:id/delivered", FindingController_1.default.delivered);
//Agendamentos
routes.post("/vessels/:vesselId/schedules", ScheduleController_1.default.create);
routes.get("/vessels/:vesselId/schedules", ScheduleController_1.default.show);
routes.get("/schedules", ScheduleController_1.default.index);
routes.put("/schedules/:id", ScheduleController_1.default.update);
routes.delete("/schedules/:id", ScheduleController_1.default.delete);
//CheckList
routes.get("/vessels/:id/checkList", CheckListController_1.default.index);
routes.get("/checklistAll", CheckListController_1.default.indexAll);
routes.put("/vessels/:id/checkList", CheckListController_1.default.update);
exports.default = routes;
