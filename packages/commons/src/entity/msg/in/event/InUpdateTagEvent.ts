import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 标签变更通知
 */
export class InUpdateTagEvent extends EventInMsg {
  public static CHANGE_TYPE: string = 'update_tag'

  private tagId: number
  private addUserItems: string
  private delUserItems: string
  private addPartyItems: string
  private delPartyItems: string

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getTagId(): number {
    return this.tagId
  }

  public set setTagId(tagId: number) {
    this.tagId = tagId
  }

  public set setAddUserItems(addUserItems: string) {
    this.addUserItems = addUserItems
  }

  public get getAddUserItems(): string {
    return this.addUserItems
  }

  public set setDelUserItems(delUserItems: string) {
    this.delUserItems = delUserItems
  }

  public get getDelUserItems(): string {
    return this.delUserItems
  }

  public set setAddPartyItems(addPartyItems: string) {
    this.addPartyItems = addPartyItems
  }

  public get getAddPartyItems(): string {
    return this.addPartyItems
  }

  public set setDelPartyItems(delPartyItems: string) {
    this.delPartyItems = delPartyItems
  }

  public get getDelPartyItems(): string {
    return this.delPartyItems
  }
}
