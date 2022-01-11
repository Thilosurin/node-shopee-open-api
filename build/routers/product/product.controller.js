"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributeList = exports.getBrandList = exports.getCategoryList = exports.getProductVariantByProductId = exports.createProduct = exports.getProductDetailListByProductIds = exports.getProductList = void 0;
const async_1 = require("../../middleware/async");
const node_fetch_1 = require("../../utils/node-fetch");
const url_1 = require("../../utils/url");
let __PATH__;
exports.getProductList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_item_list";
    try {
        const { offset = 0, page_size = 10, item_status = "NORMAL" } = req.query;
        console.log({ query: req.query });
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const urlWithParams = `${url}&offset=${offset}&page_size=${page_size}&item_status=${item_status}`;
        const response = yield (0, node_fetch_1.fetch)(urlWithParams);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getProductDetailListByProductIds = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_item_base_info";
    try {
        const { productIds } = req.body;
        if (!productIds || !productIds.length) {
            throw new Error("body parameter productIds is required!");
        }
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const productIdList = productIds.join(",");
        const urlWithParams = `${url}&item_id_list=${productIdList}`;
        const response = yield (0, node_fetch_1.fetch)(urlWithParams);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.createProduct = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/add_item";
    try {
        const reqBody = req.body;
        console.log({ reqBody });
        const urlHandler = new url_1.URLHandler(__PATH__);
        const response = yield (0, node_fetch_1.apiPostJSON)({
            url: urlHandler.getURL(),
            body: reqBody,
        });
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getProductVariantByProductId = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_model_list";
    try {
        const { productId } = req.params;
        if (!productId)
            throw new Error("parameter productId is required!");
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const response = yield (0, node_fetch_1.fetch)(`${url}&item_id=${productId}`);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getCategoryList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_category";
    try {
        const { language = "th" } = req.query;
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const response = yield (0, node_fetch_1.fetch)(`${url}&language=${language}`);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getBrandList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_brand_list";
    try {
        const { offset = 1, page_size = 100, status = 1, category_id, language = "th", } = req.query;
        if (!category_id)
            throw new Error("query param category_id is required!");
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const urlWithParams = `${url}&offset=${offset}&page_size=${page_size}&status=${status}&category_id=${category_id}&language=${language}`;
        const response = yield (0, node_fetch_1.fetch)(urlWithParams);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getAttributeList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/product/get_attributes";
    try {
        const { category_id, language = "th" } = req.query;
        if (!category_id)
            throw new Error("query param category_id is required!");
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const urlWithParams = `${url}&category_id=${category_id}&language=${language}`;
        const response = yield (0, node_fetch_1.fetch)(urlWithParams);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
