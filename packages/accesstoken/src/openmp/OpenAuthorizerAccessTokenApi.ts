import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, AccessTokenType } from '../AccessToken'
import { ApiConfig } from '../ApiConfig'
import { ApiConfigKit } from '../ApiConfigKit'
import * as util from 'util'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信开放平台第三方应用凭证 AccessToken
 */
export class OpenAuthorizerAccessTokenApi {
  private static url: string = 'https://api.weixin.qq.com/cgi-bin/component/api_authorizer_token?component_access_token=%s'
  /**
   * 获取 acces_token
   * 1、先从缓存中获取，如果可用就直接返回
   * 2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token
   *
   * componentAccessToken authorizerRefreshToken 为空时从缓存中获取
   *
   * @param authorizerAppId         授权方 appid
   * @param componentAccessToken    开放平台令牌
   * @param authorizerRefreshToken  刷新令牌
   */
  public static async getAccessToken(authorizerAppId: string, componentAccessToken?: string, authorizerRefreshToken?: string): Promise<AccessToken> {
    let ac: ApiConfig = ApiConfigKit.getApiConfig
    let accessToken: AccessToken | undefined = this.getAvailableAccessToken(ac, authorizerAppId)
    if (accessToken) {
      if (ApiConfigKit.isDevMode) {
        console.debug('缓存中的 accesstoken')
      }
      return accessToken
    }
    if (ApiConfigKit.isDevMode) {
      console.debug('刷新 accesstoken')
    }
    return await this.refreshAccessToken(ac, componentAccessToken, authorizerAppId, authorizerRefreshToken)
  }

  /**
   * 获取可用的 AccessToken
   * @param apiConfig
   * @param authorizerAppId
   */
  private static getAvailableAccessToken(apiConfig: ApiConfig, authorizerAppId: string): AccessToken | undefined {
    let result: AccessToken | undefined
    let cache: ICache = ApiConfigKit.getCache
    let accessTokenJson: string = cache.get(apiConfig.getAppId.concat('_').concat(authorizerAppId))
    if (accessTokenJson) {
      result = new AccessToken(accessTokenJson, AccessTokenType.AUTHORIZER_TOKEN)
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
   * @param componentAccessToken
   * @param authorizerAppId
   * @param authorizerRefreshToken
   */
  public static async refreshAccessToken(apiConfig: ApiConfig, componentAccessToken: string, authorizerAppId: string, authorizerRefreshToken: string): Promise<AccessToken> {
    let url = util.format(this.url, componentAccessToken)

    let data = await HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: apiConfig.getAppId,
        authorizer_appid: authorizerAppId,
        authorizer_refresh_token: authorizerRefreshToken
      })
    )
    if (data) {
      data = JSON.stringify(data)
      let accessToken: AccessToken = new AccessToken(data, AccessTokenType.AUTHORIZER_TOKEN)
      let cache: ICache = ApiConfigKit.getCache
      cache.set(apiConfig.getAppId.concat('_').concat(authorizerAppId), accessToken.getCacheJson)
      return accessToken
    } else {
      throw new Error('获取 accessToken 异常')
    }
  }
}
