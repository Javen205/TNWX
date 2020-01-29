/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 审核事件推送
 */
import { EventInMsg } from '../event/EventInMsg'

export class InCardPassCheckEvent extends EventInMsg {
  public static EVENT_PASS: string = 'card_pass_check'
  public static EVENT_NOT_PASS: string = 'card_not_pass_check'

  /**
   *  卡券ID
   */
  private cardId: string
  /**
   *  审核不通过原因
   */
  private refuseReason: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getCardId(): string {
    return this.cardId
  }

  public set setCardId(cardId: string) {
    this.cardId = cardId
  }

  public get getRefuseReason(): string {
    return this.refuseReason
  }

  public set setRefuseReason(refuseReason: string) {
    this.refuseReason = refuseReason
  }
}
