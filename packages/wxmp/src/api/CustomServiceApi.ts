import * as util from 'util'
import { AccessToken, AccessTokenApi, ApiConfigKit } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'
import { Article, MenuMsg } from '@tnwx/commons'

export class CustomServiceApi {
  private static addKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/add?access_token=%s'
  private static updateKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/update?access_token=%s'
  private static delKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/del?access_token=%s&kf_account=%s'
  private static getKfListUrl: string = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=%s'
  private static customMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'
  private static typingUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=%s'
  private static uploadKfHeadImgUrl: string = 'http://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=%s&kf_account=%s'

  private static inviteUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/inviteworker?access_token=%s'
  private static getOnlineUrl: string = 'https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token=%s'

  /**
   * 邀请绑定客服帐号
   * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
   * @param inviteWx 接收绑定邀请的客服微信号
   */
  public static async inviteWorker(kf_account: string, inviteWx: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.inviteUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        kf_account: kf_account,
        invite_wx: inviteWx
      })
    )
  }
  /**
   * 获取在线客服
   */
  public static async getOnlineKfList() {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getOnlineUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
  /**
   * 添加客服帐号
   * @param response
   * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信
   * @param nickname 客服昵称，最长6个汉字或12个英文字符
   * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
   */
  public static async addKfAccount(kf_account: string, nickname: string, password: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.addKfAccountUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        kf_account: kf_account,
        nickname: nickname,
        password: password
      })
    )
  }
  /**
   * 修改客服帐号
   * @param response
   * @param kf_account
   * @param nickname
   * @param password
   */
  public static async updateKfAccount(kf_account: string, nickname: string, password: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.updateKfAccountUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        kf_account: kf_account,
        nickname: nickname,
        password: password
      })
    )
  }

  /**
   * 删除客服帐号
   * @param response
   * @param kf_account
   */
  public static async delKfAccount(kf_account: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.delKfAccountUrl, accessToken.getAccessToken, kf_account)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
  /**
   * 设置客服帐号的头像
   * @param response
   * @param kf_account
   * @param filePath 头像图片文件必须是jpg格式，推荐使用640*640大小的图片以达到最佳效果
   */
  public static async uploadKfAccountHeadImg(kf_account: string, filePath: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.uploadKfHeadImgUrl, accessToken.getAccessToken, kf_account)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }

  /**
   * 获取所有客服账号
   * @param response
   */
  public static async getKfList(response: any) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getKfListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 发送客服消息
   * @param response
   * @param json 各种消息的JSON数据包
   * @param kf_account 以某个客服帐号来发消息
   */
  public static async sendMsg(msgObj: any, kf_account?: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.customMessageUrl, accessToken.getAccessToken)
    let json: string = ''
    if (kf_account) {
      msgObj.customservice = {
        kf_account: kf_account
      }
    }
    json = JSON.stringify(msgObj)
    if (ApiConfigKit.isDevMode) {
      console.debug(`发送客服消息JSON ${json}`)
    }
    return HttpKit.getHttpDelegate.httpPost(url, json)
  }
  /**
   * 发送文本客服消息
   * @param response
   * @param openId
   * @param text
   */
  public static async sendText(openId: string, text: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'text',
        text: {
          content: text
        }
      },
      kf_account
    )
  }
  /**
   * 发送图片消息
   * @param response
   * @param openId
   * @param text
   */
  public static async sendImage(openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'image',
        image: {
          media_id: media_id
        }
      },
      kf_account
    )
  }
  /**
   * 发送语音消息
   * @param response
   * @param openId
   * @param media_id
   */
  public static async sendVoice(openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'voice',
        voice: {
          media_id: media_id
        }
      },
      kf_account
    )
  }
  /**
   * 发送视频消息
   * @param response
   * @param openId
   * @param media_id
   * @param title
   * @param description
   */
  public static async sendVideo(openId: string, media_id: string, title: string, description: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'video',
        video: {
          media_id: media_id,
          title: title,
          description: description
        }
      },
      kf_account
    )
  }
  /**
   * 发送音乐消息
   * @param response
   * @param openId
   * @param title
   * @param description
   * @param musicurl
   * @param hqmusicurl
   * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
   */
  public static async sendMusic(openId: string, title: string, description: string, musicurl: string, hqmusicurl: string, thumb_media_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'music',
        music: {
          title: title,
          description: description,
          musicurl: musicurl,
          hqmusicurl: hqmusicurl,
          thumb_media_id: thumb_media_id
        }
      },
      kf_account
    )
  }
  /**
   * 发送图文消息
   * @param response
   * @param openId
   * @param articles
   */
  public static async sendNews(openId: string, articles: Article[], kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'news',
        news: {
          articles: articles
        }
      },
      kf_account
    )
  }
  /**
   * 发送图文消息（点击跳转到图文消息页面）
   * @param response
   * @param openId
   * @param media_id
   */
  public static async sendMpNews(openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'mpnews',
        mpnews: {
          media_id: media_id
        }
      },
      kf_account
    )
  }
  /**
   * 发送菜单消息
   * @param response
   * @param openId
   * @param head_content
   * @param list
   * @param tail_content
   */
  public static async sendMenu(openId: string, head_content: string, list: MenuMsg[], tail_content: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'msgmenu',
        msgmenu: {
          head_content: head_content,
          list: list,
          tail_content: tail_content
        }
      },
      kf_account
    )
  }
  /**
   * 发送卡券
   * @param response
   * @param openId
   * @param card_id
   */
  public static async sendCoupon(openId: string, card_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'wxcard',
        wxcard: {
          card_id: card_id
        }
      },
      kf_account
    )
  }
  /**
   * 发送小程序卡片（要求小程序与公众号已关联）
   * @param response
   * @param openId
   * @param title
   * @param appid
   * @param pagepath
   * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
   */
  public static async sendMiniProgramPage(openId: string, title: string, appid: string, pagepath: string, thumb_media_id: string, kf_account?: string) {
    return this.sendMsg(
      {
        touser: openId,
        msgtype: 'miniprogrampage',
        miniprogrampage: {
          title: title,
          appid: appid,
          pagepath: pagepath,
          thumb_media_id: thumb_media_id
        }
      },
      kf_account
    )
  }

  /**
   * 客服输入状态
   * @param response
   * @param openId
   * @param command "Typing"：对用户下发“正在输入"状态,"CancelTyping"：取消对用户的”正在输入"状态
   */
  public static async sendTyping(openId: string, command: string) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.typingUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: openId,
        command: command
      })
    )
  }
}
