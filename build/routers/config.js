"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shopee_1 = __importDefault(require("./shopee"));
class ConfigShopee {
    constructor() {
        this.url = "";
        this.partner_id = 0;
        this.timestamp = 0;
        this.partner_key = "";
        this.shop_id = 0;
        this.path = "";
        this.access_token = "";
        this.sign = "";
    }
    set setURL(value) {
        this.url = value;
    }
    set setPath(value) {
        this.path = value;
    }
    set setPartnerId(value) {
        this.partner_id = value;
    }
    set setTimestamp(value) {
        this.timestamp = value;
    }
    set setPertnerKey(value) {
        this.partner_key = value;
    }
    set setShopId(value) {
        this.shop_id = value;
    }
    set setAccessToken(value) {
        this.access_token = value;
    }
    set setSign(value) {
        this.sign = value;
    }
    static init() {
        return new shopee_1.default();
    }
}
exports.default = ConfigShopee;
