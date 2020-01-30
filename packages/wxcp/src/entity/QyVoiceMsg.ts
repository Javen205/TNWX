import { QyBaseMsg, QyMediaId } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 语音消息
 */
export class QyVoiceMsg extends QyBaseMsg {
  private voice: QyMediaId

  constructor(
    voice: QyMediaId,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.VOICE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.voice = voice
  }

  public get getVoice(): QyMediaId {
    return this.voice
  }

  public set setVoice(voice: QyMediaId) {
    this.voice = voice
  }
}
