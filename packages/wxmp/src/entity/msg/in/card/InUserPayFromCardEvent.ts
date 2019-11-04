/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信会员卡快速买单
 */
import { EventInMsg } from '../event/EventInMsg';

export class InUserPayFromCardEvent extends EventInMsg {
	public static EVENT: string = 'user_pay_from_pay_cell';

	private cardId: string;
	private userCardCode: string;
	private transId: string;
	private locationId: string;
	private fee: string;
	private originalFee: string;

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

	public get getTransId(): string {
		return this.transId;
	}

	public set setTransId(transId: string) {
		this.transId = transId;
	}

	public get getLocationId(): string {
		return this.locationId;
	}

	public set setLocationId(locationId: string) {
		this.locationId = locationId;
	}

	public get getFee(): string {
		return this.fee;
	}

	public set setFee(fee: string) {
		this.fee = fee;
	}

	public get getOriginalFee(): string {
		return this.originalFee;
	}

	public set setOriginalFee(originalFee: string) {
		this.originalFee = originalFee;
	}
}
