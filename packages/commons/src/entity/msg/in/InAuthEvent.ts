import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 授权通知事件
 */

export class InAuthEvent extends BaseMsg {
  public static CREATE_AUTH: string = 'create_auth'
  public static CHANGE_AUTH: string = 'change_auth'
  public static CANCEL_AUTH: string = 'cancel_auth'

  private suiteid: string
  private authcode: string
  private infotype: string
  private timestamp: number
  private authcorpid: string

  constructor(suiteId: string, infoType: string, timeStamp: number, authCode?: string, authCorpId?: string) {
    super()
    this.suiteid = suiteId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.authcode = authCode
  }

  public get suiteId(): string {
    return this.suiteid
  }

  public set suiteId(suiteId: string) {
    this.suiteid = suiteId
  }

  public get infoType(): string {
    return this.infotype
  }

  public set infoType(infoType: string) {
    this.infotype = infoType
  }

  public get timeStamp(): number {
    return this.timestamp
  }

  public set timeStamp(timeStamp: number) {
    this.timestamp = timeStamp
  }

  public get authCode(): string {
    return this.authcode
  }

  public set authCode(authCode: string) {
    this.authcode = authCode
  }
}
