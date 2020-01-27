import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 小程序客服消息相关 API
 */
export class MiniCustomerMsgApi {
  private static getTempMediaUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s'
  /**
   * 获取客服消息内的临时素材。即下载临时的多媒体文件。目前小程序仅支持下载图片文件
   * @param mediaId 媒体文件 ID
   */
  public static async getTempMedia(mediaId: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getTempMediaUrl, (<AccessToken>accessToken).getAccessToken, mediaId)
    return HttpKit.getHttpDelegate.httpGetWitchOptions(url, {
      headers: { 'Content-type': 'application/json' },
      responseType: 'arraybuffer'
    })
  }

  private static sendUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'

  /**
   * 发送客服消息给用户
   * @param openId 用户的 openId
   * @param msgType 消息类型
   * @param data 消息对应的数据
   */
  public static async send(openId: string, msgType: MiniCSRMsgType, data?: object) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.sendUrl, (<AccessToken>accessToken).getAccessToken)
    let obj = {
      touser: openId,
      msgtype: msgType,
      text: null,
      image: null,
      link: null,
      miniprogrampage: null
    }
    if (msgType === MiniCSRMsgType.TEXT) obj.text = data
    if (msgType === MiniCSRMsgType.IMAGE) obj.image = data
    if (msgType === MiniCSRMsgType.LINK) obj.link = data
    if (msgType === MiniCSRMsgType.MINIPROGRAMPAGE) obj.miniprogrampage = data
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(obj))
  }

  private static setTypingUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=%s'

  /**
   * 下发客服当前输入状态给用户
   * @param openId 用户的 openId
   * @param command 命令
   */
  public static async setTyping(openId: string, command: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.setTypingUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: openId,
        command: command
      })
    )
  }

  private static uploadUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s'

  /**
   * 新增临时素材
   * @param filePath 文件路径
   * @param mediaType 文件类型
   */
  public static async uploadMedia(filePath: string, mediaType: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.uploadUrl, accessToken.getAccessToken, mediaType)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }
}

export enum MiniCSRMsgType {
  TEXT,
  IMAGE,
  LINK,
  MINIPROGRAMPAGE
}
