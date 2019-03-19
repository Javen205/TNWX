import * as util from 'util';
import { HttpKit } from "../kit/HttpKit";
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";

export class ShortUrlApi {
    private static apiUrl: string = "https://api.weixin.qq.com/cgi-bin/shorturl?access_token=%s";

    public static async getShorturl(json: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.apiUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, json);
    }

    public static async longToShort(longUrl: string) {
        return this.getShorturl(JSON.stringify({
            "action": "long2short",
            "long_url": longUrl
        }));
    }
}