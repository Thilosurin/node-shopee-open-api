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
exports.getLogisticsList = void 0;
const async_1 = require("../../middleware/async");
const node_fetch_1 = require("../../utils/node-fetch");
const url_1 = require("../../utils/url");
let __PATH__;
exports.getLogisticsList = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/logistics/get_channel_list";
    try {
        const urlHandler = new url_1.URLHandler(__PATH__);
        const url = urlHandler.getURL();
        const response = yield (0, node_fetch_1.fetch)(url);
        res.status(200).json(yield response.json());
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
