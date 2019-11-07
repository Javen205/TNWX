/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 自定义菜单
 */

import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnwx/kits';

export class MenuApi {
	private static createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s';
	private static deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s';
	private static getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=s%';
	private static getSelfMenuInfoUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=s%';

	private static addConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=s%';
	private static delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=s%';
	private static tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=s%';

	/**
	 *  创建菜单
	 *  @param menuJson
	 */
	public static async create(menuJson: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.createMenuUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, menuJson);
	}
	/**
	 *  删除菜单
	 */
	public static async delete() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.deleteMenuUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}
	/**
	 *  查询菜单
	 */
	public static async get() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getMenuUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}
	public static async getCurrentSelfMenu() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getSelfMenuInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}

	/**
	 *  添加个性化菜单
	 *  @param menuJson
	 */
	public static async addConditional(menuJson: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addConditionalUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, menuJson);
	}

	/**
	 *  删除个性化菜单
	 */
	public static async deleteConditional() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.delConditionalUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}
	/**
	 *  测试个性化菜单匹配结果
	 *  @param openId
	 */
	public static async tryMatch(openId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.tryMatchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				user_id: openId
			})
		);
	}
}
