/**
 * @author Javen 
 * @copyright 2019-03-16 19:49:59 javendev@126.com 
 * @description 微信API
 */

import * as util from 'util';
import { AccessTokenApi } from "./AccessTokenApi";
import { AccessToken } from "./AccessToken";
import { HttpKit } from './HttpKit';

export class ApiKit {
    public static WECHAT_DOMAIN = 'https://api.weixin.qq.com/'
    public static CREAT_EMENU_URL = '%scgi-bin/menu/create?access_token=%s'
    public static SEND_TEMPLATE_URL = '%scgi-bin/message/template/send?access_token=%s'


    /**
     * 创建菜单
     * @param response 
     * @param menuJson 
     */
    public static async createMenu(response: any, menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        //格式化请求连接
        let url = util.format(this.CREAT_EMENU_URL, this.WECHAT_DOMAIN, (<AccessToken>accessToken).getAccessToken);
        // 使用 post 请求创建微信菜单
        HttpKit.httPost(url, menuJson).then(function (data) {
            response.send(data);
        });
    }

    /**
     * 发送模板消息
     * @param response 
     * @param tempJson 
     */
    public static async sendTemplate(response: any, tempJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.SEND_TEMPLATE_URL, this.WECHAT_DOMAIN, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httPost(url, tempJson).then(function (data) {
            response.send(data);
        });
    }

}


