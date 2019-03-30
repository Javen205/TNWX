/**
 * @author Javen 
 * @copyright 2019-03-17 12:23:31 javendev@126.com 
 * @description 自定义菜单
 */

import * as util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";
import { HttpKit } from '../kit/HttpKit';

export class MenuApi {

    private static createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
    private static deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s';
    private static getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=s%';
    private static getSelfMenuInfoUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=s%';

    private static addConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=s%';
    private static delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=s%';
    private static tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=s%';


    /**
     * 创建菜单
     * @param response 
     * @param menuJson 
     */
    public static async create(menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.createMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, menuJson);
    }
    /**
     * 删除菜单
     * @param response 
     */
    public static async delete() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.deleteMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 查询菜单
     * @param response 
     */
    public static async get() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getMenuUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    public static async getCurrentSelfMenu() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getSelfMenuInfoUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

    /**
     * 添加个性化菜单
     * @param response 
     * @param menuJson 
     */
    public static async addConditional(menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.addConditionalUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, menuJson);
    }

    /**
     * 删除个性化菜单
     * @param response 
     */
    public static async deleteConditional() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.delConditionalUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 测试个性化菜单匹配结果
     * @param response 
     * @param openId 
     */
    public static async tryMatch(openId: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.tryMatchUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "user_id": openId
        }));
    }
}