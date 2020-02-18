import { BaseMsg } from '../BaseMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 推送suite_ticket
 */

export class InSuiteTicket extends BaseMsg {
  public static INFO_TYPE: string = 'suite_ticket'

  private suiteid: string
  private infotype: string
  private timestamp: number
  private suiteticket: string

  constructor(suiteId: string, infoType: string, timeStamp: number, suiteTicket: string) {
    super()
    this.suiteid = suiteId
    this.infotype = infoType
    this.timestamp = timeStamp
    this.suiteticket = suiteTicket
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

  public get suiteTicket(): string {
    return this.suiteticket
  }

  public set suiteTicket(suiteTicket: string) {
    this.suiteticket = suiteTicket
  }
}
