import express, { Router } from "express";
import { getLogisticsList } from "./logistics.controller";

const logisticsRouter: Router = express.Router();

logisticsRouter.get("/list/:accessToken", getLogisticsList);

export default logisticsRouter;
