import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 注册完成回调事件
 */

export class InRegisterCorp extends BaseMsg {
  public static INFO_TYPE: string = 'register_corp'

  private servicecorpid: string
  private infotype: string
  private timestamp: number
  private registercode: string
  private authcorpid: string
  private accesstoken: string
  private expiresin: number
  private userid: string
  private externaluserid: string
  private state: string
  private templateid: string

  constructor(
    serviceCorpId: string,
    infoType: string,
    timeStamp: number,
    registerCode: string,
    authCorpId: string,
    accessToken: string,
    expiresIn: number,
    userId: string,
    state: string,
    templateId: string
  ) {
    super()
    this.servicecorpid = serviceCorpId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.registercode = registerCode
    this.authcorpid = authCorpId
    this.accesstoken = accessToken
    this.expiresin = expiresIn
    this.userid = userId
    this.state = state
    this.templateid = templateId
  }

  public get serviceCorpId(): string {
    return this.servicecorpid
  }

  public set serviceCorpId(serviceCorpId: string) {
    this.servicecorpid = serviceCorpId
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

  public get registerCode(): string {
    return this.registercode
  }

  public set registerCode(registerCode: string) {
    this.registercode = registerCode
  }

  public get authCorpId(): string {
    return this.authcorpid
  }

  public set authCorpId(authCorpId: string) {
    this.authcorpid = authCorpId
  }

  public get accessToken(): string {
    return this.accesstoken
  }

  public set accessToken(accessToken: string) {
    this.accessToken = accessToken
  }

  public get expiresIn(): number {
    return this.expiresin
  }

  public set expiresIn(expiresIn: number) {
    this.expiresin = expiresIn
  }

  public get userId(): string {
    return this.userid
  }

  public set userId(userId: string) {
    this.userid = userId
  }

  public get getState(): string {
    return this.state
  }

  public set setState(state: string) {
    this.state = state
  }

  public get templateId(): string {
    return this.templateid
  }

  public set templateId(templateId: string) {
    this.templateid = templateId
  }
}
