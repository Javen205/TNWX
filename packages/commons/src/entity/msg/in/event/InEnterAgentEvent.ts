import { EventInMsg } from './EventInMsg'

export class InEnterAgentEvent extends EventInMsg {
  public static EVENT: string = 'enter_agent'

  private eventKey: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getEventKey(): string {
    return this.eventKey
  }

  public set setEventKey(eventKey: string) {
    this.eventKey = eventKey
  }
}
