/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信会员卡积分变更
 */
import { EventInMsg } from '../event/EventInMsg'

export class InUpdateMemberCardEvent extends EventInMsg {
  public static EVENT: string = 'update_member_card'

  private cardId: string
  private userCardCode: string
  private modifyBonus: string
  private modifyBalance: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getCardId(): string {
    return this.cardId
  }

  public set setCardId(cardId: string) {
    this.cardId = cardId
  }

  public get getUserCardCode(): string {
    return this.userCardCode
  }

  public set setUserCardCode(userCardCode: string) {
    this.userCardCode = userCardCode
  }

  public get getModifyBalance(): string {
    return this.modifyBalance
  }

  public set setModifyBalance(modifyBalance: string) {
    this.modifyBalance = modifyBalance
  }

  public get getModifyBonus(): string {
    return this.modifyBonus
  }

  public set setModifyBonus(modifyBonus: string) {
    this.modifyBonus = modifyBonus
  }
}
