/**
 * @author Javen 
 * @copyright 2019-03-17 12:23:31 javendev@126.com 
 * @description 自定义菜单
 */

import * as util from 'util';
import { AccessTokenApi } from "../AccessTokenApi";
import { AccessToken } from "../AccessToken";
import { HttpKit } from '../HttpKit';

export class MenuApi {

    private static create_menu_url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
    private static delete_menu_url = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s';
    private static get_menu_url = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=s%';
    private static get_current_selfmenu_info = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=s%';

    private static add_conditional = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=s%';
    private static del_conditional = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=s%';
    private static try_match_url = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=s%';


    /**
     * 创建菜单
     * @param response 
     * @param menuJson 
     */
    public static async create(response: any, menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        //格式化请求连接
        let url = util.format(this.create_menu_url, (<AccessToken>accessToken).getAccessToken);
        // 使用 post 请求创建微信菜单
        HttpKit.httpPost(url, menuJson).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 删除菜单
     * @param response 
     */
    public static async delete(response: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.delete_menu_url, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 查询菜单
     * @param response 
     */
    public static async get(response: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.get_menu_url, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }
    public static async getCurrentSelfMenu(response: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.get_current_selfmenu_info, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }

    /**
     * 添加个性化菜单
     * @param response 
     * @param menuJson 
     */
    public static async addConditional(response: any, menuJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.add_conditional, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, menuJson).then(function (data) {
            response.send(data);
        });
    }

    /**
     * 删除个性化菜单
     * @param response 
     */
    public static async deleteConditional(response: any) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.del_conditional, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpGet(url).then(function (data) {
            response.send(data);
        });
    }
    /**
     * 测试个性化菜单匹配结果
     * @param response 
     * @param openId 
     */
    public static async tryMatch(response: any, openId: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.try_match_url, (<AccessToken>accessToken).getAccessToken);
        HttpKit.httpPost(url, JSON.stringify({
            "user_id": openId
        })).then(function (data) {
            response.send(data);
        });
    }
}