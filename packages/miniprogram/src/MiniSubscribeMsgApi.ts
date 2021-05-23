import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { ComSubscribeMsgApi } from '@tnwx/commons'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 小程序订阅消息相关 API
 */
export class MiniSubscribeMsgApi {

  /**
   * 组合模板并添加至帐号下的个人模板库
   * @param tid 模板标题 id
   * @param kidList 开发者自行组合好的模板关键词列表，最多支持5个，最少2个关键词组合
   * @param sceneDesc 服务场景描述，15个字以内
   */
  public static async addTemplate(tid: string, kidList: Array<Number>, sceneDesc?: string) {
    ComSubscribeMsgApi.addTemplate(tid, kidList, sceneDesc)
  }

  /**
   * 删除帐号下的个人模板
   * @param priTmplId 要删除的模板id
   */
  public static async delTemplate(priTmplId: string) {
    ComSubscribeMsgApi.delTemplate(priTmplId)
  }

  /**
   * 获取小程序账号的类目
   */
  public static async getCategory() {
    ComSubscribeMsgApi.getCategory()
  }

  /**
   * 获取模板标题下的关键词列表
   * @param tid 模板标题 id
   */
  public static async getPubTemplateKeyWords(tid: string) {
    ComSubscribeMsgApi.getPubTemplateKeyWords(tid)
  }

  /**
   * 获取帐号所属类目下的公共模板标题
   * @param ids 类目 id
   * @param start 用于分页，表示从 start 开始。从 0 开始计数。
   * @param limit 用于分页，表示拉取 limit 条记录。最大为 30。
   */
  public static async getPubTemplateTitles(ids: Array<Number>, start = 0, limit = 30) {
    ComSubscribeMsgApi.getPubTemplateTitles(ids, start, limit)
  }

  /**
   * 获取当前帐号下的个人模板列表
   */
  public static async getTemplate() {
    ComSubscribeMsgApi.getTemplate()
  }

  private static sendMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s'

  /**
   * 发送订阅消息
   * @param touser 接收者（用户）的 openid
   * @param templateId 所需下发的订阅模板id
   * @param data 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
   * @param miniprogramState 跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
   * @param lang 进入小程序查看的语言类型，支持zh_CN(简体中文)、en_US(英文)、zh_HK(繁体中文)、zh_TW(繁体中文)，默认为zh_CN
   * @param page 点击模板卡片后的跳转页面
   */
  public static async sendSubMessage(touser: string, templateId: string, data: any, miniprogramState = 'formal', lang = 'zh_CN', page?: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.sendMessageUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: touser,
        template_id: templateId,
        page: page,
        miniprogram_state: miniprogramState,
        lang: lang,
        data: data
      })
    )
  }
}
