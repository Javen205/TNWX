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
import { QyMiNiProgramNoticeMsg } from './entity/QyMiNiProgramNoticeMsg'
import { QyMarkDownMsg } from './entity/QyMarkDownMsg'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 主动发送消息
 */
export class QySendMsgApi {
  private static getStatisticsUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/get_statistics?access_token=%s'

  /**
   * 查询应用消息发送统计
   * @param timeType 查询哪天的数据，0：当天；1：昨天。默认为0
   */
  public static async getTatistics(timeType = 0) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getStatisticsUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        time_type: timeType
      })
    )
  }

  private static sendMessageUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s'

  /**
   * 发送应用消息
   * @param {string} jsonStr
   * @param accessToken
   */
  public static async sendMessage(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.sendMessageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  /**
   * 发送文本消息
   * @param {QyTextMsg} text
   * @param accessToken
   */
  public static async sendTextMessage(text: QyTextMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(text), accessToken)
  }

  /**
   * 发送图片消息
   * @param {QyImageMsg} image
   * @param accessToken
   */
  public static async sendImageMessage(image: QyImageMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(image), accessToken)
  }

  /**
   * 发送语音消息
   * @param voice
   * @param accessToken
   */
  public static async sendVoiceMessage(voice: QyVoiceMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(voice), accessToken)
  }

  /**
   * 发送视频消息
   * @param video
   * @param accessToken
   */
  public static async sendVideoMessage(video: QyVideoMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(video), accessToken)
  }
  /**
   * 发送文件消息
   * @param file
   * @param accessToken
   */
  public static async sendFileMessage(file: QyFileMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(file), accessToken)
  }

  /**
   * 文本卡片消息
   * @param textCard
   * @param accessToken
   */
  public static async sendTextCardMessage(textCard: QyTextCardMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(textCard), accessToken)
  }

  /**
   * 图文消息
   * @param news
   * @param accessToken
   */
  public static async sendNewsMessage(news: QyNewsMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(news), accessToken)
  }

  /**
   * 图文消息
   * @param mpnews
   * @param accessToken
   */
  public static async sendMpNewsMessage(mpnews: QyMpNewsMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(mpnews), accessToken)
  }

  /**
   * markdown 消息
   * @param markdown
   * @param accessToken
   */
  public static async sendMarkDownMessage(markdown: QyMarkDownMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(markdown), accessToken)
  }

  /**
   * 小程序通知消息
   * @param miniprogramNotice
   * @param accessToken
   */
  public static async sendMiniprogramNoticeMessage(miniprogramNotice: QyMiNiProgramNoticeMsg, accessToken?: AccessToken) {
    return this.sendMessage(JSON.stringify(miniprogramNotice), accessToken)
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
