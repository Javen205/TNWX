import { QyBaseMsg } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 小程序通知消息
 */
export class QyMiniProgramNoticeMsg extends QyBaseMsg {
  private miniprogram_notice: QyMiniprogram

  constructor(
    miniprogramNotice: QyMiniprogram,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.MINIPROGRAM_NOTICE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.miniprogram_notice = miniprogramNotice
  }

  public get miniprogramNotice(): QyMiniprogram {
    return this.miniprogram_notice
  }

  public set miniprogramNotice(miniprogramNotice: QyMiniprogram) {
    this.miniprogram_notice = miniprogramNotice
  }
}

export class QyMiniprogram {
  private appid: string
  private page: string
  private title: string
  private description: string
  private emphasis_first_item: boolean
  private content_item: Array<QyKv>

  constructor(appId: string, title: string, contentTtem: Array<QyKv>, page?: string, description?: string, emphasisFirstItem?: boolean) {
    this.appid = appId
    this.title = title
    this.content_item = contentTtem
    this.page = page
    this.emphasis_first_item = emphasisFirstItem
    this.description = description
  }

  public set appId(appId: string) {
    this.appid = appId
  }

  public get appId(): string {
    return this.appid
  }

  public set setPage(page: string) {
    this.page = page
  }

  public get getPage(): string {
    return this.page
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getTitle(): string {
    return this.title
  }

  public set contentItem(contentItem: Array<QyKv>) {
    this.content_item = contentItem
  }

  public get contentItem(): Array<QyKv> {
    return this.content_item
  }

  public set setDescription(description: string) {
    this.description = description
  }

  public get getDescription(): string {
    return this.description
  }

  public set emphasisFirstItem(emphasisFirstItem: boolean) {
    this.emphasis_first_item = emphasisFirstItem
  }

  public get emphasisFirstItem(): boolean {
    return this.emphasis_first_item
  }
}

export class QyKv {
  private key: string
  private value: string

  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }

  public set setKey(key: string) {
    this.key = key
  }

  public get getKey() {
    return this.key
  }

  public set setValue(v: string) {
    this.value = v
  }

  public get getValue() {
    return this.value
  }
}
