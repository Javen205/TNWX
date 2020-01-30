import { QyBaseMsg, QyMediaId } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 图片消息
 */
export class QyImageMsg extends QyBaseMsg {
  private image: QyMediaId

  constructor(
    image: QyMediaId,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.IMAGE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.image = image
  }

  public get getImage(): QyMediaId {
    return this.image
  }

  public set setImage(image: QyMediaId) {
    this.image = image
  }
}
