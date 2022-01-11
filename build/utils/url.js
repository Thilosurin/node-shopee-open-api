"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLHandler = void 0;
const crypto_1 = require("crypto");
class URLHandler {
    constructor(path, accessToken = "") {
        this.path = path;
        this.accessToken = accessToken;
        this.host = "https://partner.test-stable.shopeemobile.com";
        this.timestamp = Math.floor(Date.now() / 1000);
        this.partnerId = 1005369;
        this.partnerKey = "95fff60c1cfd7c8be2488223d66f0440e0ad180e446a9654ee2211109ca6d1ea";
        this.shopId = 37573;
        this.defaultObjParams = (...args) => ({
            partner_id: this.partnerId,
            timestamp: this.timestamp,
            shop_id: this.shopId,
            access_token: this.accessToken,
            sign: this.baseStringToSHA256(...args),
        });
    }
    set setAccessToken(value) {
        this.accessToken = value;
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
