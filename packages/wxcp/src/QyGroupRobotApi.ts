import { HttpKit } from '@tnwx/kits'
import { QyTextMsg } from './entity/QyTextMsg'
import { QyMarkDownMsg } from './entity/QyMarkDownMsg'
import { QyImageMsg } from './entity/QyImageMsg'
import { QyArticles, QyNewsMsg } from './entity/QyNewsMsg'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 群机器人
 */
export class QyGroupRobotApi {
  /**
   * 往群组推送消息
   * @param url webhook url
   * @param jsonData 请求数据
   */
  public static async send(url: string, jsonData: string) {
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }

  /**
   * 发送文本消息
   * @param url webhook 地址
   * @param text 文本消息对象 QyTextMsg
   */
  public static async sendTextMsg(url: string, text: QyTextMsg) {
    return this.send(url, JSON.stringify(text))
  }

  /**
   * 发送 markdown 消息
   * @param url webhook 地址
   * @param markdown markdown 消息对象 QyMarkDownMsg
   */
  public static async sendMarkDownMsg(url: string, markdown: QyMarkDownMsg) {
    return this.send(url, JSON.stringify(markdown))
  }

  /**
   * 发送图片消息
   * @param url webhook 地址
   * @param image 图片消息对象 QyImageMsg
   */
  public static async sendImageMsg(url: string, image: QyImageMsg) {
    return this.send(url, JSON.stringify(image))
  }

  /**
   * 发送图文消息
   * @param url webhook 地址
   * @param news 图文类型对象 QyNewsMsg
   */
  public static async sendNewsMsg(url: string, news: QyNewsMsg) {
    return this.send(url, JSON.stringify(news))
  }
}
