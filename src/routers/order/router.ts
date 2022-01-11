import express, { Router } from "express";
import { getOrderDetailList, getOrderList } from "./order.controller";

const orderRouter: Router = express.Router();

orderRouter.get("/list/:accessToken", getOrderList);
orderRouter.post("/detail/list/:accessToken", getOrderDetailList);

export default orderRouter;
