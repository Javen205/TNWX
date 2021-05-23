import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 订阅通知接口
 */
export class ComSubscribeMsgApi {
  private static addTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/addtemplate?access_token=%s'
  private static delTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/deltemplate?access_token=%s'
  private static getCategoryUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getcategory?access_token=%s'
  private static getPubTemplateKeyWordsUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getpubtemplatekeywords?access_token=%s&tid=%s'
  private static getPubTemplateTitlesUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getpubtemplatetitles?access_token=%s&ids=%s&start=%s&limit=%s'
  private static getTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/gettemplate?access_token=%s'
  private static sendMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/bizsend?access_token=%s'

  /**
   * 组合模板并添加至帐号下的个人模板库
   * @param tid 模板标题 id
   * @param kidList 开发者自行组合好的模板关键词列表，最多支持5个，最少2个关键词组合
   * @param sceneDesc 服务场景描述，15个字以内
   */
  public static async addTemplate(tid: string, kidList: Array<Number>, sceneDesc?: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.addTemplateUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tid: tid,
        kidList: kidList,
        sceneDesc: sceneDesc
      })
    )
  }

  /**
   * 删除帐号下的个人模板
   * @param priTmplId 要删除的模板id
   */
  public static async delTemplate(priTmplId: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.delTemplateUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        priTmplId: priTmplId
      })
    )
  }

  /**
   * 获取公众号类目
   */
  public static async getCategory() {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getCategoryUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }


  /**
   * 获取模板中的关键词
   * @param tid 模板标题 id
   */
  public static async getPubTemplateKeyWords(tid: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getPubTemplateKeyWordsUrl, (<AccessToken>accessToken).getAccessToken, tid)
    return HttpKit.getHttpDelegate.httpGet(url)
  }


  /**
   * 获取类目下的公共模板
   * @param ids 类目 id
   * @param start 用于分页，表示从 start 开始。从 0 开始计数。
   * @param limit 用于分页，表示拉取 limit 条记录。最大为 30。
   */
  public static async getPubTemplateTitles(ids: Array<Number>, start = 0, limit = 30) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getPubTemplateTitlesUrl, (<AccessToken>accessToken).getAccessToken, ids.join(','), start, limit)
    return HttpKit.getHttpDelegate.httpGet(url)
  }


  /**
   * 获取私有模板列表
   */
  public static async getTemplate() {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.getTemplateUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }


  /**
   * 发送订阅通知
   * @param touser 接收者（用户）的 openid
   * @param templateId 所需下发的订阅模板id
   * @param data 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
   * @param page 点击模板卡片后的跳转页面
   * @param miniprogram 跳转小程序时填写，格式如{ "appid": "pagepath": { "value": any } }
   */
  public static async sendSubMessage(touser: string, templateId: string, data: any, page?: string, miniprogram?: any) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.sendMessageUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: touser,
        template_id: templateId,
        page: page,
        data: data,
        miniprogram: miniprogram
      })
    )
  }
}
