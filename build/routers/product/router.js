"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const productRouter = express_1.default.Router();
productRouter.post("/create", product_controller_1.createProduct);
productRouter.get("/list", product_controller_1.getProductList);
productRouter.post("/list/info", product_controller_1.getProductDetailListByProductIds);
productRouter.get("/variants/:productId", product_controller_1.getProductVariantByProductId);
productRouter.get("/category/list", product_controller_1.getCategoryList);
productRouter.get("/brand/list", product_controller_1.getBrandList);
productRouter.get("/attribute/list", product_controller_1.getAttributeList);
exports.default = productRouter;
