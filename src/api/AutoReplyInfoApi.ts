/**
 * @author Javen 
 * @copyright 2019-03-23 15:00:23 javendev@126.com 
 * @description 获取公众号的自动回复规则
 */
import * as util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";
import { HttpKit } from "../kit/HttpKit";

export class AutoReplyInfoApi {
    private static getCurrentAutoreplyInfoUrl: string = "https://api.weixin.qq.com/cgi-bin/get_current_autoreply_info?access_token=%s";

    public static async getCurrent() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getCurrentAutoreplyInfoUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpGet(url);
    }
}