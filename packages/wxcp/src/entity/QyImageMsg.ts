import { QyBaseMsg, QyMediaId } from './QyBaseMsg'
import { QySendMessageType } from '../QySendMsgApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 图片消息
 */
export class QyImageMsg extends QyBaseMsg {
  private image: QyMediaId | QyImage

  constructor(
    image: QyMediaId | QyImage,
    agentId?: string,
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

  public get getImage(): QyMediaId | QyImage {
    return this.image
  }

  public set setImage(image: QyMediaId | QyImage) {
    this.image = image
  }
}

export class QyImage {
  private base64: string
  private md5: string

  constructor(base64: string, md5: string) {
    this.base64 = base64
    this.md5 = md5
  }

  public set setBase64(base64: string) {
    this.base64 = base64
  }

  public get getBase64(): string {
    return this.base64
  }
  public set setMd5(md5: string) {
    this.md5 = md5
  }

  public get getMd5(): string {
    return this.md5
  }
}
