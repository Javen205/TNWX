import { EventInMsg } from './EventInMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 成员变更通知
 */
export class InUpdateUserEvent extends EventInMsg {
  public static EVENT: string = 'change_contact'

  public static CREATE_USER: string = 'create_user'
  public static UPDATE_USER: string = 'update_user'
  public static DELETE_USER: string = 'delete_user'

  private changeType: string
  private userId: string
  private newUserId: string
  private name: string
  private department: string
  private isLeaderInDept: string
  private position: string
  private mobile: number
  private gender: number
  private email: string
  private status: number
  private avatar: string
  private alias: string
  private telephone: string
  private address: string
  private extAttr: []

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getChangeType(): string {
    return this.changeType
  }

  public set setChangeType(changeType: string) {
    this.changeType = changeType
  }

  public set setUserId(userId: string) {
    this.userId = userId
  }

  public get getUserId(): string {
    return this.userId
  }

  public set setNewUserId(newUserId: string) {
    this.newUserId = newUserId
  }

  public get getNewUserId(): string {
    return this.newUserId
  }

  public set setName(name: string) {
    this.name = name
  }

  public get getName(): string {
    return this.name
  }

  public set setDepartment(department: string) {
    this.department = department
  }

  public get getDepartment(): string {
    return this.department
  }

  public set setIsLeaderInDept(isLeaderInDept: string) {
    this.isLeaderInDept = isLeaderInDept
  }

  public get getIsLeaderInDept(): string {
    return this.isLeaderInDept
  }

  public set setPosition(position: string) {
    this.position = position
  }

  public get getPosition(): string {
    return this.position
  }

  public set setMobile(mobile: number) {
    this.mobile = mobile
  }

  public get getMobile(): number {
    return this.mobile
  }

  public set setGender(gender: number) {
    this.gender = gender
  }

  public get getGender(): number {
    return this.gender
  }

  public set setEmail(email: string) {
    this.email = email
  }

  public get getEmail(): string {
    return this.email
  }

  public set setStatus(status: number) {
    this.status = status
  }

  public get getStatus(): number {
    return this.status
  }

  public set setAvatar(avatar: string) {
    this.avatar = avatar
  }

  public get getAvatar(): string {
    return this.avatar
  }

  public set setAlias(alias: string) {
    this.alias = alias
  }

  public get getAlias(): string {
    return this.alias
  }

  public set setTelephone(telephone: string) {
    this.telephone = telephone
  }

  public get getTelephone(): string {
    return this.telephone
  }

  public set setAddress(address: string) {
    this.address = address
  }

  public get getAddress(): string {
    return this.address
  }

  public set setExtAttr(extAttr: []) {
    this.extAttr = extAttr
  }

  public get getExtAttr(): [] {
    return this.extAttr
  }
}
