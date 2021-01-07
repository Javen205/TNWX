import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 模板消息
 */
export class TemplateApi {
  public static sendTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=%s'
  private static setIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=%s'
  private static getIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=%s'
  private static getTemplateIdUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=%s'
  private static delTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/del_private_template?access_token=%s'
  private static getAllTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=%s'

  /**
   * 发送模板消息
   * @param tempJson 模板消息JSON数据
   * @param accessToken 接口调用凭证
   */
  public static async send(tempJson: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.sendTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, tempJson)
  }

  /**
   * 设置所属行业
   * @param industry_id1 公众号模板消息所属行业编号
   * @param industry_id2 公众号模板消息所属行业编号
   * @param accessToken 接口调用凭证
   */
  public static async setIndustry(industry_id1: string, industry_id2: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.setIndustryUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        industry_id1: industry_id1,
        industry_id2: industry_id2
      })
    )
  }
  /**
   * 获取设置的行业信息
   * @param accessToken 接口调用凭证
   */
  public static async getIndustry(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getIndustryUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 获取模板列表
   * @param templateIdShort 模板库中模板的编号
   * @param accessToken 接口调用凭证
   */
  public static async getTemplateId(templateIdShort: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getTemplateIdUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id_short: templateIdShort
      })
    )
  }

  /**
   * 删除模板
   * @param templateId 公众帐号下模板消息ID
   * @param accessToken 接口调用凭证
   */
  public static async delTemplate(templateId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
      template_id: templateId
    }))
  }

  /**
   * 获取模板列表
   * @param accessToken 接口调用凭证
   */
  public static async getAllTemplate(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getAllTemplateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
