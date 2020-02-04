import { QyBaseMsg } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'
import { QyText } from './QyTextMsg'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description markdown 消息
 */
export class QyMarkDownMsg extends QyBaseMsg {
  private markdown: QyText

  constructor(
    markdown: QyText,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.MARKDOWN, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.markdown = markdown
  }

  public get markDown(): QyText {
    return this.markdown
  }

  public set markDown(markdown: QyText) {
    this.markdown = markdown
  }
}
