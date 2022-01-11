import { Router } from "express";
import express from "express";
import { getUrlFromShopee } from "./generate-url.controller";

const authRouter: Router = express.Router();

authRouter.get("/url", getUrlFromShopee);

export default authRouter;
