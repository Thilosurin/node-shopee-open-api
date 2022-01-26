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
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("./config"));
const importDynamic = new Function("modulePath", "return import(modulePath)");
function fetch(...args) {
    return __awaiter(this, void 0, void 0, function* () {
        const module = yield importDynamic("node-fetch");
        return module.default(...args);
    });
}
class ShopeeCore {
    constructor() {
        this._defaultParams = {};
        this._config = new config_1.default();
    }
    setURL(value) {
        this._config.setURL = value;
        return this;
    }
    setPath(value) {
        this._config.setPath = value;
        return this;
    }
    setPartnerId(value) {
        this._config.setPartnerId = value;
        return this;
    }
    setTimestamp(value) {
        this._config.setTimestamp = value;
        return this;
    }
    setPartnerKey(value) {
        this._config.setPertnerKey = value;
        return this;
    }
    setShopId(value) {
        this._config.setShopId = value;
        return this;
    }
    setAccessToken(value) {
        this._config.setAccessToken = value;
        return this;
    }
    setSign(value) {
        this._config.setSign = value;
        return this;
    }
    useDefaultParams() {
        Object.assign(this._defaultParams, {
            partner_id: this._config.partner_id,
            timestamp: this._config.timestamp,
            shop_id: this._config.shop_id,
            access_token: this._config.access_token,
            sign: this._config.sign,
        });
        return this;
    }
    GETwithQueryParams(queryParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, path } = this._config;
            if (Object.keys(this._defaultParams).length) {
                Object.assign(queryParams, this._defaultParams);
            }
            const params = this.concatParams(queryParams);
            const urlFullPath = `${url}${path}?${params}`;
            return yield fetch(urlFullPath);
        });
    }
    POSTwithJSONBody(body, queryParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, path } = this._config;
            if (Object.keys(this._defaultParams).length) {
                Object.assign(queryParams, this._defaultParams);
            }
            const params = this.concatParams(queryParams);
            const urlFullPath = `${url}${path}?${params}`;
            return yield fetch(urlFullPath, {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            });
        });
    }
    setDefaultValues() {
        this.setURL("https://partner.test-stable.shopeemobile.com");
        this.setPartnerId(1005369);
        this.setShopId(37573);
        this.setTimestamp(Math.floor(Date.now() / 1000));
        this.setPartnerKey("95fff60c1cfd7c8be2488223d66f0440e0ad180e446a9654ee2211109ca6d1ea");
        return this;
    }
    encodeToSign(...args) {
        if (!args.length) {
            args = ["partner_id", "path", "timestamp", "access_token", "shop_id"];
        }
        const reqParams = args
            .map((p) => this._config[p])
            .join("");
        const signEncoded = (0, crypto_1.createHmac)("sha256", this._config.partner_key)
            .update(reqParams)
            .digest("hex");
        return this.setSign(signEncoded);
    }
    config() {
        return this._config;
    }
    toString() {
        return JSON.stringify(this);
    }
    concatParams(paramsObj) {
        return Object.keys(paramsObj)
            .reduce((str, key) => (str += `&${key}=${paramsObj[key]}`), "")
            .substring(1);
    }
}
exports.default = ShopeeCore;
