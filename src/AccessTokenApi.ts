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
        let accessTokenCache: IAccessTokenCache = ApiConfigKit.accessTokenCache;
        let accessTokenJson: string = accessTokenCache.get(apiConfig.getAppId);
        if (accessTokenJson) {
            result = new AccessToken(accessTokenJson);
            if (result && result.isAvailable) {
                return result;
            }
        }
        return result;
    }


    public static refreshAccessToken(ac: ApiConfig) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let url = util.format(that.url, ac.getAppId, ac.getAppScrect);
            HttpKit.getHttpDelegate.httpGet(url).then(function (data) {
                let json = <string>data;
                if (json) {
                    let result: AccessToken = new AccessToken(json)
                    let accessTokenCache: IAccessTokenCache = ApiConfigKit.accessTokenCache;
                    accessTokenCache.set(ac.getAppId, result.getCacheJson);
                    resolve(result);
                } else {
                    reject("获取accessToken异常")
                }
            });
        });
    }
}