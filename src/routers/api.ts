import express, { Router } from "express";
import authRouter from "./auth/router";
import productRouter from "./product/router";

const api: Router = express.Router();

api.use("/auth", authRouter);
api.use("/product", productRouter);

export default api;
