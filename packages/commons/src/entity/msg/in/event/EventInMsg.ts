import { InMsg } from '../InMsg'

export abstract class EventInMsg extends InMsg {
  protected event: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, 'event')
    this.event = event
  }

  public get getEvent(): string {
    return this.event
  }

  public set setEvent(event: string) {
    this.event = event
  }
}
