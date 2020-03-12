import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 推送 component_verify_ticket
 */

export class InComponentVerifyTicket extends BaseMsg {
  public static INFO_TYPE: string = 'component_verify_ticket'

  private appid: string
  private infotype: string
  private createtime: number
  private ticket: string

  constructor(appId: string, infoType: string, createTime: number, ticket: string) {
    super()
    this.appid = appId
    this.infotype = infoType
    this.createtime = createTime
    this.ticket = ticket
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

  public get getTicket(): string {
    return this.ticket
  }

  public set setTicket(ticket: string) {
    this.ticket = ticket
  }
}
