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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.getUrlFromShopee = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const async_1 = require("../../middleware/async");
const url_1 = require("../../utils/url");
const node_fetch_1 = require("../../utils/node-fetch");
let __PATH__;
exports.getUrlFromShopee = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/shop/auth_partner";
    try {
        const urlHandler = new url_1.URLHandler(__PATH__);
        const _a = urlHandler.defaultObjParams("partnerId", "path", "timestamp"), { shop_id, access_token } = _a, objParams = __rest(_a, ["shop_id", "access_token"]);
        Object.assign(objParams, {
            redirect: encodeURIComponent("https://google.co.th"),
        });
        const url = urlHandler.getURL(objParams);
        res.status(200).json({ status: 200, url });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getAccessToken = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    __PATH__ = "/api/v2/auth/token/get";
    try {
        const { code } = req.params;
        if (!code)
            throw new Error("parameter code is required!");
        const urlHandler = new url_1.URLHandler(__PATH__);
        const _b = urlHandler.defaultObjParams("partnerId", "path", "timestamp"), { shop_id, access_token } = _b, objParams = __rest(_b, ["shop_id", "access_token"]);
        const response = yield (0, node_fetch_1.apiPostJSON)({
            url: urlHandler.getURL(objParams),
            body: {
                code,
                shop_id: urlHandler.shopId,
                partner_id: urlHandler.partnerId,
            },
        });
        const data = yield response.json();
        fs_1.default.writeFile(path_1.default.join(__dirname, "../../../", "token.json"), JSON.stringify({
            accessToken: data["access_token"],
            refreshToken: data["refresh_token"],
        }), "utf-8", (err) => {
            if (err)
                throw err;
            console.log("complete");
        });
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
