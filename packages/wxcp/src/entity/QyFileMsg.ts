import { QyBaseMsg, QyMediaId } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 文件消息
 */
export class QyFileMsg extends QyBaseMsg {
  private file: QyMediaId

  constructor(
    file: QyMediaId,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.FILE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.file = file
  }

  public get getFile(): QyMediaId {
    return this.file
  }

  public set setFile(file: QyMediaId) {
    this.file = file
  }
}
