import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, AccessTokenType } from '../AccessToken'
import { ApiConfig } from '../ApiConfig'
import { QyApiConfigKit } from '../wxcp/QyApiConfigKit'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信开发平台 AccessToken
 */
export class OpenCpAccessTokenApi {
  private static getProviderTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_provider_token'
  private static getSuiteTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token'
  /**
   * 获取 acces_token
   * 1、先从缓存中获取，如果可用就直接返回
   * 2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token
   * @param tokenType
   */
  public static async getAccessToken(tokenType = AccessTokenType.PROVIDER_TOKEN): Promise<AccessToken> {
    let ac: ApiConfig = QyApiConfigKit.getApiConfig
    let accessToken: AccessToken | undefined = this.getAvailableAccessToken(ac, tokenType)
    if (accessToken) {
      if (QyApiConfigKit.isDevMode) {
        console.debug('缓存中的 accesstoken')
      }
      return accessToken
    }
    if (QyApiConfigKit.isDevMode) {
      console.debug('刷新 accesstoken')
    }
    return await this.refreshAccessToken(ac, tokenType)
  }

  /**
   * 获取可用的 AccessToken
   * @param apiConfig
   * @param tokenType
   */
  private static getAvailableAccessToken(apiConfig: ApiConfig, tokenType = AccessTokenType.PROVIDER_TOKEN): AccessToken | undefined {
    let result: AccessToken | undefined
    let cache: ICache = QyApiConfigKit.getCache

    let accessTokenJson: string

    if (tokenType === AccessTokenType.PROVIDER_TOKEN) {
      accessTokenJson = cache.get(apiConfig.getCorpId.concat('_').concat(tokenType))
    } else {
      accessTokenJson = cache.get(apiConfig.getAppId.concat('_').concat(tokenType))
    }

    if (accessTokenJson) {
      result = new AccessToken(accessTokenJson, tokenType)
    }
    if (result && result.isAvailable()) {
      return result
    } else {
      return undefined
    }
  }

  /**
   * 获取新的 acces_token 并设置缓存
   * @param apiConfig
   * @param tokenType
   */
  public static async refreshAccessToken(apiConfig: ApiConfig, tokenType = AccessTokenType.PROVIDER_TOKEN): Promise<AccessToken> {
    let data: string
    if (tokenType === AccessTokenType.PROVIDER_TOKEN) {
      data = await HttpKit.getHttpDelegate.httpPost(
        this.getProviderTokenUrl,
        JSON.stringify({
          corpid: apiConfig.getCorpId,
          provider_secret: apiConfig.getAppScrect
        })
      )
    } else {
      data = await HttpKit.getHttpDelegate.httpPost(
        this.getSuiteTokenUrl,
        JSON.stringify({
          suite_id: apiConfig.getAppId,
          suite_secret: apiConfig.getAppScrect,
          suite_ticket: apiConfig.getTicket
        })
      )
    }
    if (data) {
      data = JSON.stringify(data)
      let accessToken: AccessToken = new AccessToken(data, tokenType)
      let cache: ICache = QyApiConfigKit.getCache
      if (tokenType === AccessTokenType.PROVIDER_TOKEN) {
        cache.set(apiConfig.getCorpId.concat('_').concat(tokenType), accessToken.getCacheJson)
      } else {
        cache.set(apiConfig.getAppId.concat('_').concat(tokenType), accessToken.getCacheJson)
      }
      return accessToken
    } else {
      throw new Error('获取accessToken异常')
    }
  }
}
