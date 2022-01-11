import express, { Router } from "express";
import { getAccessToken, getUrlFromShopee } from "./auth.controller";

const authRouter: Router = express.Router();

authRouter.get("/url", getUrlFromShopee);
authRouter.get("/token/:code", getAccessToken);

export default authRouter;
