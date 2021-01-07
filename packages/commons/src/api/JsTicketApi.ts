/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取api_ticket
 */

import * as util from 'util'
import { AccessToken, AccessTokenApi, ApiConfigKit } from '@tnwx/accesstoken'
import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { JsTicket } from '../entity/JsTicket'
import { JsApiType } from '../Enums'

export class JsTicketApi {
  private static getTicketUrl: string = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=%s'
  /**
   * 获取api_ticket
   * @param type
   * @param accessToken api_authorizer_token
   */
  public static async getTicket(type: JsApiType, accessToken?: AccessToken) {
    let appId = ApiConfigKit.getApiConfig.getAppId
    let key = appId + ':' + type
    // 从缓存中获取
    let cache: ICache = ApiConfigKit.getCache
    let jsTicketJson: string = await cache.get(key)
    const isAvailable = this.isAvailable(jsTicketJson)
    if (jsTicketJson && isAvailable) {
      if (ApiConfigKit.isDevMode) {
        console.debug('缓存中获取api_ticket...')
      }
      return new JsTicket(jsTicketJson)
    }
    // 通过接口获取
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getTicketUrl, accessToken.getAccessToken, type)
    let data = await HttpKit.getHttpDelegate.httpGet(url)
    if (data) {
      data = JSON.stringify(data)
      let jsTicket: JsTicket = new JsTicket(data)
      let cache: ICache = ApiConfigKit.getCache
      cache.set(key, jsTicket.getCacheJson)
      if (ApiConfigKit.isDevMode) {
        console.debug('通过接口获取api_ticket...')
      }
      return jsTicket
    }
  }

  /**
   * 检测jsTicket是否有效
   * @param jsTicketJson
   */
  public static isAvailable(jsTicketJson: string): boolean {
    if (!jsTicketJson) return false
    const ticket = JSON.parse(jsTicketJson)
    if (!ticket.expired_time) return false
    if (ticket.errcode) return false
    if (ticket.expired_time < new Date().getTime()) return false
    return ticket.access_token != null
  }
}
