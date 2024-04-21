/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取api_ticket
 */

import * as util from 'util'
import { QyApiConfigKit, AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { JsTicket } from '../entity/JsTicket'
import { QyJsApiType } from '../Enums'

export class QyJsTicketApi {
  private static getCorpTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=%s'
  private static getAgentTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=%s&type=agent_config'
  /**
   * 获取api_ticket
   * @param type
   */
  public static async getTicket(type: QyJsApiType) {
    let appId = QyApiConfigKit.getApiConfig.getAppId
    let corpId = QyApiConfigKit.getApiConfig.getCorpId
    let key = appId
      .concat(':')
      .concat(corpId)
      .concat(':')
      .concat(type)
    // 从缓存中获取
    let cache: ICache = QyApiConfigKit.getCache
    let jsTicketJson: string = await cache.get(key)
    if (this.isAvailable(jsTicketJson)) {
      if (QyApiConfigKit.isDevMode) {
        console.debug('缓存中获取api_ticket...')
      }
      return new JsTicket(jsTicketJson)
    } 

    // 缓存存在且过期做清除处理
    if (jsTicketJson) {
      cache.remove(key)
    }

    // 通过接口获取
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url: string
    if (type === QyJsApiType.CORP) {
      url = util.format(this.getCorpTicketUrl, accessToken.getAccessToken)
    } else {
      url = util.format(this.getAgentTicketUrl, accessToken.getAccessToken)
    }
    let data = await HttpKit.getHttpDelegate.httpGet(url)
    if (data) {
      data = JSON.stringify(data)
      let jsTicket: JsTicket = new JsTicket(data)
      let cache: ICache = QyApiConfigKit.getCache
      cache.set(key, jsTicket.getCacheJson)
      if (QyApiConfigKit.isDevMode()) {
        console.debug('通过接口获取api_ticket...')
      }
      return jsTicket
    }
  }
  /**
   * 检测jsTicket是否有效
   * @param jsTicketJson
   */
   public static isAvailable (jsTicketJson: string): boolean {
     try {
       const ticket = JSON.parse(jsTicketJson)
       if (!ticket.expired_time) return false
       if (ticket.errcode) return false
       if (ticket.expired_time < new Date().getTime()) return false
       return ticket.access_token != null
     } catch (e) {
       // 处理 jsTicketJson = '' 或其他非法情况
       return false
     }
  }
}
