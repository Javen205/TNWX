/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收文本消息
 */
import { InMsg } from './InMsg'

export class InTextMsg extends InMsg {
  private content: string
  private msgId: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getContent(): string {
    return this.content
  }

  public set setContent(content: string) {
    this.content = content
  }

  public get getMsgId(): string {
    return this.msgId
  }

  public set setMsgId(msgId: string) {
    this.msgId = msgId
  }
}
