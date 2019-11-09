/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 券点流水详情事件
 */
import { EventInMsg } from '../event/EventInMsg'

export class InCardPayOrderEvent extends EventInMsg {
  public static EVENT: string = 'card_pay_order'

  //本次推送对应的订单号
  private orderId: string
  //本次订单号的状态,ORDER_STATUS_WAITING 等待支付 ORDER_STATUS_SUCC 支付成功 ORDER_STATUS_FINANCE_SUCC 加代币成功 ORDER_STATUS_QUANTITY_SUCC 加库存成功 ORDER_STATUS_HAS_REFUND 已退币 ORDER_STATUS_REFUND_WAITING 等待退币确认 ORDER_STATUS_ROLLBACK 已回退,系统失败 ORDER_STATUS_HAS_RECEIPT 已开发票
  private status: string
  //购买券点时，支付二维码的生成时间
  private createOrderTime: string
  //购买券点时，实际支付成功的时间
  private payFinishTime: string
  //支付方式，一般为微信支付充值
  private desc: string
  //剩余免费券点数量
  private freeCoinCount: string
  //剩余付费券点数量
  private payCoinCount: string
  //本次变动的免费券点数量
  private refundFreeCoinCount: string
  //本次变动的付费券点数量
  private refundPayCoinCount: string
  //所要拉取的订单类型ORDER_TYPE_SYS_ADD 平台赠送券点 ORDER_TYPE_WXPAY 充值券点 ORDER_TYPE_REFUND 库存未使用回退券点 ORDER_TYPE_REDUCE 券点兑换库存 ORDER_TYPE_SYS_REDUCE 平台扣减
  private orderType: string
  //系统备注，说明此次变动的缘由，如开通账户奖励、门店奖励、核销奖励以及充值、扣减。
  private memo: string
  //所开发票的详情
  private receiptInfo: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getOrderId(): string {
    return this.orderId
  }

  public set setOrderId(orderId: string) {
    this.orderId = orderId
  }

  public get getStatus(): string {
    return this.status
  }

  public set setStatus(status: string) {
    this.status = status
  }

  public get getCreateOrderTime(): string {
    return this.createOrderTime
  }

  public set setCreateOrderTime(createOrderTime: string) {
    this.createOrderTime = createOrderTime
  }

  public get getPayFinishTime(): string {
    return this.payFinishTime
  }

  public set setPayFinishTime(payFinishTime: string) {
    this.payFinishTime = payFinishTime
  }

  public get getDesc(): string {
    return this.desc
  }

  public set setDesc(desc: string) {
    this.desc = desc
  }

  public get getFreeCoinCount(): string {
    return this.freeCoinCount
  }

  public set setFreeCoinCount(freeCoinCount: string) {
    this.freeCoinCount = freeCoinCount
  }

  public get getPayCoinCount(): string {
    return this.payCoinCount
  }

  public set setPayCoinCount(payCoinCount: string) {
    this.payCoinCount = payCoinCount
  }

  public get getRefundFreeCoinCount(): string {
    return this.refundFreeCoinCount
  }

  public set setRefundFreeCoinCount(refundFreeCoinCount: string) {
    this.refundFreeCoinCount = refundFreeCoinCount
  }

  public get getRefundPayCoinCount(): string {
    return this.refundPayCoinCount
  }

  public set setRefundPayCoinCount(refundPayCoinCount: string) {
    this.refundPayCoinCount = refundPayCoinCount
  }

  public get getOrderType(): string {
    return this.orderType
  }

  public set setOrderType(orderType: string) {
    this.orderType = orderType
  }

  public get getMemo(): string {
    return this.memo
  }

  public set setMemo(memo: string) {
    this.memo = memo
  }

  public get getReceiptInfo(): string {
    return this.receiptInfo
  }

  public set setReceiptInfo(receiptInfo: string) {
    this.receiptInfo = receiptInfo
  }
}
