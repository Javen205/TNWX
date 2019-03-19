import * as util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from '../AccessToken';
import { ApiConfigKit } from '../ApiConfigKit';
import { HttpKit } from '../kit/HttpKit';

export class QrcodeApi {
    private static apiUrl: string = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=%s";
    private static showQrcodeUrl: string = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=%s";

    public static async create(response: any, json: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.apiUrl, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, json).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 临时二维码
     * @param response 
     * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
     * @param sceneId 场景值ID，临时二维码时为32位非0整型
     */
    public static async createTemporary(response: any, expireSeconds: number, sceneId: number) {
        this.create(response, JSON.stringify({
            "expire_seconds": expireSeconds,
            "action_name": "QR_SCENE",
            "action_info": {
                "scene": {
                    "scene_id": sceneId
                }
            }
        }));
    }
    /**
     * 临时二维码
     * @param response 
     * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
     * @param sceneStr 长度限制为1到64
     */
    public static async createTemporaryByStr(response: any, expireSeconds: number, sceneStr: string) {
        this.create(response, JSON.stringify({
            "expire_seconds": expireSeconds,
            "action_name": "QR_STR_SCENE",
            "action_info": {
                "scene": {
                    "scene_str": sceneStr
                }
            }
        }));
    }
    /**
     * 永久二维码
     * @param response 
     * @param sceneId 
     */
    public static async createPermanent(response: any, sceneId: number) {
        this.create(response, JSON.stringify({
            "action_name": "QR_LIMIT_SCENE",
            "action_info": {
                "scene": {
                    "scene_id": sceneId
                }
            }
        }));
    }
    /**
     * 永久二维码
     * @param response 
     * @param sceneStr 
     */
    public static async createPermanentByStr(response: any, sceneStr: string) {
        this.create(response, JSON.stringify({
            "action_name": "QR_LIMIT_STR_SCENE",
            "action_info": {
                "scene": {
                    "scene_str": sceneStr
                }
            }
        }));
    }
    /**
     * 通过ticket换取二维码
     * @param ticket 
     */
    public static getShowQrcodeUrl(ticket: string): string {
        return util.format(this.showQrcodeUrl, ticket);
    }
}