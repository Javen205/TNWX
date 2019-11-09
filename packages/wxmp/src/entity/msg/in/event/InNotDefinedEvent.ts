import { EventInMsg } from './EventInMsg'

export class InNotDefinedEvent extends EventInMsg {
  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }
}
