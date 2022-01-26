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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.getUrlFromShopee = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const async_1 = require("../../middleware/async");
const config_1 = __importDefault(require("../config"));
exports.getUrlFromShopee = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopee = yield config_1.default.init()
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error", error });
    }
}));
exports.getAccessToken = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.params;
        if (!code)
            throw new Error("parameter code is required!");
        const shopee = yield config_1.default.init()
            .setPath("/api/v2/auth/token/get")
            .setDefaultValues()
            .encodeToSign("partner_id", "path", "timestamp");
        const config = shopee.config();
        const response = yield shopee.POSTwithJSONBody({
            code,
            shop_id: config.shop_id,
            partner_id: config.partner_id,
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
