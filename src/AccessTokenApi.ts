import * as util from 'util';
import { AccessToken } from "./AccessToken";
import { ApiConfig } from "./entity/ApiConfig";
import { IAccessTokenCache } from "./cache/IAccessTokenCache";
import { ApiConfigKit } from "./ApiConfigKit";
import { HttpKit } from "./kit/HttpKit";

export class AccessTokenApi {
    static url: string = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
    static accesstoken: AccessToken;

    public static async getAccessToken() {
        if (this.accesstoken) return this.accesstoken;
        let ac: ApiConfig = ApiConfigKit.getApiConfig;
        let accesstoken: AccessToken = this.getAvailableAccessToken(ac);
        if (accesstoken) {
            console.log("缓存中的accesstoken");
            return accesstoken;
        }
        console.log("刷新accesstoken");
        return await this.refreshAccessToken(ac);;
    }

    public static set accessToken(accesstoken: AccessToken) {
        this.accesstoken = accesstoken;
    }

    private static getAvailableAccessToken(apiConfig: ApiConfig): AccessToken {
        let result!: AccessToken;
        let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
        let accessTokenJson: string = accessTokenCache.get(apiConfig.getAppId);
        if (accessTokenJson) {
            result = new AccessToken(accessTokenJson);
            if (result && result.isAvailable) {
                return result;
            }
        }
        return result;
    }


    public static async refreshAccessToken(ac: ApiConfig) {
        let url = util.format(this.url, ac.getAppId, ac.getAppScrect);
        let data = await HttpKit.getHttpDelegate.httpGet(url);
        if (data) {
            let accessToken: AccessToken = new AccessToken(data)
            let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
            accessTokenCache.set(ac.getAppId, accessToken.getCacheJson);
            return accessToken;
        } else {
            return "获取accessToken异常";
        }
    }
}