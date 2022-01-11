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

productRouter.post("/create/:accessToken", createProduct);
productRouter.get("/list/:accessToken", getProductList);
productRouter.post("/list/info/:accessToken", getProductDetailListByProductIds);
productRouter.get(
  "/variants/:productId/:accessToken",
  getProductVariantByProductId
);
productRouter.get("/category/list/:accessToken", getCategoryList);
productRouter.get("/brand/list/:accessToken", getBrandList);
productRouter.get("/attribute/list/:accessToken", getAttributeList);

export default productRouter;
