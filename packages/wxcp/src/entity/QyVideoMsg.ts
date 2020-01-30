import { QyBaseMsg, QyMediaId } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 视频消息
 */
export class QyVideoMsg extends QyBaseMsg {
  private video: QyVideo

  constructor(
    video: QyVideo,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(QySendMessageType.VIDEO, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.video = video
  }

  public get getVideo(): QyVideo {
    return this.video
  }

  public set setVideo(video: QyVideo) {
    this.video = video
  }
}

export class QyVideo extends QyMediaId {
  private title: string
  private description: string

  constructor(mediaId: string, title: string, description: string) {
    super(mediaId)
    this.title = title
    this.description = description
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getTitle(): string {
    return this.title
  }

  public get getDescription(): string {
    return this.description
  }

  public set setDescription(description: string) {
    this.description = description
  }
}
