"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_list_controller_1 = require("./product-list.controller");
const productRouter = express_1.default.Router();
productRouter.get("/list", product_list_controller_1.getProductList);
exports.default = productRouter;
