/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 群发接口
 */
import * as util from 'util';
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken';
import { HttpKit } from '@tnwx/kits';

export class MessageApi {
	private static sendAllUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=%s';
	/**
	 *  根据标签进行群发【订阅号与服务号认证后均可用】
	 *  @param jsonStr
	 */
	public static async sendAll(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.sendAllUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static sendUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=%s';
	/**
	 *  根据OpenID列表群发【订阅号不可用，服务号认证后可用】
	 *  @param jsonStr
	 */
	public static async send(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.sendUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static deleteUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=%s';
	/**
	 *  删除群发【订阅号与服务号认证后均可用】
	 *  @param jsonStr
	 */
	public static async delete(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.deleteUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static previewUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=%s';
	/**
	 *  预览接口【订阅号与服务号认证后均可用】
	 *  @param jsonStr
	 */
	public static async preview(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.previewUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static getUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token=%s';
	/**
	 *  查询群发消息发送状态【订阅号与服务号认证后均可用】
	 *  @param msgId 群发消息后返回的消息id
	 */
	public static async get(msgId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				msg_id: msgId
			})
		);
	}

	private static getSpeedUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/speed/get?access_token=%s';
	/**
	 *  获取群发速度
	 */
	public static async getSpeed() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getSpeedUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}

	private static setSpeedUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/speed/set?access_token=%s';
	/**
	 *  设置群发速度
	 *  0 80w/分钟
	 *  1 60w/分钟
	 *  2 45w/分钟
	 *  3 30w/分钟
	 *  4 10w/分钟
	 *  @param speed 群发速度的级别，是一个0到4的整数，数字越大表示群发速度越慢
	 */
	public static async setSpeed(speed: number) {
		if (speed > 4) speed = 4;
		if (speed < 0) speed = 0;
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.setSpeedUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				speed: speed
			})
		);
	}
}
