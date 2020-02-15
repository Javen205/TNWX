import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
import { QyTextMsg, QyImageMsg, QyVoiceMsg, QyVideoMsg, QyFileMsg, QyTextCardMsg, QyNewsMsg, QyMpNewsMsg, QyMarkDownMsg } from '.'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 群聊
 */
export class QyAppChatApi {
  private static createUrl = 'https://qyapi.weixin.qq.com/cgi-bin/appchat/create?access_token=%s'
  /**
   * 创建群聊会话
   * @param userList 群成员id列表。至少2人，至多500人
   * @param owner 指定群主的id。如果不指定，系统会随机从userlist中选一人作为群主
   * @param name 群聊名，最多50个utf8字符，超过将截断
   * @param chatId 群聊的唯一标志，不能与已有的群重复；字符串类型，最长32个字符。只允许字符0-9及字母a-zA-Z。如果不填，系统会随机生成群id
   */
  public static async create(userList: Array<string>, owner?: string, name?: string, chatId?: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.createUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userlist: userList,
        name: name,
        owner: owner,
        chatid: chatId
      })
    )
  }

  private static updateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/appchat/update?access_token=%s'

  /**
   * 修改群聊会话
   * @param chatId 群聊id
   * @param addUserList 添加成员的id列表
   * @param delUserList 踢出成员的id列表
   * @param owner 新群主的id
   * @param name 新的群聊名
   */
  public static async update(chatId: string, addUserList?: Array<string>, delUserList?: Array<string>, owner?: string, name?: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        chatid: chatId,
        add_user_list: addUserList,
        del_user_list: delUserList,
        name: name,
        owner: owner
      })
    )
  }

  private static getUrl = 'https://qyapi.weixin.qq.com/cgi-bin/appchat/get?access_token=%s&chatid=%s'

  /**
   * 获取群聊会话
   * @param chatId 群聊id
   */
  public static async get(chatId: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getUrl, accessToken.getAccessToken, chatId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static sendUrl = 'https://qyapi.weixin.qq.com/cgi-bin/appchat/send?access_token=%s'

  /**
   * 应用推送消息
   * @param jsonData 请求数据
   */
  public static async send(jsonData: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.sendUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }
  private static sendLinkedCorpUrl = 'https://qyapi.weixin.qq.com/cgi-bin/linkedcorp/message/send?access_token=%s'

  /**
   * 互联企业消息推送
   * @param jsonData 请求数据
   */
  public static async sendLinkedCorpMsg(jsonData: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.sendLinkedCorpUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }

  /**
   * 发送文本消息
   * @param {QyTextMsg} text
   */
  public static async sendTextMessage(text: QyTextMsg) {
    return this.send(JSON.stringify(text))
  }

  /**
   * 发送图片消息
   * @param {QyImageMsg} image
   */
  public static async sendImageMessage(image: QyImageMsg) {
    return this.send(JSON.stringify(image))
  }

  /**
   * 发送语音消息
   * @param voice
   */
  public static async sendVoiceMessage(voice: QyVoiceMsg) {
    return this.send(JSON.stringify(voice))
  }

  /**
   * 发送视频消息
   * @param video
   */
  public static async sendVideoMessage(video: QyVideoMsg) {
    return this.send(JSON.stringify(video))
  }
  /**
   * 发送文件消息
   * @param file
   */
  public static async sendFileMessage(file: QyFileMsg) {
    return this.send(JSON.stringify(file))
  }

  /**
   * 文本卡片消息
   * @param textCard
   */
  public static async sendTextCardMessage(textCard: QyTextCardMsg) {
    return this.send(JSON.stringify(textCard))
  }

  /**
   * 图文消息
   * @param news
   */
  public static async sendNewsMessage(news: QyNewsMsg) {
    return this.send(JSON.stringify(news))
  }

  /**
   * 图文消息
   * @param mpnews
   */
  public static async sendMpNewsMessage(mpnews: QyMpNewsMsg) {
    return this.send(JSON.stringify(mpnews))
  }

  /**
   * markdown 消息
   * @param markdown
   */
  public static async sendMarkDownMessage(markdown: QyMarkDownMsg) {
    return this.send(JSON.stringify(markdown))
  }
}
