"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = require("path");
//importação da  conexão do banco de dados
require("./database/connections");
//importação das routas
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/files", express_1.default.static(path_1.resolve(__dirname, "..", "temp", "uploads")));
app.use(routes_1.default);
app.listen(3337);
