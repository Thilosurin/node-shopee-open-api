import express, { Router } from "express";
import authRouter from "./auth/router";
import productRouter from "./product/router";
import orderRouter from "./order/router";
import logisticsRouter from "./logistics/router";

const api: Router = express.Router();

api.use("/auth", authRouter);
api.use("/product", productRouter);
api.use("/order", orderRouter);
api.use("/logistics", logisticsRouter);

export default api;
