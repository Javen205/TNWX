import { EventInMsg } from './EventInMsg'

export class InTaskEvent extends EventInMsg {
  public static EVENT: string = 'taskcard_click'

  private eventKey: string
  private taskId: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getEventKey(): string {
    return this.eventKey
  }

  public set setEventKey(eventKey: string) {
    this.eventKey = eventKey
  }

  public get getTaskId(): string {
    return this.taskId
  }

  public set setTaskId(taskId: string) {
    this.taskId = taskId
  }
}
