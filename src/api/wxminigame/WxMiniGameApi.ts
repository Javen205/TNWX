import * as util from 'util';
import { AccessTokenApi } from '../../AccessTokenApi';
import { AccessToken } from '../../AccessToken';
import { HttpKit } from '../../kit/HttpKit';

/**
 * @author Javen 
 * @copyright javendev@126.com 
 * @description 微信小游戏相关 API
 */

export class WxMiniGameApi {
    private static checkSessionKeyUrl: string = "https://api.weixin.qq.com/wxa/checksession?access_token=%s&signature=%s&openid=%s&sig_method=%s";

    /**
     * 校验服务器所保存的登录态 session_key 是否合法
     * @param openId 用户唯一标识符
     * @param signature 用户登录态签名
     * @param sigMethod 用户登录态签名的哈希方法
     */
    public static async checkSessionKey(openId: string, signature: string, sigMethod: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.checkSessionKeyUrl, (<AccessToken>accessToken).getAccessToken,
            signature, openId, sigMethod);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

    private static code2SessionUrl: string = "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code";
    /**
     * @param appId 小程序 appId
     * @param secret 小程序 appSecret
     * @param jsCode 登录时获取的 code
     */
    public static async code2Session(appId: string, secret: string, jsCode: string) {
        let url = util.format(this.code2SessionUrl, appId, secret, jsCode);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

    private static imgSecCheckUrl: string = "https://api.weixin.qq.com/wxa/img_sec_check?access_token=%s";
    /**
     * 校验图片是否违规
     * @param imgPath 图片路径
     */
    public static async imgSecCheck(imgPath: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.imgSecCheckUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.upload(url, imgPath, '');
    }

    private static mediaCheckAsyncUrl: string = "https://api.weixin.qq.com/wxa/media_check_async?access_token=%s";
    /**
     * 异步校验图片/音频是否违规
     * @param mediaUrl 
     * @param mediaType 
     */
    public static async mediaCheckAsync(mediaUrl: string, mediaType: WxMiniGameMediaType) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.mediaCheckAsyncUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "media_url": mediaUrl,
            "media_type": mediaType
        }));
    }

    private static msgSecCheckUrl: string = "https://api.weixin.qq.com/wxa/msg_sec_check?access_token=%s";
    /**
     * 校验文本是否违规
     * @param content 
     */
    public static async msgSecCheck(content: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.msgSecCheckUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "content": content
        }));
    }
    private static removeUserStorageUrl: string = "https://api.weixin.qq.com/wxa/remove_user_storage?access_token=%s&signature=%s&openid=%s&sig_method=%s";
    /**
     * 删除已经上报到微信的key-value数据
     * 
     * @param openId 用户唯一标识符
     * @param signature 用户登录态签名
     * @param sigMethod 用户登录态签名的哈希方法
     * @param key 要删除的数据key列表
     */
    public static async removeUserStorage(openId: string, signature: string, sigMethod: string, keys: string[]) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.removeUserStorageUrl, (<AccessToken>accessToken).getAccessToken,
            signature, openId, sigMethod);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'key': keys
        }));
    }

    private static setUserInteractiveDataUrl: string = "https://api.weixin.qq.com/wxa/setuserinteractivedata?access_token=%s&signature=%s&openid=%s&sig_method=%s";
    /**
     * 写用户关系链互动数据存储
     * 
     * @param openId 用户唯一标识符
     * @param signature 用户登录态签名
     * @param sigMethod 用户登录态签名的哈希方法
     * @param kvList 要删除的数据列表 {"key":"1","value":0}
     */
    public static async setUserInteractiveData(openId: string, signature: string, sigMethod: string, kvList: []) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.setUserInteractiveDataUrl, (<AccessToken>accessToken).getAccessToken,
            signature, openId, sigMethod);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'kv_list': kvList
        }));
    }

    private static setUserStorageUrl: string = "https://api.weixin.qq.com/wxa/set_user_storage?access_token=%s&signature=%s&openid=%s&sig_method=%s";
    /**
     * 写用户关系链互动数据存储
     * 
     * @param openId 用户唯一标识符
     * @param signature 用户登录态签名
     * @param sigMethod 用户登录态签名的哈希方法
     * @param kvList 要删除的数据列表 {"key":"1","value":0}
     */
    public static async setUserStorage(openId: string, signature: string, sigMethod: string, kvList: []) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.setUserStorageUrl, (<AccessToken>accessToken).getAccessToken,
            signature, openId, sigMethod);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'kv_list': kvList
        }));
    }

    private static createActivieyIdUrl: string = "https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create?access_token=%s";
    /**
     * 创建被分享动态消息的 activity_id
     */
    public static async createActivityId() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.createActivieyIdUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

    private static setUpdatableMsgUrl: string = "https://api.weixin.qq.com/cgi-bin/message/wxopen/updatablemsg/send?access_token=%s";
    /**
     * 修改被分享的动态消息 
     * 
     * @param activityId 动态消息的 ID
     * @param targetState 动态消息修改后的状态
     * @param templateInfo 动态消息对应的模板信息
     */
    public static async setUpdatableMsg(activityId: string, targetState: number, templateInfo: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.setUpdatableMsgUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'activity_id': activityId,
            'target_state': targetState,
            'template_info': templateInfo
        }));
    }

    private static createQRCodeUrl: string = "https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=%s";
    /**
     * 获取小程序二维码
     * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
     * 
     * @param path 
     * @param width 
     */
    public static async createQRCode(path: string, width: number = 430) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.createQRCodeUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'path': path,
            'width': width,
        }));
    }
    private static getWxAcodeUrl: string = "https://api.weixin.qq.com/wxa/getwxacode?access_token=%s";

    /**
     * 获取小程序二维码
     * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
     * 
     * @param path 
     * @param width 
     * @param autoColor 
     * @param lineColor 
     * @param isHyaline 
     */
    public static async getWxAcode(path: string, width: number = 430,
        autoColor: boolean = false, lineColor: string = '{"r":0,"g":0,"b":0}',
        isHyaline: boolean = false) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getWxAcodeUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'path': path,
            'width': width,
            'auto_color': autoColor,
            'line_color': lineColor,
            'is_hyaline': isHyaline,
        }));
    }

    private static getUnlimitedUrl: string = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s";

    /**
     * 获取小程序二维码
     * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
     * @param scene
     * @param path 
     * @param width 
     * @param autoColor 
     * @param lineColor 
     * @param isHyaline 
     */
    public static async getUnlimited(scene: string, path: string, width: number = 430,
        autoColor: boolean = false, lineColor: string = '{"r":0,"g":0,"b":0}',
        isHyaline: boolean = false) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getUnlimitedUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'scene': scene,
            'path': path,
            'width': width,
            'auto_color': autoColor,
            'line_color': lineColor,
            'is_hyaline': isHyaline,
        }));
    }

    private static sendSubscribeMsgUrl: string = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s";

    /**
     * 发送订阅消息
     * 
     * @param toUser 接收者（用户）的 openid
     * @param templateId 所需下发的订阅模板id
     * @param data 模板内容
     * @param page 跳转页面路径
     */
    public static async sendSubscribeMsg(toUser: string, templateId: string, data: any, page?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.sendSubscribeMsgUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            'touser': toUser,
            'template_id': templateId,
            'page': page,
            'data': data,
        }));
    }
}

export enum WxMiniGameMediaType {
    VOICE = 1,
    IMG = 2
}