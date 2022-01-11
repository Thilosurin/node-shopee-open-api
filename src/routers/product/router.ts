import express, { Router } from "express";
import {
  createProduct,
  getProductList,
  getProductDetailListByProductIds,
  getProductVariantByProductId,
  getCategoryList,
  getBrandList,
  getAttributeList,
} from "./product.controller";

const productRouter: Router = express.Router();

productRouter.post("/create", createProduct);
productRouter.get("/list", getProductList);
productRouter.post("/list/info", getProductDetailListByProductIds);
productRouter.get("/variants/:productId", getProductVariantByProductId);
productRouter.get("/category/list", getCategoryList);
productRouter.get("/brand/list", getBrandList);
productRouter.get("/attribute/list", getAttributeList);

export default productRouter;
