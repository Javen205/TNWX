
import * as util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";
import { HttpKit } from '../kit/HttpKit';
import { Article } from '../entity/msg/out/Article';
import { MenuMsg } from '../entity/msg/out/MenuMsg';
import { ApiConfigKit } from '../ApiConfigKit';

export class CustomServiceApi {
    private static addKfAccountUrl: string = "https://api.weixin.qq.com/customservice/kfaccount/add?access_token=%s";
    private static updateKfAccountUrl: string = "https://api.weixin.qq.com/customservice/kfaccount/update?access_token=%s";
    private static delKfAccountUrl: string = "https://api.weixin.qq.com/customservice/kfaccount/del?access_token=%s&kf_account=%s";
    private static getKfListUrl: string = "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=%s";
    private static customMessageUrl: string = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s";
    private static typingUrl: string = "https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=%s";
    private static uploadKfHeadImgUrl: string = "http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=%s&kf_account=%s";


    /**
     * 添加客服帐号
     * @param response 
     * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信
     * @param nickname 客服昵称，最长6个汉字或12个英文字符
     * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
     */
    public static async addKfAccount(response: any, kf_account: string, nickname: string, password: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.addKfAccountUrl, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, JSON.stringify({
            "kf_account": kf_account,
            "nickname": nickname,
            "password": password
        })).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 修改客服帐号
     * @param response 
     * @param kf_account 
     * @param nickname 
     * @param password 
     */
    public static async updateKfAccount(response: any, kf_account: string, nickname: string, password: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.updateKfAccountUrl, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, JSON.stringify({
            "kf_account": kf_account,
            "nickname": nickname,
            "password": password
        })).then(function (data) {
            response.send(data);
        });
    }

    /**
     * 删除客服帐号
     * @param response 
     * @param kf_account 
     */
    public static async delKfAccount(response: any, kf_account: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.delKfAccountUrl, (<AccessToken>accessToken).getAccessToken, kf_account);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 设置客服帐号的头像
     * @param response 
     * @param kf_account 
     * @param filePath 头像图片文件必须是jpg格式，推荐使用640*640大小的图片以达到最佳效果
     */
    public static async uploadKfAccountHeadImg(response: any, kf_account: string, filePath: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.uploadKfHeadImgUrl, (<AccessToken>accessToken).getAccessToken, kf_account);
        HttpKit.upload(url, "", filePath).then(function (data) {
            response.send(data);
        });
    }


    /**
     * 获取所有客服账号
     * @param response 
     */
    public static async getKfList(response: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getKfListUrl, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }

    /**
     * 发送客服消息
     * @param response 
     * @param json 各种消息的JSON数据包
     * @param kf_account 以某个客服帐号来发消息
     */
    public static async sendMsg(response: any, json: string, kf_account?: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.customMessageUrl, (<AccessToken>accessToken).getAccessToken);
        if (kf_account) {
            let obj = JSON.parse(json);
            obj.customservice = {
                "kf_account": kf_account
            }
            json = JSON.stringify(obj);
        }
        if (ApiConfigKit.isDevMode) {
            console.log("发送客服消息JSON", json);
        }
        HttpKit.httpPost(url, json).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 发送文本客服消息
     * @param response 
     * @param openId 
     * @param text 
     */
    public static async sendText(response: any, openId: string, text: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "text",
            "text":
            {
                "content": text
            }
        }), kf_account);
    }
    /**
     * 发送图片消息
     * @param response 
     * @param openId 
     * @param text 
     */
    public static async sendImage(response: any, openId: string, media_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "image",
            "image":
            {
                "media_id": media_id
            }
        }), kf_account);
    }
    /**
     * 发送语音消息
     * @param response 
     * @param openId 
     * @param media_id
     */
    public static async sendVoice(response: any, openId: string, media_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "voice",
            "voice":
            {
                "media_id": media_id
            }
        }), kf_account);
    }
    /**
     * 发送视频消息
     * @param response 
     * @param openId 
     * @param media_id 
     * @param title 
     * @param description 
     */
    public static async sendVideo(response: any, openId: string, media_id: string, title: string, description: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "video",
            "video":
            {
                "media_id": media_id,
                "title": title,
                "description": description
            }
        }), kf_account);
    }
    /**
     * 发送音乐消息
     * @param response 
     * @param openId 
     * @param title 
     * @param description 
     * @param musicurl 
     * @param hqmusicurl 
     * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
     */
    public static async sendMusic(response: any, openId: string, title: string, description: string, musicurl: string,
        hqmusicurl: string, thumb_media_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "music",
            "music":
            {
                "title": title,
                "description": description,
                "musicurl": musicurl,
                "hqmusicurl": hqmusicurl,
                "thumb_media_id": thumb_media_id
            }
        }), kf_account);
    }
    /**
     * 发送图文消息
     * @param response 
     * @param openId 
     * @param articles 
     */
    public static async sendNews(response: any, openId: string, articles: Article[], kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "news",
            "news": {
                "articles": articles
            }
        }), kf_account);
    }
    /**
     * 发送图文消息（点击跳转到图文消息页面）
     * @param response 
     * @param openId 
     * @param media_id 
     */
    public static async sendMpNews(response: any, openId: string, media_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "mpnews",
            "mpnews":
            {
                "media_id": media_id
            }
        }), kf_account);
    }
    /**
     * 发送菜单消息
     * @param response 
     * @param openId 
     * @param head_content 
     * @param list 
     * @param tail_content 
     */
    public static async sendMenu(response: any, openId: string, head_content: string, list: MenuMsg[],
        tail_content: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "msgmenu",
            "msgmenu": {
                "head_content": head_content,
                "list": list,
                "tail_content": tail_content
            }
        }), kf_account);
    }
    /**
     * 发送卡券
     * @param response 
     * @param openId 
     * @param card_id 
     */
    public static async sendCoupon(response: any, openId: string, card_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "wxcard",
            "wxcard":
            {
                "card_id": card_id
            }
        }), kf_account);
    }
    /**
     * 发送小程序卡片（要求小程序与公众号已关联）
     * @param response 
     * @param openId 
     * @param title 
     * @param appid 
     * @param pagepath 
     * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
     */
    public static async sendMiniProgramPage(response: any, openId: string, title: string, appid: string,
        pagepath: string, thumb_media_id: string, kf_account?: string) {
        return this.sendMsg(response, JSON.stringify({
            "touser": openId,
            "msgtype": "miniprogrampage",
            "miniprogrampage":
            {
                "title": title,
                "appid": appid,
                "pagepath": pagepath,
                "thumb_media_id": thumb_media_id
            }
        }), kf_account);
    }

    /**
     * 客服输入状态
     * @param response 
     * @param openId 
     * @param command "Typing"：对用户下发“正在输入"状态,"CancelTyping"：取消对用户的”正在输入"状态
     */
    public static async sendTyping(response: any, openId: string, command: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.typingUrl, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, JSON.stringify({
            "touser": openId,
            "command": command
        })).then(function (data) {
            response.send(data);
        });
    }

}