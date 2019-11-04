/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取设备及用户信息
 */

import * as util from 'util';
import { AccessTokenApi } from '../../AccessTokenApi';
import { AccessToken } from '../../AccessToken';
import { HttpKit } from '@tnw/kits';
export class ShakeAroundUserApi {
	private static getShakeInfoUrl: string = 'https://api.weixin.qq.com/shakearound/user/getshakeinfo?access_token=%s';
	/**
   * 获取设备及用户信息
   * @param ticket 摇周边业务的ticket，可在摇到的URL中得到，ticket生效时间为30分钟，每一次摇都会重新生成新的ticket
   * @param needPoi 是否需要返回门店poi_id
   */
	public static async getShakeInfo(ticket: string, needPoi: boolean = false) {
		let map = new Map<string, any>();
		map.set('ticket', ticket);
		if (needPoi) map.set('need_poi', 1);

		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getShakeInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map));
	}
}
