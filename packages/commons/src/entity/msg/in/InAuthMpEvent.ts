import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信开放平台授权通知事件
 */

export class InAuthMpEvent extends BaseMsg {
  public static CREATE_AUTH: string = 'authorized'
  public static CHANGE_AUTH: string = 'updateauthorized'
  public static CANCEL_AUTH: string = 'unauthorized'

  private appid: string
  private createtime: number
  private infotype: string
  private authappid: string
  private authcode: string
  private authcodeexpiredtime: number
  private preauthcode: string

  constructor(appId: string, infoType: string, createTime: number, authAppId: string, authCode?: string, authCodeExpiredTime?: number, preAuthCode?: string) {
    super()
    this.appid = appId
    this.infotype = infoType
    this.createtime = createTime
    this.authappid = authAppId
    this.authcode = authCode
    this.authcodeexpiredtime = authCodeExpiredTime
    this.preauthcode = preAuthCode
  }

  public get appId(): string {
    return this.appid
  }

  public set appId(appId: string) {
    this.appid = appId
  }

  public get infoType(): string {
    return this.infotype
  }

  public set infoType(infoType: string) {
    this.infotype = infoType
  }

  public get createTime(): number {
    return this.createtime
  }

  public set timeStamp(createTime: number) {
    this.createtime = createTime
  }

  public get authAppId(): string {
    return this.authappid
  }

  public set authAppId(authAppId: string) {
    this.authappid = authAppId
  }

  public get authCode(): string {
    return this.authcode
  }

  public set authCode(authCode: string) {
    this.authcode = authCode
  }

  public get authCodeExpiredTime(): number {
    return this.authcodeexpiredtime
  }

  public set authCodeExpiredTime(authCodeExpiredTime: number) {
    this.authcodeexpiredtime = authCodeExpiredTime
  }

  public get preAuthCode(): string {
    return this.preauthcode
  }

  public set preAuthCode(preAuthCode: string) {
    this.preauthcode = preAuthCode
  }
}
