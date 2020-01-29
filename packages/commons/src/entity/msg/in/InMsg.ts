/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收消息抽象类
 */

export abstract class InMsg {
  protected toUserName: string //开发者微信号
  protected fromUserName: string //发送方帐号openId
  protected createTime: number //消息创建时间
  protected agentId: string // 企业号的应用ID
  /**
   * 消息类型
   * 1：text 文本消息
   * 2：image 图片消息
   * 3：voice 语音消息
   * 4：video 视频消息
   * 5：location 地址位置消息
   * 6：link 链接消息
   * 7：event 事件
   */
  protected msgType: string //消息类型

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    this.toUserName = toUserName
    this.fromUserName = fromUserName
    this.createTime = createTime
    this.msgType = msgType
  }

  public get getToUserName(): string {
    return this.toUserName
  }

  public set setToUserName(toUserName: string) {
    this.toUserName = toUserName
  }

  public get getFromUserName(): string {
    return this.fromUserName
  }

  public set setFromUserName(fromUserName: string) {
    this.fromUserName = fromUserName
  }

  public get getCreateTime(): number {
    return this.createTime
  }

  public set setCreateTime(createTime: number) {
    this.createTime = createTime
  }

  public get getMsgType(): string {
    return this.msgType
  }

  public set setMsgType(msgType: string) {
    this.msgType = msgType
  }
}
