/**
 * @author Javen
 * @copyright javendev@126.com
 * @description  资质认证失败通知事件
 */
import { EventInMsg } from './EventInMsg'

export class InVerifyFailEvent extends EventInMsg {
  //资质认证失败
  public static EVENT_IN_QUALIFICATION_VERIFY_FAIL: string = 'qualification_verify_fail'
  //名称认证失败
  public static EVENT_IN_NAMING_VERIFY_FAIL: string = 'naming_verify_fail'

  private failTime: string
  private failReason: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }
  public get getFailTime(): string {
    return this.failTime
  }

  public set setFailTime(failTime: string) {
    this.failTime = failTime
  }

  public get getFailReason(): string {
    return this.failReason
  }

  public set setFailReason(failReason: string) {
    this.failReason = failReason
  }
}
