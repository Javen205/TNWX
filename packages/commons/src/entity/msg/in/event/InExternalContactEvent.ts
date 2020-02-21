import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业客户事件
 */

export class InExternalContactEvent extends EventInMsg {
  public static EVENT: string = 'change_external_contact'

  private changetype: string
  private userid: string
  private externaluserid: string
  private state: string
  private welcomecode: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
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

  public get getState(): string {
    return this.state
  }

  public set setState(state: string) {
    this.state = state
  }

  public get welcomeCode(): string {
    return this.welcomecode
  }

  public set welcomeCode(welcomeCode: string) {
    this.welcomecode = welcomeCode
  }
}
