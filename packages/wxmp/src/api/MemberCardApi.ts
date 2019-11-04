/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 会员卡接口
 */
import * as util from 'util';
import { AccessTokenApi } from '../AccessTokenApi';
import { AccessToken } from '../AccessToken';
import { HttpKit } from '@tnw/kits';

export class MemberCardApi {
	private static activateUrl: string = 'https://api.weixin.qq.com/card/membercard/activate?access_token=%s';

	/**
   * 接口激活
   * @param jsonStr
   */
	public static async activate(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.activateUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(jsonStr));
	}

	private static setActivateUserFormUrl: string = 'https://api.weixin.qq.com/card/membercard/activateuserform/set?access_token=%s';
	/**
   * 普通一键激活-设置开卡字段接口
   * @param jsonStr
   */
	public static async setActivateUserForm(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.setActivateUserFormUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(jsonStr));
	}

	private static getActivateTempInfoUrl: string = 'https://api.weixin.qq.com/card/membercard/activatetempinfo/get?access_token=%s';
	/**
   * 跳转型一键激活 获取用户提交资料
   * @param activateTicket
   */
	public static async getActivateTempInfo(activateTicket: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getActivateTempInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				activate_ticket: activateTicket
			})
		);
	}
	private static updateUserUrl: string = 'https://api.weixin.qq.com/card/membercard/updateuser?access_token=%s';
	/**
   * 更新会员信息
   * @param jsonStr
   */
	public static async updateUser(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.updateUserUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static getUserInfoUrl: string = 'https://api.weixin.qq.com/card/membercard/userinfo/get?access_token=%s';
	/**
   * 拉取会员信息（积分查询）接口
   * @param cardId
   * @param code
   */
	public static async getUserInfo(cardId: string, code: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getUserInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				card_id: cardId,
				code: code
			})
		);
	}

	private static payGiftCardAddUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/add?access_token=%s';
	/**
   * 设置支付后投放卡券接口
   * @param jsonStr
   */
	public static async payGiftCardAdd(jsonStr: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.payGiftCardAddUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(url, jsonStr);
	}

	private static payGiftCardDelUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/delete?access_token=%s';
	/**
   * 删除支付后投放卡券规则接口
   * @param ruleId
   */
	public static async payGiftCardDel(ruleId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.payGiftCardDelUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				rule_id: ruleId
			})
		);
	}

	private static payGiftCardGetUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/getbyid?access_token=%s';
	/**
   * 查询支付后投放卡券规则详情接口
   * @param ruleId
   */
	public static async payGiftCardGet(ruleId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.payGiftCardGetUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				rule_id: ruleId
			})
		);
	}
	private static payGiftCardBatchGetUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/batchget?access_token=%s';
	/**
   * 批量查询支付后投放卡券规则接口
   * @param effective
   * @param offset
   * @param count
   * @param type
   */
	public static async payGiftCardBatchGet(
		effective: boolean,
		offset: number,
		count: number,
		type: string = 'RULE_TYPE_PAY_MEMBER_CARD'
	) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.payGiftCardBatchGetUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				type: type,
				effective: effective,
				offset: offset,
				count: count
			})
		);
	}
	private static getMemberCardInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardmembercardinfo?access_token=%s';
	/**
   * 拉取会员卡概况数据接口
   * @param beginDate  查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
   */
	public static async getMemberCardInfo(beginDate: string, endDate: string, condSource: number = 0) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getMemberCardInfoUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				begin_date: beginDate,
				end_date: endDate,
				cond_source: condSource
			})
		);
	}

	private static getMemberCardDetailUrl: string = 'https://api.weixin.qq.com/datacube/getcardmembercarddetail?access_token=%s';
	/**
   * 拉取单张会员卡数据接口
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param cardId 卡券id
   */
	public static async getMemberCardDetail(beginDate: string, endDate: string, cardId: string) {
		let accessToken: AccessToken = await AccessTokenApi.getAccessToken();
		let url = util.format(this.getMemberCardDetailUrl, accessToken.getAccessToken);
		return HttpKit.getHttpDelegate.httpPost(
			url,
			JSON.stringify({
				begin_date: beginDate,
				end_date: endDate,
				card_id: cardId
			})
		);
	}
}
