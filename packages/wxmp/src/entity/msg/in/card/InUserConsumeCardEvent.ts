/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 核销事件推送
 */
import { EventInMsg } from '../event/EventInMsg';

export class InUserConsumeCardEvent extends EventInMsg {
	public static EVENT: string = 'user_consume_card';
	//卡券ID。
	private cardId: string;
	//卡券Code码。
	private userCardCode: string;
	//核销来源。支持开发者统计API核销（FROM_API）、公众平台核销（FROM_MP）、卡券商户助手核销（FROM_MOBILE_HELPER）（核销员微信号）
	private consumeSource: string;
	//门店名称，当前卡券核销的门店名称（只有通过自助核销和买单核销时才会出现该字段）
	private locationName: string;
	//核销该卡券核销员的openid（只有通过卡券商户助手核销时才会出现）
	private staffOpenId: string;
	//自助核销时，用户输入的验证码
	private verifyCode: string;
	//自助核销时，用户输入的备注金额
	private remarkAmount: string;
	//开发者发起核销时传入的自定义参数，用于进行核销渠道统计
	private outerStr: string;

	constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
		super(toUserName, fromUserName, createTime, msgType);
	}

	public get getCardId(): string {
		return this.cardId;
	}
	public set setCardId(cardId: string) {
		this.cardId = cardId;
	}
	public get getUserCardCode(): string {
		return this.userCardCode;
	}
	public set setUserCardCode(userCardCode: string) {
		this.userCardCode = userCardCode;
	}
	public get getConsumeSource() {
		return this.consumeSource;
	}
	public set setConsumeSource(consumeSource: string) {
		this.consumeSource = consumeSource;
	}
	public get getLocationName() {
		return this.locationName;
	}
	public set setLocationName(locationName: string) {
		this.locationName = locationName;
	}
	public get getStaffOpenId() {
		return this.staffOpenId;
	}
	public set setStaffOpenId(staffOpenId: string) {
		this.staffOpenId = staffOpenId;
	}
	public get getVerifyCode() {
		return this.verifyCode;
	}
	public set setVerifyCode(verifyCode: string) {
		this.verifyCode = verifyCode;
	}
	public get getRemarkAmount() {
		return this.remarkAmount;
	}
	public set setRemarkAmount(remarkAmount: string) {
		this.remarkAmount = remarkAmount;
	}
	public get getOuterStr() {
		return this.outerStr;
	}
	public set setOuterStr(outerStr: string) {
		this.outerStr = outerStr;
	}
}
