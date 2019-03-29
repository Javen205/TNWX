import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '../kit/HttpKit';
export class UserApi {
    private static updateRemarkUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=%s";

    private static getUserUrl: string = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=%s";
    private static getUserInfoUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s";
    private static batchGetUrl: string = "https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=%s";

    private static getBlackListUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=%s";
    private static batchBlackListUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=%s";
    private static batchUnBlackListUrl: string = "https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=%s";

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

    /**
     * 获取公众号的黑名单列表
     * @param beginOpenId 为空时默认从开头拉取
     */
    public static async getBlackList(beginOpenId?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getBlackListUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, JSON.stringify({
            "begin_openid": beginOpenId || ''
        }));
    }
    /**
     * 拉黑用户
     * @param openidList  需要拉入黑名单的用户的openid，一次拉黑最多允许20个
     */
    public static async batchBlackList(openidList: string[]) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.batchBlackListUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, JSON.stringify({
            "openid_list": openidList
        }));
    }

    /**
     * 取消拉黑用户
     * @param openidList
     */
    public static async batchUnBlackList(openidList: string[]) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.batchUnBlackListUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.httpPost(url, JSON.stringify({
            "openid_list": openidList
        }));
    }

}

export class BatchUserInfo {
    private openid: string;
    private lang: string;

    constructor(openid: string, lang: string) {
        this.openid = openid;
        this.lang = lang;
    }

    public get getOpenId(): string {
        return this.openid;
    }

    public set setOpenId(openid: string) {
        this.openid = openid;
    }

    public get getLang(): string {
        return this.lang;
    }

    public set setLang(lang: string) {
        this.lang = lang;
    }

}