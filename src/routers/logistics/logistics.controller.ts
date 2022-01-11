import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { fetch } from "../../utils/node-fetch";
import { URLHandler } from "../../utils/url";
let __PATH__: string;

export const getLogisticsList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/logistics/get_channel_list";
    try {
      const urlHandler = new URLHandler(__PATH__);
      const url = urlHandler.getURL();

      const response = await fetch(url);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);
