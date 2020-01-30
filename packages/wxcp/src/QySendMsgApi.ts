import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'

import { QyFileMsg } from './entity/QyFileMsg'
import { QyVideoMsg } from './entity/QyVideoMsg'
import { QyTextMsg } from './entity/QyTextMsg'
import { QyImageMsg } from './entity/QyImageMsg'
import { QyVoiceMsg } from './entity/QyVoiceMsg'
import { QyTextCardMsg } from './entity/QyTextCardMsg'
import { QyNewsMsg } from './entity/QyNewsMsg'
import { QyMpNewsMsg } from './entity/QyMpNewsMsg'
import { QyTaskCardMsg } from './entity/QyTaskCardMsg'
import { QyMiniProgramNoticeMsg } from './entity/QyMiNiProgramNoticeMsg'
import { QyMarkDownMsg } from './entity/QyMarkDownMsg'

export class QySendMsgApi {
  private static sendMessageUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s'
  /**
   * 发送应用消息
   * @param {string} jsonStr
   */
  public static async sendMessage(jsonStr: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.sendMessageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  /**
   * 发送文本消息
   * @param {QyTextMsg} text
   */
  public static async sendTextMessage(text: QyTextMsg) {
    return this.sendMessage(JSON.stringify(text))
  }

  /**
   * 发送图片消息
   * @param {QyImageMsg} image
   */
  public static async sendImageMessage(image: QyImageMsg) {
    return this.sendMessage(JSON.stringify(image))
  }

  /**
   * 发送语音消息
   * @param voice
   */
  public static async sendVoiceMessage(voice: QyVoiceMsg) {
    return this.sendMessage(JSON.stringify(voice))
  }

  /**
   * 发送视频消息
   * @param video
   */
  public static async sendVideoMessage(video: QyVideoMsg) {
    return this.sendMessage(JSON.stringify(video))
  }
  /**
   * 发送文件消息
   * @param file
   */
  public static async sendFileMessage(file: QyFileMsg) {
    return this.sendMessage(JSON.stringify(file))
  }

  /**
   * 文本卡片消息
   * @param textCard
   */
  public static async sendTextCardMessage(textCard: QyTextCardMsg) {
    return this.sendMessage(JSON.stringify(textCard))
  }

  /**
   * 图文消息
   * @param news
   */
  public static async sendNewsMessage(news: QyNewsMsg) {
    return this.sendMessage(JSON.stringify(news))
  }

  /**
   * 图文消息
   * @param mpnews
   */
  public static async sendMpNewsMessage(mpnews: QyMpNewsMsg) {
    return this.sendMessage(JSON.stringify(mpnews))
  }

  /**
   * markdown 消息
   * @param markdown
   */
  public static async sendMarkDownMessage(markdown: QyMarkDownMsg) {
    return this.sendMessage(JSON.stringify(markdown))
  }

  /**
   * 小程序通知消息
   * @param miniprogramNotice
   */
  public static async sendMiniprogramNoticeMessage(miniprogramNotice: QyMiniProgramNoticeMsg) {
    return this.sendMessage(JSON.stringify(miniprogramNotice))
  }

  /**
   * 任务卡片消息
   * @param taskCard
   */
  public static async sendTaskCardMessage(taskCard: QyTaskCardMsg) {
    return this.sendMessage(JSON.stringify(taskCard))
  }
}

export enum QySendMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  FILE = 'file',
  TEXTCARD = 'textcard',
  NEWS = 'news',
  MPNEWS = 'mpnews',
  MARKDOWN = 'markdown',
  MINIPROGRAM_NOTICE = 'miniprogram_notice',
  TASKCARD = 'taskcard'
}
