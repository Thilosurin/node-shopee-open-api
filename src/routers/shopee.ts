import { createHmac } from "crypto";
import ConfigShopee from "./config";

const importDynamic = new Function("modulePath", "return import(modulePath)");
async function fetch(...args: any[]) {
  const module = await importDynamic("node-fetch");
  return module.default(...args);
}

export default class ShopeeCore {
  private _config: ConfigShopee;
  private _defaultParams = {};

  constructor() {
    this._config = new ConfigShopee();
  }

  setURL(value: string): ShopeeCore {
    this._config.setURL = value;
    return this;
  }

  setPath(value: string): ShopeeCore {
    this._config.setPath = value;
    return this;
  }

  setPartnerId(value: number): ShopeeCore {
    this._config.setPartnerId = value;
    return this;
  }

  setTimestamp(value: number): ShopeeCore {
    this._config.setTimestamp = value;
    return this;
  }

  setPartnerKey(value: string): ShopeeCore {
    this._config.setPertnerKey = value;
    return this;
  }

  setShopId(value: number): ShopeeCore {
    this._config.setShopId = value;
    return this;
  }

  setAccessToken(value: string): ShopeeCore {
    this._config.setAccessToken = value;
    return this;
  }

  setSign(value: string): ShopeeCore {
    this._config.setSign = value;
    return this;
  }

  useDefaultParams(): ShopeeCore {
    Object.assign(this._defaultParams, {
      partner_id: this._config.partner_id,
      timestamp: this._config.timestamp,
      shop_id: this._config.shop_id,
      access_token: this._config.access_token,
      sign: this._config.sign,
    });
    return this;
  }

  async GETwithQueryParams(queryParams: { [k: string]: any } = {}) {
    const { url, path } = this._config;
    if (Object.keys(this._defaultParams).length) {
      Object.assign(queryParams, this._defaultParams);
    }
    const params = this.concatParams(queryParams);
    const urlFullPath = `${url}${path}?${params}`;
    return await fetch(urlFullPath);
  }

  async POSTwithJSONBody(
    body: { [k: string]: any },
    queryParams: { [k: string]: any } = {}
  ) {
    const { url, path } = this._config;
    if (Object.keys(this._defaultParams).length) {
      Object.assign(queryParams, this._defaultParams);
    }
    const params = this.concatParams(queryParams);
    const urlFullPath = `${url}${path}?${params}`;

    return await fetch(urlFullPath, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  }

  setDefaultValues(): ShopeeCore {
    this.setURL("https://partner.test-stable.shopeemobile.com");
    this.setPartnerId(1005369);
    this.setShopId(37573);
    this.setTimestamp(Math.floor(Date.now() / 1000));
    this.setPartnerKey(
      "95fff60c1cfd7c8be2488223d66f0440e0ad180e446a9654ee2211109ca6d1ea"
    );
    return this;
  }

  encodeToSign(...args: string[]): ShopeeCore {
    if (!args.length) {
      args = ["partner_id", "path", "timestamp", "access_token", "shop_id"];
    }
    const reqParams = args
      .map((p) => (this._config as { [k: string]: any })[p])
      .join("");
    const signEncoded = createHmac("sha256", this._config.partner_key)
      .update(reqParams)
      .digest("hex");
    return this.setSign(signEncoded);
  }

  config() {
    return this._config;
  }

  toString(): string {
    return JSON.stringify(this);
  }

  concatParams(paramsObj: { [k: string]: any }): string {
    return Object.keys(paramsObj)
      .reduce((str, key) => (str += `&${key}=${paramsObj[key]}`), "")
      .substring(1);
  }
}
