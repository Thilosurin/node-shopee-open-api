"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const tokenz = { accessToken: "" };
function getTokenFromJSONFile(token) {
    const pathToken = path_1.default.join(__dirname, "../../", "token.json");
    fs_1.default.readFile(pathToken, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const tokenObj = JSON.parse(data);
            Object.assign(token, tokenObj);
        }
    });
}
getTokenFromJSONFile(tokenz);
class URLHandler {
    constructor(path) {
        this.path = path;
        this.host = "https://partner.test-stable.shopeemobile.com";
        this.timestamp = Math.floor(Date.now() / 1000);
        this.partnerId = 1005369;
        this.partnerKey = "95fff60c1cfd7c8be2488223d66f0440e0ad180e446a9654ee2211109ca6d1ea";
        this.shopId = 37573;
        this.accessToken = tokenz["accessToken"];
        this.defaultObjParams = (...args) => ({
            partner_id: this.partnerId,
            timestamp: this.timestamp,
            shop_id: this.shopId,
            access_token: this.accessToken,
            sign: this.baseStringToSHA256(...args),
        });
    }
    computeSHA256(str) {
        return (0, crypto_1.createHmac)("sha256", this.partnerKey).update(str).digest("hex");
    }
    baseStringToSHA256(...args) {
        const stateObj = {
            partnerId: this.partnerId,
            path: this.path,
            timestamp: this.timestamp,
            accessToken: this.accessToken,
            shopId: this.shopId,
        };
        const baseString = args.map((key) => stateObj[key] || "").join("");
        return this.computeSHA256(baseString);
    }
    getURL(objParams = this.defaultObjParams("partnerId", "path", "timestamp", "accessToken", "shopId")) {
        const baseURL = `${this.host}${this.path}`;
        const params = Object.keys(objParams).reduce((str, key) => {
            str += `&${key}=${objParams[key]}`;
            return str;
        }, "");
        return `${baseURL}?${params.substring(1)}`;
    }
}
exports.URLHandler = URLHandler;
