import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信小程序、小游戏相关 API
 */

export class MiniProgramApi {
  private static checkSessionKeyUrl: string = 'https://api.weixin.qq.com/wxa/checksession?access_token=%s&signature=%s&openid=%s&sig_method=%s'

  /**
   * 校验服务器所保存的登录态 session_key 是否合法
   * @param openId 用户唯一标识符
   * @param signature 用户登录态签名
   * @param sigMethod 用户登录态签名的哈希方法
   */
  public static async checkSessionKey(openId: string, signature: string, sigMethod: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.checkSessionKeyUrl, (<AccessToken>accessToken).getAccessToken, signature, openId, sigMethod)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static code2SessionUrl: string = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'

  /**
   * @param appId 小程序 appId
   * @param secret 小程序 appSecret
   * @param jsCode 登录时获取的 code
   */
  public static async code2Session(appId: string, secret: string, jsCode: string) {
    let url = util.format(this.code2SessionUrl, appId, secret, jsCode)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static imgSecCheckUrl: string = 'https://api.weixin.qq.com/wxa/img_sec_check?access_token=%s'

  /**
   * 校验图片是否违规
   * @param imgPath 图片路径
   */
  public static async imgSecCheck(imgPath: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.imgSecCheckUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.upload(url, imgPath, '')
  }

  private static mediaCheckAsyncUrl: string = 'https://api.weixin.qq.com/wxa/media_check_async?access_token=%s'

  /**
   * 异步校验图片/音频是否违规
   * @param mediaUrl
   * @param mediaType
   */
  public static async mediaCheckAsync(mediaUrl: string, mediaType: MiniProgramMediaType) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.mediaCheckAsyncUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        media_url: mediaUrl,
        media_type: mediaType
      })
    )
  }

  private static msgSecCheckUrl: string = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=%s'

  /**
   * 校验文本是否违规
   * @param content
   */
  public static async msgSecCheck(content: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.msgSecCheckUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        content: content
      })
    )
  }
  private static removeUserStorageUrl: string = 'https://api.weixin.qq.com/wxa/remove_user_storage?access_token=%s&signature=%s&openid=%s&sig_method=%s'

  /**
   * 删除已经上报到微信的key-value数据
   * @param openId 用户唯一标识符
   * @param signature 用户登录态签名
   * @param sigMethod 用户登录态签名的哈希方法
   * @param key 要删除的数据key列表
   */
  public static async removeUserStorage(openId: string, signature: string, sigMethod: string, keys: string[]) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.removeUserStorageUrl, (<AccessToken>accessToken).getAccessToken, signature, openId, sigMethod)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        key: keys
      })
    )
  }

  private static setUserInteractiveDataUrl: string = 'https://api.weixin.qq.com/wxa/setuserinteractivedata?access_token=%s&signature=%s&openid=%s&sig_method=%s'

  /**
   * 写用户关系链互动数据存储
   * @param openId 用户唯一标识符
   * @param signature 用户登录态签名
   * @param sigMethod 用户登录态签名的哈希方法
   * @param kvList 要删除的数据列表 {"key":"1","value":0}
   */
  public static async setUserInteractiveData(openId: string, signature: string, sigMethod: string, kvList: []) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.setUserInteractiveDataUrl, (<AccessToken>accessToken).getAccessToken, signature, openId, sigMethod)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        kv_list: kvList
      })
    )
  }

  private static setUserStorageUrl: string = 'https://api.weixin.qq.com/wxa/set_user_storage?access_token=%s&signature=%s&openid=%s&sig_method=%s'

  /**
   * 写用户关系链互动数据存储
   * @param openId 用户唯一标识符
   * @param signature 用户登录态签名
   * @param sigMethod 用户登录态签名的哈希方法
   * @param kvList 要删除的数据列表 {"key":"1","value":0}
   */
  public static async setUserStorage(openId: string, signature: string, sigMethod: string, kvList: []) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.setUserStorageUrl, (<AccessToken>accessToken).getAccessToken, signature, openId, sigMethod)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        kv_list: kvList
      })
    )
  }

  private static createActivieyIdUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create?access_token=%s'

  /**
   * 创建被分享动态消息的 activity_id
   */
  public static async createActivityId() {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.createActivieyIdUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static setUpdatableMsgUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/updatablemsg/send?access_token=%s'

  /**
   * 修改被分享的动态消息
   *
   * @param activityId 动态消息的 ID
   * @param targetState 动态消息修改后的状态
   * @param templateInfo 动态消息对应的模板信息
   */
  public static async setUpdatableMsg(activityId: string, targetState: number, templateInfo: any) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.setUpdatableMsgUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        activity_id: activityId,
        target_state: targetState,
        template_info: templateInfo
      })
    )
  }

  private static createQRCodeUrl: string = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=%s'

  /**
   * 获取小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   *
   * @param path
   * @param width
   */
  public static async createQRCode(path: string, width: number = 430) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.createQRCodeUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        path: path,
        width: width
      }),
      {
        headers: { 'Content-type': 'application/json' },
        responseType: 'arraybuffer'
      }
    )
  }
  private static getWxAcodeUrl: string = 'https://api.weixin.qq.com/wxa/getwxacode?access_token=%s'

  /**
   * 获取小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   *
   * @param path
   * @param width
   * @param autoColor
   * @param lineColor
   * @param isHyaline
   */
  public static async getWxAcode(path: string, width: number = 430, autoColor: boolean = false, lineColor: object = { r: 0, g: 0, b: 0 }, isHyaline: boolean = false) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getWxAcodeUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        path: path,
        width: width,
        auto_color: autoColor,
        line_color: lineColor,
        is_hyaline: isHyaline
      }),
      {
        headers: { 'Content-type': 'application/json' },
        responseType: 'arraybuffer'
      }
    )
  }

  private static getUnlimitedUrl: string = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s'

  /**
   * 获取小程序二维码
   * 适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
   * @param scene
   * @param page
   * @param width
   * @param autoColor
   * @param lineColor
   * @param isHyaline
   */
  public static async getUnlimited(
    scene: string,
    page: string,
    width: number = 430,
    autoColor: boolean = false,
    lineColor: object = { r: 0, g: 0, b: 0 },
    isHyaline: boolean = false
  ) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getUnlimitedUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        scene: scene,
        page: page,
        width: width,
        auto_color: autoColor,
        line_color: lineColor,
        is_hyaline: isHyaline
      }),
      {
        headers: { 'Content-type': 'application/json' },
        responseType: 'arraybuffer'
      }
    )
  }

  private static sendSubscribeMsgUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s'

  /**
   * 发送订阅消息
   *
   * @param toUser 接收者（用户）的 openid
   * @param templateId 所需下发的订阅模板id
   * @param data 模板内容
   * @param page 跳转页面路径
   */
  public static async sendSubscribeMsg(toUser: string, templateId: string, data: any, page?: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.sendSubscribeMsgUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: toUser,
        template_id: templateId,
        page: page,
        data: data
      })
    )
  }

  private static getPaidUnionidByTransactionIdUrl: string = 'https://api.weixin.qq.com/wxa/getpaidunionid?access_token=%s&openid=%s&transaction_id=%s'

  /**
   * 用户支付完成后，获取该用户的 UnionId，无需用户授权
   * @param openId 支付用户唯一标识
   * @param transactionId 微信支付订单号
   */
  public static async getPaidUnionidByTransactionId(openId: string, transactionId: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getPaidUnionidByTransactionIdUrl, (<AccessToken>accessToken).getAccessToken, openId, transactionId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getPaidUnionidByMchIdUrl: string = 'https://api.weixin.qq.com/wxa/getpaidunionid?access_token=%s&openid=%s&mch_id=%s&out_trade_no=%s'

  /**
   * 用户支付完成后，获取该用户的 UnionId，无需用户授权
   * @param openId 支付用户唯一标识
   * @param mchId 微信支付商户号
   * @param outTradeNo 微信支付商户订单号
   */
  public static async getPaidUnionidByMchId(openId: string, mchId: string, outTradeNo: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getPaidUnionidByMchIdUrl, (<AccessToken>accessToken).getAccessToken, openId, mchId, outTradeNo)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static verifySoterSignatureUrl: string = 'https://api.weixin.qq.com/cgi-bin/soter/verify_signature?access_token=%s'

  /**
   * SOTER 生物认证秘钥签名验证
   * @param openId 用户 openid
   * @param jsonString 通过 wx.startSoterAuthentication 成功回调获得的 resultJSON 字段
   * @param jsonSignature 通过 wx.startSoterAuthentication 成功回调获得的 resultJSONSignature 字段
   */
  public static async verifySoterSignature(openId: string, jsonString: string, jsonSignature: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.verifySoterSignatureUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid: openId,
        json_string: jsonString,
        json_signature: jsonSignature
      })
    )
  }

  private static serviceMarketUrl: string = 'https://api.weixin.qq.com/wxa/servicemarket?access_token=%s'

  /**
   * 调用服务平台提供的服务
   * @param service 服务 ID
   * @param api 接口名
   * @param clientMsgId 随机字符串 ID，调用方请求的唯一标识
   * @param data 服务提供方接口数据
   */
  public static async serviceMarket(service: string, api: string, clientMsgId: string, data: any) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.serviceMarketUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        service: service,
        api: api,
        client_msg_id: clientMsgId,
        data: data
      })
    )
  }

  private static submitPagesUrl: string = 'https://api.weixin.qq.com/wxa/search/wxaapi_submitpages?access_token=%s'

  /**
   * 小程序开发者可以通过本接口提交小程序页面url及参数信息，
   * 让微信可以更及时的收录到小程序的页面信息，
   * 开发者提交的页面信息将可能被用于小程序搜索结果展示。
   * @param pages 小程序页面信息列表
   */
  public static async submitPages(pages: any) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.submitPagesUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        pages: pages
      })
    )
  }

  private static userLogSearchUrl: string = 'https://api.weixin.qq.com/wxaapi/userlog/userlog_search?access_token=%s&date=%s&begintime=%s&endtime=%s&start=%s&limit=%s'

  /**
   * 实时日志查询
   * @param date YYYYMMDD格式的日期，仅支持最近7天
   * @param begintime 开始时间，必须是date指定日期的时间
   * @param endtime 结束时间，必须是date指定日期的时间
   * @param start 开始返回的数据下标，用作分页，默认为0
   * @param limit 返回的数据条数，用作分页，默认为20
   * @param traceId 小程序启动的唯一ID，按TraceId查询会展示该次小程序启动过程的所有页面的日志。
   * @param path 小程序页面路径，例如pages/index/index
   * @param id 用户微信号或者OpenId
   * @param filterMsg 开发者通过setFileterMsg/addFilterMsg指定的filterMsg字段
   * @param level 日志等级，返回大于等于level等级的日志，level的定义为2（Info）、4（Warn）、8（Error），如果指定为4，则返回大于等于4的日志，即返回Warn和Error日志。
   */
  public static async userLogSearch(
    date: string,
    begintime: number,
    endtime: number,
    start = 0,
    limit = 20,
    traceId?: string,
    path?: string,
    id?: string,
    filterMsg?: string,
    level?: number
  ) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.userLogSearchUrl, (<AccessToken>accessToken).getAccessToken, date, begintime, endtime, start, limit)
    if (traceId) {
      url.concat('&traceId=').concat(traceId)
    }
    if (path) {
      url.concat('&url=').concat(path)
    }
    if (id) {
      url.concat('&id=').concat(id)
    }
    if (filterMsg) {
      url.concat('&filterMsg=').concat(filterMsg)
    }
    if (level) {
      url.concat('&level=').concat(level.toString())
    }
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}

export enum MiniProgramMediaType {
  VOICE = 1,
  IMG = 2
}
