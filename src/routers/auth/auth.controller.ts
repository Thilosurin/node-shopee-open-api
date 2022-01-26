import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import ConfigShopee from "../config";

export const getUrlFromShopee = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    try {
      const shopee = await ConfigShopee.init()
        .setPath("/api/v2/shop/auth_partner")
        .setDefaultValues()
        .encodeToSign("partner_id", "path", "timestamp");
      const config = shopee.config();
      const params = shopee.concatParams({
        partner_id: config.partner_id,
        timestamp: config.timestamp,
        sign: config.sign,
        redirect: encodeURIComponent("https://google.co.th"),
      });
      const url = `${config.url}${config.path}?${params}`;
      res.status(200).json({ status: 200, url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getAccessToken = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    try {
      const { code } = req.params;
      if (!code) throw new Error("parameter code is required!");

      const shopee = await ConfigShopee.init()
        .setPath("/api/v2/auth/token/get")
        .setDefaultValues()
        .encodeToSign("partner_id", "path", "timestamp");
      const config = shopee.config();
      const response = await shopee.POSTwithJSONBody({
        code,
        shop_id: config.shop_id,
        partner_id: config.partner_id,
      });
      const data = await response.json();

      fs.writeFile(
        path.join(__dirname, "../../../", "token.json"),
        JSON.stringify({
          accessToken: data["access_token"],
          refreshToken: data["refresh_token"],
        }),
        "utf-8",
        (err) => {
          if (err) throw err;
          console.log("complete");
        }
      );

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);
