import express, { Router } from "express";
import { getOrderDetailList, getOrderList } from "./order.controller";

const orderRouter: Router = express.Router();

orderRouter.get("/list", getOrderList);
orderRouter.post("/detail/list", getOrderDetailList);

export default orderRouter;
