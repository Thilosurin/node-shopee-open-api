import { Router } from "express";
import express from "express";
import { getProductList } from "./product-list.controller";

const productRouter: Router = express.Router();

productRouter.get("/list", getProductList);

export default productRouter;
