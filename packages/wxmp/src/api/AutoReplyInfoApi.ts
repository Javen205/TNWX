/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取公众号的自动回复规则
 */
import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnwx/kits';

export class AutoReplyInfoApi {
	private static getCurrentAutoreplyInfoUrl: string = 'https://api.weixin.qq.com/cgi-bin/get_current_autoreply_info?access_token=%s';

	public static async getCurrent() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getCurrentAutoreplyInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}
}
