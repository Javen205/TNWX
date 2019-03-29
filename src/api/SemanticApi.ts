import util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";
import { HttpKit } from "../kit/HttpKit";

export class SemanticApi {
    private static searchUrl = "https://api.weixin.qq.com/semantic/semproxy/search?access_token=%s";

    public static async search(jsonStr: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.searchUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, jsonStr);
    }
}