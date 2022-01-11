"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routers/api"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/v1/api", api_1.default);
exports.default = app;
