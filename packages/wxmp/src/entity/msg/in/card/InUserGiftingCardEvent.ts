/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 转赠事件推送
 */
import { EventInMsg } from '../event/EventInMsg';

export class InUserGiftingCardEvent extends EventInMsg {
	public static EVENT: string = 'user_gifting_card';

	private cardId: string;
	private userCardCode: string;
	private isReturnBack: string;
	private friendUserName: string;
	private isChatRoom: string;

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

	public get getIsReturnBack(): string {
		return this.isReturnBack;
	}

	public set setIsReturnBack(isReturnBack: string) {
		this.isReturnBack = isReturnBack;
	}

	public get getFriendUserName(): string {
		return this.friendUserName;
	}

	public set setFriendUserName(friendUserName: string) {
		this.friendUserName = friendUserName;
	}

	public get getIsChatRoom(): string {
		return this.isChatRoom;
	}

	public set setIsChatRoom(isChatRoom: string) {
		this.isChatRoom = isChatRoom;
	}
}
