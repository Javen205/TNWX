import { EventInMsg } from './EventInMsg'

export class InFollowEvent extends EventInMsg {
  // 订阅：subscribe
  public static EVENT_INFOLLOW_SUBSCRIBE = 'subscribe'
  // 取消订阅：unsubscribe
  public static EVENT_INFOLLOW_UNSUBSCRIBE = 'unsubscribe'

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
