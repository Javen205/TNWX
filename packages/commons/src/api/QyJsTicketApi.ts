/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取api_ticket
 */

import * as util from 'util'
import { IAccessTokenCache, QyApiConfigKit, AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'
import { JsTicket } from '../entity/JsTicket'

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
    let accessTokenCache: IAccessTokenCache = QyApiConfigKit.getAccessTokenCache
    let jsTicketJson = accessTokenCache.get(key)
    if (jsTicketJson) {
      if (QyApiConfigKit.isDevMode) {
        console.debug('缓存中获取api_ticket...')
      }
      return new JsTicket(jsTicketJson)
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
      let jsTicket: JsTicket = new JsTicket(data)
      let accessTokenCache: IAccessTokenCache = QyApiConfigKit.getAccessTokenCache
      accessTokenCache.set(key, jsTicket.getCacheJson)
      if (QyApiConfigKit.isDevMode) {
        console.debug('通过接口获取api_ticket...')
      }
      return jsTicket
    }
  }
}

export enum QyJsApiType {
  CORP = 'corp',
  AGENT = 'agent'
}
