import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信认证事件
 */
export class InWxVerifyDispatchEvent extends EventInMsg {
  public static EVENT: string = 'wx_verify_dispatch'

  private provider: string
  private contact: string
  private dispatchTime: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getProvider(): string {
    return this.provider
  }

  public set setProvider(provider: string) {
    this.provider = provider
  }

  public get getContact(): string {
    return this.contact
  }

  public set setContact(contact: string) {
    this.contact = contact
  }

  public get getDispatchTime(): string {
    return this.dispatchTime
  }

  public set setDispatchTime(dispatchTime: string) {
    this.dispatchTime = dispatchTime
  }
}
