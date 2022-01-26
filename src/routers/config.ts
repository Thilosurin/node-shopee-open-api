import ShopeeCore from "./shopee";

export default class ConfigShopee {
  url: string = "";
  partner_id: number = 0;
  timestamp: number = 0;
  partner_key: string = "";
  shop_id: number = 0;
  path: string = "";
  access_token: string = "";
  sign: string = "";

  constructor() {}

  set setURL(value: string) {
    this.url = value;
  }

  set setPath(value: string) {
    this.path = value;
  }

  set setPartnerId(value: number) {
    this.partner_id = value;
  }

  set setTimestamp(value: number) {
    this.timestamp = value;
  }

  set setPertnerKey(value: string) {
    this.partner_key = value;
  }

  set setShopId(value: number) {
    this.shop_id = value;
  }

  set setAccessToken(value: string) {
    this.access_token = value;
  }

  set setSign(value: string) {
    this.sign = value;
  }

  static init(): ShopeeCore {
    return new ShopeeCore();
  }
}
