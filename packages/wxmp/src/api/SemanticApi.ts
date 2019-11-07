import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnwx/kits';

export class SemanticApi {
	private static searchUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=%s';

	public static async search(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.searchUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}
}
