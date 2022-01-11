import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { URLHandler } from "../../utils/url";
import { apiPostJSON } from "../../utils/node-fetch";
let __PATH__: string;

export const getUrlFromShopee = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/shop/auth_partner";
    try {
      const urlHandler = new URLHandler(__PATH__);
      const { shop_id, access_token, ...objParams } =
        urlHandler.defaultObjParams("partnerId", "path", "timestamp");
      Object.assign(objParams, {
        redirect: encodeURIComponent("https://google.co.th"),
      });
      const url = urlHandler.getURL(objParams);
      res.status(200).json({ status: 200, url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getAccessToken = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/auth/token/get";
    try {
      const { code } = req.params;
      if (!code) throw new Error("parameter code is required!");

      const urlHandler = new URLHandler(__PATH__);
      const { shop_id, access_token, ...objParams } =
        urlHandler.defaultObjParams("partnerId", "path", "timestamp");

      const response = await apiPostJSON({
        url: urlHandler.getURL(objParams),
        body: {
          code,
          shop_id: urlHandler.shopId,
          partner_id: urlHandler.partnerId,
        },
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
