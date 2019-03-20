import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '../kit/HttpKit';
import { BatchUserInfo } from '../entity/BatchUserInfo';
export class UserApi {
    private static updateRemarkUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=%s";

    private static getUserUrl: string = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=%s";
    private static getUserInfoUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s";
    private static batchGetUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=%s";

    /**
     * 设置用户备注名
     * @param openId 
     * @param remark 
     */
    public static async updateRemark(openId: string, remark: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.updateRemarkUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, JSON.stringify({
            "openid": openId,
            "remark": remark
        }));
    }
    /**
     * 获取用户列表
     * @param openId 
     * @param remark 
     */
    public static async getFollowers(nextOpenid?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getUserUrl, (<AccessToken>accessToken).getAccessToken);
        if (nextOpenid) {
            url += "&next_openid=" + nextOpenid;
        }
        return HttpKit.httpGet(url);
    }
    /**
     * 获取用户基本信息（包括UnionID机制）
     * @param openId 
     * @param lang 
     */
    public static async getUserInfo(openId: string, lang?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getUserInfoUrl, (<AccessToken>accessToken).getAccessToken, openId);
        if (lang) {
            url += "&lang=" + lang;
        }
        return HttpKit.httpGet(url);
    }
    /**
     * 批量获取用户基本信息
     * @param userList 
     */
    public static async batchGetUserInfo(userList: BatchUserInfo[]) {
        return this.batchUserInfo(JSON.stringify({
            "user_list": userList
        }));
    }

    /**
     * 批量获取用户基本信息
     * @param json 
     */
    public static async batchUserInfo(json: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.batchGetUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, json);
    }

}