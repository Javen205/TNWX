/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取api_ticket
 */

import * as util from 'util';
import { AccessToken, AccessTokenApi, IAccessTokenCache, ApiConfigKit } from '@tnwx/accesstoken';
import { HttpKit } from '@tnwx/kits';
import { JsTicket } from '../JsTicket';

export class JsTicketApi {
	private static getTicketUrl: string = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=%s';
	/**
	 * 获取api_ticket
	 * @param type
	 */
	public static async getTicket(type: JsApiType) {
		let appId = ApiConfigKit.getApiConfig.getAppId;
		let key = appId + ':' + type;
		// 从缓存中获取
		let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
		let jsTicketJson = accessTokenCache.get(key);
		if (jsTicketJson) {
			if (ApiConfigKit.isDevMode) {
				console.debug('缓存中获取api_ticket...');
			}
			return new JsTicket(jsTicketJson);
		}
		// 通过接口获取
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getTicketUrl, accessToken.getAccessToken, type);
		let data = await HttpKit.getHttpDelegate.httpGet(url);
		if (data) {
			let jsTicket: JsTicket = new JsTicket(data);
			let accessTokenCache: IAccessTokenCache = ApiConfigKit.getAccessTokenCache;
			accessTokenCache.set(key, jsTicket.getCacheJson);
			if (ApiConfigKit.isDevMode) {
				console.debug('通过接口获取api_ticket...');
			}
			return jsTicket;
		}
	}
}
export enum JsApiType {
	JSAPI = 'jsapi',
	WX_CARD = 'wx_card'
}
