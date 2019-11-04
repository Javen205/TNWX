/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 数据统计接口
 */
import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnw/kits';

export class DatacubeApi {
	private static getUserSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getusersummary?access_token=%s';
	private static getUserCumulateUrl: string = 'https://api.weixin.qq.com/datacube/getusercumulate?access_token=%s';
	private static getArticleSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getarticlesummary?access_token=%s';
	private static getArticleTotalUrl: string = 'https://api.weixin.qq.com/datacube/getarticletotal?access_token=%s';
	private static getUserReadUrl: string = 'https://api.weixin.qq.com/datacube/getuserread?access_token=%s';
	private static getUserReadHourUrl: string = 'https://api.weixin.qq.com/datacube/getuserreadhour?access_token=%s';
	private static getUserShareUrl: string = 'https://api.weixin.qq.com/datacube/getusershare?access_token=%s';
	private static getUserShareHourUrl: string = 'https://api.weixin.qq.com/datacube/getusersharehour?access_token=%s';

	public static async getData(url: string, beginDate: string, endDate: string) {
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				begin_date: beginDate,
				end_date: endDate
			})
		);
	}

	/**
	 *  获取用户增减数据 最大时间跨度：7天
	 *  @param beginDate 获取数据的起始日期
	 *  @param endDate 获取数据的结束日期
	 */
	public static async getUserSummary(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserSummaryUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}
	/**
	 *  获取累计用户数据 最大时间跨度：7天
	 *  @param beginDate 获取数据的起始日期
	 *  @param endDate 获取数据的结束日期
	 */
	public static async getUserCumulate(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserCumulateUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文群发每日数据，最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getArticleSummary(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getArticleSummaryUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文群发总数据，最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getArticleTotal(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getArticleTotalUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文统计数据 最大跨度3天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUserRead(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserReadUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文统计分时数据 最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUserReadHour(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserReadHourUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文分享转发数据 最大跨度7天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUserShare(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserShareUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取图文分享转发分时数据 最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUserShareHour(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserShareHourUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	private static getUpStreamMsgUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsg?access_token=%s';
	private static getUpStreamMsgHourUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsghour?access_token=%s';
	private static getUpStreamMsgWeekMsgUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgweek?access_token=%s';
	private static getUpStreamMsgMonthUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgmonth?access_token=%s';
	private static getUpStreamMsgDistUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdist?access_token=%s';
	private static getUpStreamMsgDistWeekUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdistweek?access_token=%s';
	private static getUpStreamMsgDistMonthUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdistmonth?access_token=%s';
	private static getInterFaceSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getinterfacesummary?access_token=%s';
	private static getInterFaceSummaryHourUrl: string = 'https://api.weixin.qq.com/datacube/getinterfacesummaryhour?access_token=%s';
	/**
	 *  获取消息发送概况数据 最大跨度7天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsg(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取消息分送分时数据 最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgHour(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgHourUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取消息发送周数据 最大跨度30天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgWeekMsg(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgWeekMsgUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取消息发送月数据 最大跨度30天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgMonth(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgMonthUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取消息发送分布数据 最大跨度15天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgDist(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgDistUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取消息发送分布周数据 最大跨度30天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgDistWeek(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgDistWeekUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}
	/**
	 *  获取消息发送分布月数据 最大跨度30天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getUpStreamMsgDistMonth(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUpStreamMsgDistMonthUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取接口分析数据 最大跨度30天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getInterFaceSummary(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getInterFaceSummaryUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}

	/**
	 *  获取接口分析分时数据 最大跨度1天
	 *  @param beginDate
	 *  @param endDate
	 */
	public static async getInterFaceSummaryHour(beginDate: string, endDate: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getInterFaceSummaryHourUrl, accessToken.getAccessToken);
		return this.getData(url, beginDate, endDate);
	}
}
