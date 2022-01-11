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
exports.getOrderDetailList = exports.getOrderList = void 0;
const async_1 = require("../../middleware/async");
const node_fetch_1 = require("../../utils/node-fetch");
const url_1 = require("../../utils/url");
let __PATH__;
exports.getOrderList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/order/get_order_list";
    try {
        const { accessToken } = req.params;
        if (!accessToken)
            throw new Error("parameter accessToken is required!");
        const { time_range_field = "create_time", time_from = Math.floor(Date.now() / 1000), time_to = Math.floor(Date.now() / 1000) + 864000, page_size = 10, } = req.query;
        const urlHandler = new url_1.URLHandler(__PATH__, accessToken);
        const url = urlHandler.getURL();
        const urlWithParams = `${url}&time_range_field=${time_range_field}&time_from=${time_from}&time_to=${time_to}&page_size=${page_size}`;
        const response = yield (0, node_fetch_1.fetch)(urlWithParams);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getOrderDetailList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/order/get_order_detail";
    try {
        const { accessToken } = req.params;
        if (!accessToken)
            throw new Error("parameter accessToken is required!");
        const { orderIdList } = req.body;
        if (!orderIdList || !orderIdList.length) {
            throw new Error("body orderIdList is required!");
        }
        const urlHandler = new url_1.URLHandler(__PATH__, accessToken);
        const url = urlHandler.getURL();
        const orderIdStr = orderIdList.join(",");
        const response = yield (0, node_fetch_1.fetch)(`${url}&order_sn_list=${orderIdStr}`);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
