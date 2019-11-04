/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信门店接口
 */
import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnw/kits';

export class PoiApi {
	private static addPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/addpoi?access_token=%s';
	private static getPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getpoi?access_token=%s';
	private static getPoiListUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/getpoilist?access_token=%s';
	private static updatePoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/updatepoi?access_token=%s';
	private static delPoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/delpoi?access_token=%s';
	private static getWxCategoryUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getwxcategory?access_token=%s';

	/**
   * 创建门店
   * @param jsonStr
   */
	public static async addPoi(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.addPoiUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}
	/**
   * 查询门店信息
   * @param poiId
   */
	public static async getPoi(poiId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getPoiUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				poi_id: poiId
			})
		);
	}
	/**
   * 查询门店列表
   * @param begin 开始位置，0 即为从第一条开始查询
   * @param limit 返回数据条数，最大允许50，默认为20
   */
	public static async getPoiList(begin: number = 0, limit: number = 20) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getPoiListUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				begin: begin,
				limit: limit
			})
		);
	}
	/**
   * 修改门店服务信息
   * @param jsonStr
   */
	public static async updatePoi(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.updatePoiUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}
	/**
   * 删除门店
   * @param poiId
   */
	public static async delPoi(poiId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.delPoiUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				poi_id: poiId
			})
		);
	}
	/**
   * 门店类目表
   */
	public static async getWxCategory() {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getWxCategoryUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpGet(url);
	}
}
