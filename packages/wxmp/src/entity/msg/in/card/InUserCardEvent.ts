/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信会员卡卡券
 */
import { EventInMsg } from '../event/EventInMsg'

export class InUserCardEvent extends EventInMsg {
  // 微信会员卡激活接口
  public static EVENT_MEMBERCARD: string = 'submit_membercard_user_info'
  // 微信会员卡二维码扫描领取接口
  public static EVENT_USER_VIEW: string = 'user_view_card'
  // 从卡券进入公众号会话事件推送
  public static EVENT_USER_ENTER: string = 'user_enter_session_from_card'
  // 卡券删除事件推送
  public static EVENT_USER_DEL: string = 'user_del_card'

  private cardId: string
  private userCardCode: string

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
}
