"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./auth/router"));
const router_2 = __importDefault(require("./product/router"));
const router_3 = __importDefault(require("./order/router"));
const router_4 = __importDefault(require("./logistics/router"));
const api = express_1.default.Router();
api.use("/auth", router_1.default);
api.use("/product", router_2.default);
api.use("/order", router_3.default);
api.use("/logistics", router_4.default);
exports.default = api;
