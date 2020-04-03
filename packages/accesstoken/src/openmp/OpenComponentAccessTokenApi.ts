import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, AccessTokenType } from '../AccessToken'
import { ApiConfig } from '../ApiConfig'
import { ApiConfigKit } from '../ApiConfigKit'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信开发平台 AccessToken
 */
export class OpenComponentAccessTokenApi {
  private static getComponentTokenUrl: string = 'https://api.weixin.qq.com/cgi-bin/component/api_component_token'
  /**
   * 获取 acces_token
   * 1、先从缓存中获取，如果可用就直接返回
   * 2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token
   */
  public static async getAccessToken(): Promise<AccessToken> {
    let ac: ApiConfig = ApiConfigKit.getApiConfig
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken(ac)
    if (accessToken) {
      if (ApiConfigKit.isDevMode) {
        console.debug('缓存中的 accesstoken')
      }
      return accessToken
    }
    if (ApiConfigKit.isDevMode) {
      console.debug('刷新 accesstoken')
    }
    return await this.refreshAccessToken(ac)
  }

  /**
   * 获取可用的 AccessToken
   * @param apiConfig
   */
  private static async getAvailableAccessToken(apiConfig: ApiConfig): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined
    let cache: ICache = ApiConfigKit.getCache
    let accessTokenJson: string = await cache.get(apiConfig.getAppId)
    if (accessTokenJson) {
      result = new AccessToken(accessTokenJson, AccessTokenType.COMPONENT_TOKEN)
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
   */
  public static async refreshAccessToken(apiConfig: ApiConfig): Promise<AccessToken> {
    let data = await HttpKit.getHttpDelegate.httpPost(
      this.getComponentTokenUrl,
      JSON.stringify({
        component_appid: apiConfig.getAppId,
        component_appsecret: apiConfig.getAppScrect,
        component_verify_ticket: apiConfig.getTicket
      })
    )
    if (data) {
      data = JSON.stringify(data)
      let accessToken: AccessToken = new AccessToken(data, AccessTokenType.COMPONENT_TOKEN)
      let cache: ICache = ApiConfigKit.getCache
      cache.set(apiConfig.getAppId, accessToken.getCacheJson)
      return accessToken
    } else {
      throw new Error('获取 accessToken 异常')
    }
  }
}
