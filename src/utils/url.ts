import { createHmac } from "crypto";

export class URLHandler {
  private host = "https://partner.test-stable.shopeemobile.com";
  private timestamp = Math.floor(Date.now() / 1000);
  partnerId = 1005369;
  private partnerKey =
    "95fff60c1cfd7c8be2488223d66f0440e0ad180e446a9654ee2211109ca6d1ea";
  shopId = 37573;

  set setAccessToken(value: string) {
    this.accessToken = value;
  }

  constructor(private path: string, private accessToken: string = "") {}

  computeSHA256(str: string): string {
    return createHmac("sha256", this.partnerKey).update(str).digest("hex");
  }

  baseStringToSHA256(...args: string[]): string {
    const stateObj: { [k: string]: any } = {
      partnerId: this.partnerId,
      path: this.path,
      timestamp: this.timestamp,
      accessToken: this.accessToken,
      shopId: this.shopId,
    };
    const baseString = args.map((key) => stateObj[key] || "").join("");
    return this.computeSHA256(baseString);
  }

  defaultObjParams = (...args: string[]) => ({
    partner_id: this.partnerId,
    timestamp: this.timestamp,
    shop_id: this.shopId,
    access_token: this.accessToken,
    sign: this.baseStringToSHA256(...args),
  });

  getURL(
    objParams: { [k: string]: any } = this.defaultObjParams(
      "partnerId",
      "path",
      "timestamp",
      "accessToken",
      "shopId"
    )
  ): string {
    const baseURL = `${this.host}${this.path}`;
    const params = Object.keys(objParams).reduce((str, key) => {
      str += `&${key}=${objParams[key]}`;
      return str;
    }, "");
    return `${baseURL}?${params.substring(1)}`;
  }
}
