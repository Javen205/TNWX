/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 领取事件推送
 */
import { EventInMsg } from "../event/EventInMsg";

export class InUserGetCardEvent extends EventInMsg {
    public static EVENT: string = "user_get_card";

    private cardId!: string
    private isGiveByFriend!: string
    private userCardCode!: string
    private friendUserName!: string
    private outerId!: string
    private oldUserCardCode!: string
    private outerStr!: string
    private isRestoreMemberCard!: string
    private isRecommendByFriend!: string

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public get getCardId(): string {
        return this.cardId;
    }

    public set setCardId(cardId: string) {
        this.cardId = cardId;
    }

    public get getIsGiveByFriend(): string {
        return this.isGiveByFriend;
    }

    public set setIsGiveByFriend(isGiveByFriend: string) {
        this.isGiveByFriend = isGiveByFriend;
    }

    public get getUserCardCode(): string {
        return this.userCardCode;
    }

    public set setUserCardCode(userCardCode: string) {
        this.userCardCode = userCardCode;
    }

    public get getOuterId(): string {
        return this.outerId;
    }

    public set setOuterId(outerId: string) {
        this.outerId = outerId;
    }

    public get getFriendUserName(): string {
        return this.friendUserName;
    }

    public set setFriendUserName(friendUserName: string) {
        this.friendUserName = friendUserName;
    }

    public get getOldUserCardCode(): string {
        return this.oldUserCardCode;
    }

    public set setOldUserCardCode(oldUserCardCode: string) {
        this.oldUserCardCode = oldUserCardCode;
    }

    public get getOuterStr(): string {
        return this.outerStr;
    }

    public set setOuterStr(outerStr: string) {
        this.outerStr = outerStr;
    }

    public get getIsRestoreMemberCard(): string {
        return this.isRestoreMemberCard;
    }

    public set setIsRestoreMemberCard(isRestoreMemberCard: string) {
        this.isRestoreMemberCard = isRestoreMemberCard;
    }

    public get getIsRecommendByFriend(): string {
        return this.isRecommendByFriend;
    }

    public set setIsRecommendByFriend(isRecommendByFriend: string) {
        this.isRecommendByFriend = isRecommendByFriend;
    }
}