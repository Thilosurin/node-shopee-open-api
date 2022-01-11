import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { apiPostJSON, fetch } from "../../utils/node-fetch";
import { URLHandler } from "../../utils/url";
let __PATH__: string;

export const getProductList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_item_list";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const { offset = 0, page_size = 10, item_status = "NORMAL" } = req.query;
      console.log({ query: req.query });

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();
      const urlWithParams = `${url}&offset=${offset}&page_size=${page_size}&item_status=${item_status}`;

      const response = await fetch(urlWithParams);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getProductDetailListByProductIds = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_item_base_info";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const { productIds } = req.body;
      if (!productIds || !productIds.length) {
        throw new Error("body parameter productIds is required!");
      }

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const productIdList = (productIds as number[]).join(",");
      const urlWithParams = `${url}&item_id_list=${productIdList}`;

      const response = await fetch(urlWithParams);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/add_item";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const reqBody = req.body;
      console.log({ reqBody });

      const urlHandler = new URLHandler(__PATH__, accessToken);

      const response = await apiPostJSON({
        url: urlHandler.getURL(),
        body: reqBody,
      });
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getProductVariantByProductId = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_model_list";
    try {
      const { accessToken, productId } = req.params;
      if (!accessToken || !productId) {
        throw new Error("parameter accessToken and productId is required!");
      }

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const response = await fetch(`${url}&item_id=${productId}`);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getCategoryList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_category";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");
      const { language = "th" } = req.query;

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const response = await fetch(`${url}&language=${language}`);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getBrandList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_brand_list";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const {
        offset = 1,
        page_size = 100,
        status = 1,
        category_id,
        language = "th",
      } = req.query;
      if (!category_id) throw new Error("query param category_id is required!");

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const urlWithParams = `${url}&offset=${offset}&page_size=${page_size}&status=${status}&category_id=${category_id}&language=${language}`;

      const response = await fetch(urlWithParams);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);

export const getAttributeList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    __PATH__ = "/api/v2/product/get_attributes";
    try {
      const { accessToken } = req.params;
      if (!accessToken) throw new Error("parameter accessToken is required!");

      const { category_id, language = "th" } = req.query;
      if (!category_id) throw new Error("query param category_id is required!");

      const urlHandler = new URLHandler(__PATH__, accessToken);
      const url = urlHandler.getURL();

      const urlWithParams = `${url}&category_id=${category_id}&language=${language}`;
      const response = await fetch(urlWithParams);
      res.status(200).json(await response.json());
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error", error });
    }
  }
);
