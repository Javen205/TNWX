/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收图片消息
 */
import { InMsg } from './InMsg'

export class InImageMsg extends InMsg {
  private picUrl: string
  private mediaId: string
  private msgId: string

  constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
    super(toUserName, fromUserName, createTime, msgType)
  }

  public get getPicUrl(): string {
    return this.picUrl
  }

  public set setPicUrl(picUrl: string) {
    this.picUrl = picUrl
  }

  public get getMediaId(): string {
    return this.mediaId
  }

  public set setMediaId(mediaId: string) {
    this.mediaId = mediaId
  }

  public get getMsgId(): string {
    return this.msgId
  }

  public set setMsgId(msgId: string) {
    this.msgId = msgId
  }
}
