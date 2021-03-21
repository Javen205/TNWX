import * as util from 'util'
import { AccessToken } from '../AccessToken'
import { ApiConfig } from '../ApiConfig'
import { ICache } from '@tnwx/cache'
import { QyApiConfigKit } from './QyApiConfigKit'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信 AccessToken
 */
export class QyAccessTokenApi {
  static SEPARATOR: string = '_'
  private static url: string = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s'
  /**
   *  获取 acces_token
   *  1、先从缓存中获取，如果可用就直接返回
   *  2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token
   */
  public static async getAccessToken(): Promise<AccessToken> {
    let ac: ApiConfig = QyApiConfigKit.getApiConfig
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken(ac)
    if (accessToken) {
      if (QyApiConfigKit.isDevMode()) {
        console.debug('缓存中的 accesstoken')
      }
      return accessToken
    }
    if (QyApiConfigKit.isDevMode()) {
      console.debug('刷新 accesstoken')
    }
    return await this.refreshAccessToken(ac)
  }

  /**
   *  通过 appId 从缓存中获取 acces_token
   *  @param apiConfig
   */
  private static async getAvailableAccessToken(apiConfig: ApiConfig): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined
    let cache: ICache = QyApiConfigKit.getCache
    let accessTokenJson: string = await cache.get(apiConfig.getAppId.concat(this.SEPARATOR).concat(apiConfig.getCorpId))
    if (accessTokenJson) {
      result = new AccessToken(accessTokenJson)
    }
    if (result && result.isAvailable()) {
      return result
    } else {
      return undefined
    }
  }

  /**
   *  获取新的 acces_token 并设置缓存
   *  @param apiConfig
   */
  public static async refreshAccessToken(apiConfig: ApiConfig): Promise<AccessToken> {
    let url = util.format(this.url, apiConfig.getCorpId, apiConfig.getAppScrect)
    let data = await HttpKit.getHttpDelegate.httpGet(url)
    if (data) {
      data = JSON.stringify(data)
      let accessToken: AccessToken = new AccessToken(data)
      let cache: ICache = QyApiConfigKit.getCache
      cache.set(apiConfig.getAppId.concat(this.SEPARATOR).concat(apiConfig.getCorpId), accessToken.getCacheJson)
      return accessToken
    } else {
      throw new Error('获取 accessToken 异常')
    }
  }
}
