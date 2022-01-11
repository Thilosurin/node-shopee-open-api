import { Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";

export const getProductList = asyncHandler(
  async (req: Request, res: Response, next: () => PromiseLike<never>) => {
    try {
      res.status(200).json({ status: 200, message: "Hello World!" });
    } catch (error) {}
  }
);
