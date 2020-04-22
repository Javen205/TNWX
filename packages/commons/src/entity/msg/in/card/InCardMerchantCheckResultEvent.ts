import { EventInMsg } from '../event/EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 子商户审核事件推送
 */
export class InCardMerchantCheckResultEvent extends EventInMsg {
  public static EVENT: string = 'card_merchant_check_result'

  /**
   * 子商户ID
   */
  private merchantId: string
  /**
   * 是否通过，为1时审核通过
   */
  private isPass: number
  /**
   * 驳回的原因
   */
  private reason: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getMerchantId(): string {
    return this.merchantId
  }

  public set setMerchantId(merchantId: string) {
    this.merchantId = merchantId
  }

  public get getIsPass(): number {
    return this.isPass
  }

  public set setIsPass(isPass: number) {
    this.isPass = isPass
  }

  public get geteason(): string {
    return this.reason
  }

  public set setReason(reason: string) {
    this.reason = reason
  }
}
