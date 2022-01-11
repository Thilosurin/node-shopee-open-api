"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logistics_controller_1 = require("./logistics.controller");
const logisticsRouter = express_1.default.Router();
logisticsRouter.get("/list", logistics_controller_1.getLogisticsList);
exports.default = logisticsRouter;
