import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 部门变更通知
 */
export class InUpdatePartyEvent extends EventInMsg {
  public static CREATE_PARTY: string = 'create_party'
  public static UPDATE_PARTY: string = 'update_party'
  public static DELETE_PARTY: string = 'delete_party'

  private changeType: string
  private id: number
  private name: string
  private parentId: string
  private order: number

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getChangeType(): string {
    return this.changeType
  }

  public set setChangeType(changeType: string) {
    this.changeType = changeType
  }

  public get getId(): number {
    return this.id
  }

  public set setId(id: number) {
    this.id = id
  }

  public set setName(name: string) {
    this.name = name
  }

  public get getName(): string {
    return this.name
  }

  public set setParentId(parentId: string) {
    this.parentId = parentId
  }

  public get getParentId(): string {
    return this.parentId
  }

  public set setOrder(order: number) {
    this.order = order
  }

  public get getOrder(): number {
    return this.order
  }
}
