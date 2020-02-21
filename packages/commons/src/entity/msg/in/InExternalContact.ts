import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 外部联系人事件
 */

export class InExternalContact extends BaseMsg {
  public static INFO_TYPE: string = 'change_external_contact'

  private suiteid: string
  private authcorpid: string
  private infotype: string
  private timestamp: number
  private changetype: string
  private userid: string
  private externaluserid: string
  private welcomecode: string

  constructor(suiteId: string, authCorpId: string, infoType: string, timeStamp: number, changeType: string, userId: string, externalUserId: string, welcomeCode: string) {
    super()
    this.suiteid = suiteId
    this.authcorpid = authCorpId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.changetype = changeType
    this.userid = userId
    this.externaluserid = externalUserId
    this.welcomecode = welcomeCode
  }

  public get suiteId(): string {
    return this.suiteid
  }

  public set suiteId(suiteId: string) {
    this.suiteid = suiteId
  }

  public get authCorpId(): string {
    return this.authcorpid
  }

  public set authCorpId(authCorpId: string) {
    this.authcorpid = authCorpId
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

  public get changeType(): string {
    return this.changetype
  }

  public set changeType(changeType: string) {
    this.changetype = changeType
  }

  public get userId(): string {
    return this.userid
  }

  public set userId(userId: string) {
    this.userid = userId
  }

  public get externalUserId(): string {
    return this.externaluserid
  }

  public set externalUserId(externalUserId: string) {
    this.externaluserid = externalUserId
  }

  public get welcomeCode(): string {
    return this.welcomecode
  }

  public set welcomeCode(welcomeCode: string) {
    this.welcomecode = welcomeCode
  }
}
