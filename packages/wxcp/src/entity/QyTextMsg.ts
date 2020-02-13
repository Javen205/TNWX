import { QyBaseMsg } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 文本消息
 */
export class QyTextMsg extends QyBaseMsg {
  private text: QyText

  constructor(
    text: QyText,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.TEXT, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.text = text
  }

  public get getText(): QyText {
    return this.text
  }

  public set setText(text: QyText) {
    this.text = text
  }
}

export class QyText {
  private content: string
  private mentioned_list: Array<string>
  private mentioned_mobile_list: Array<string>

  constructor(content: string, mentionedList?: Array<string>, mentionedMobileList?: Array<string>) {
    this.content = content
    this.mentioned_list = mentionedList
    this.mentioned_mobile_list = mentionedMobileList
  }

  public set setContent(content: string) {
    this.content = content
  }

  public get getContent(): string {
    return this.content
  }

  public set mentionedList(mentioned_list: Array<string>) {
    this.mentioned_list = mentioned_list
  }

  public get mentionedList(): Array<string> {
    return this.mentioned_list
  }

  public set mentionedMobileList(mentionedMobileList: Array<string>) {
    this.mentioned_mobile_list = mentionedMobileList
  }

  public get mentionedMobileList(): Array<string> {
    return this.mentioned_mobile_list
  }
}
