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
    agentId: string,
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

  constructor(content: string) {
    this.content = content
  }

  public set setContent(content: string) {
    this.content = content
  }

  public get getContent(): string {
    return this.content
  }
}
