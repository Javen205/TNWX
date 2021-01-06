import * as util from 'util'
import { ICache } from '@tnwx/cache'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, AccessTokenType } from '../AccessToken'
import { QyApiConfigKit } from '../wxcp/QyApiConfigKit'
import { OpenCpAccessTokenApi } from './OpenCpAccessTokenApi'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取授权企业的 AccessToken \n
 * 第三方服务商在取得企业的永久授权码后，通过此接口可以获取到企业的access_token。\n
 * 获取后可通过通讯录、应用、消息等企业接口来运营这些应用。\n
 */
export class OpenCorpAccessTokenApi {
  private static getCorpTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_corp_token?suite_access_token=%s'
  /**
   * 获取 AccessToken
   * @param authCorpid 授权方corpid
   * @param permanentCode 永久授权码
   */
  public static async getAccessToken(authCorpid: string, permanentCode: string): Promise<AccessToken> {
    let accessToken: AccessToken | undefined = await this.getAvailableAccessToken(authCorpid, permanentCode)
    if (accessToken) {
      if (QyApiConfigKit.isDevMode) {
        console.debug('缓存中的 accesstoken')
      }
      return accessToken
    }
    if (QyApiConfigKit.isDevMode) {
      console.debug('刷新 accesstoken')
    }
    return await this.refreshAccessToken(authCorpid, permanentCode)
  }

  /**
   * 获取可用的 AccessToken
   * @param authCorpid 授权方corpid
   * @param permanentCode 永久授权码
   */
  private static async getAvailableAccessToken(authCorpid: string, permanentCode: string): Promise<AccessToken | undefined> {
    let result: AccessToken | undefined
    let cache: ICache = QyApiConfigKit.getCache
    let accessTokenJson: string = await cache.get(authCorpid.concat('_').concat(permanentCode))
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
   * 刷新 AccessToken
   * @param authCorpid 授权方corpid
   * @param permanentCode 永久授权码
   */
  public static async refreshAccessToken(authCorpid: string, permanentCode: string): Promise<AccessToken> {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getCorpTokenUrl, accessToken.getAccessToken)
    let data = await HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpid,
        permanent_code: permanentCode
      })
    )
    if (data) {
      data = JSON.stringify(data)
      let accessToken: AccessToken = new AccessToken(data)
      let cache: ICache = QyApiConfigKit.getCache
      cache.set(authCorpid.concat('_').concat(permanentCode), accessToken.getCacheJson)
      return accessToken
    } else {
      throw new Error('获取accessToken异常')
    }
  }
}
