/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 主动发送消息抽象类
 */
export abstract class QyBaseMsg {
  protected chatid: string
  protected touser: string
  protected toparty: string
  protected totag: string
  protected msgtype: string
  protected agentid: string
  protected safe: number
  protected enable_id_trans: number
  protected enable_duplicate_check: number
  protected duplicate_check_interval: number

  constructor(
    msgType: string,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    this.msgtype = msgType
    this.agentid = agentId
    this.touser = toUser
    this.totag = toTag
    this.toparty = toParty
    this.safe = safe
    this.enable_id_trans = enableIdTrans
    this.enable_duplicate_check = enableDuplicateCheck
    this.duplicate_check_interval = duplicateCheckInterval
  }

  public set chatId(chatid: string) {
    this.chatid = chatid
  }

  public get chatId(): string {
    return this.chatid
  }

  public set toUser(toUser: string) {
    this.touser = toUser
  }

  public get toUser(): string {
    return this.touser
  }

  public set toParty(toParty: string) {
    this.toparty = toParty
  }

  public get toParty(): string {
    return this.toparty
  }

  public set toTag(toTag: string) {
    this.totag = toTag
  }

  public get toTag(): string {
    return this.totag
  }

  public set msgType(msgType: string) {
    this.msgtype = msgType
  }

  public get msgType(): string {
    return this.msgtype
  }

  public set agentId(agentId: string) {
    this.agentid = agentId
  }

  public get agentId(): string {
    return this.agentid
  }

  public set setSafe(safe: number) {
    this.safe = safe
  }

  public get getSafe(): number {
    return this.safe
  }

  public set enableIdTrans(enableIdTrans: number) {
    this.enable_id_trans = enableIdTrans
  }

  public get enableIdTrans(): number {
    return this.enable_id_trans
  }

  public set enableDuplicateCheck(enableDuplicateCheck: number) {
    this.enable_duplicate_check = enableDuplicateCheck
  }

  public get enableDuplicateCheck(): number {
    return this.enable_duplicate_check
  }

  public set duplicateCheckInterval(duplicateCheckInterval: number) {
    this.duplicate_check_interval = duplicateCheckInterval
  }

  public get duplicateCheckInterval(): number {
    return this.duplicate_check_interval
  }
}

export class QyMediaId {
  private media_id: string

  constructor(mediaId: string) {
    this.media_id = mediaId
  }

  public set mediaId(mediaId: string) {
    this.media_id = mediaId
  }

  public get mediaId(): string {
    return this.media_id
  }
}
