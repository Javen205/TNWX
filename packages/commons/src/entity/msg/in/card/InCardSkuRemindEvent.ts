/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 库存报警事件
 */
import { EventInMsg } from '../event/EventInMsg'

export class InCardSkuRemindEvent extends EventInMsg {
  public static EVENT: string = 'card_pay_order'

  private cardId: string //卡券ID
  private detail: string //报警详细信息

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getCardId(): string {
    return this.cardId
  }
  public set setCardId(cardId: string) {
    this.cardId = cardId
  }
  public get getDetail() {
    return this.detail
  }
  public set setDetail(detail: string) {
    this.detail = detail
  }
}
