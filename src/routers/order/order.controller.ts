import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { fetch } from "../../utils/node-fetch";
import { URLHandler } from "../../utils/url";
let __PATH__: string;

export const getOrderList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/order/get_order_list";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");
      const {
        time_range_field = "create_time",
        time_from = Math.floor(Date.now() / 1000),
        time_to = Math.floor(Date.now() / 1000) + 864000,
        page_size = 10,
      } = req.query;

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const urlWithParams = `${url}&time_range_field=${time_range_field}&time_from=${time_from}&time_to=${time_to}&page_size=${page_size}`;
      const response = await fetch(urlWithParams);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getOrderDetailList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/order/get_order_detail";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const { orderIdList } = req.body;
      if (!orderIdList || !orderIdList.length) {
        throw new Error("body orderIdList is required!");
      }

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();
      const orderIdStr = (orderIdList as string[]).join(",");

      const response = await fetch(`${url}&order_sn_list=${orderIdStr}`);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);
