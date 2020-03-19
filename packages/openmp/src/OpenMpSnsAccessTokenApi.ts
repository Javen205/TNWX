import * as util from 'util'
import * as urlencode from 'urlencode'
import { ApiConfigKit, AccessToken, OpenComponentAccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'
import { ScopeEnum, Lang } from '@tnwx/commons'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 代公众号发起网页授权
 */
export class OpenMpSnsAccessTokenApi {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&component_appid=%s'
  private static accessTokenUrl: string =
    'https://api.weixin.qq.com/sns/oauth2/component/access_token?appid=%s&code=%s&grant_type=authorization_code&component_appid=%s&component_access_token=%s'
  private static refreshTokenUrl: string =
    'https://api.weixin.qq.com/sns/oauth2/component/refresh_token?appid=%s&grant_type=refresh_token&component_appid=%s&component_access_token=%s&refresh_token=%s'
  private static userInfoUrl: string = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=%s'

  /**
   * 获取授权链接
   * @param appId       公众号的 appId
   * @param redirectUri 回调地址
   * @param scope       授权作用域，拥有多个作用域用逗号（,）分隔
   * @param state       重定向后会带上 state 参数，开发者可以填写任意参数值，最多 128 字节
   */
  public static getAuthorizeUrl(appId: string, redirectUri: string, scope: ScopeEnum, state?: string): string {
    let url = util.format(this.authorizeUrl, appId, urlencode(redirectUri), scope, ApiConfigKit.getApiConfig.getAppId)
    if (state) {
      url = url + '&state=' + state
    }
    return url + '#wechat_redirect'
  }

  /**
   * 通过code换取网页授权access_token
   * @param code
   */
  public static async getSnsAccessToken(code: string, appId: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.accessTokenUrl, appId, code, ApiConfigKit.getApiConfig.getAppId, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 刷新access_token
   * @param refreshToken
   */
  public static async refreshAccessToken(appId: string, refreshToken: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.refreshTokenUrl, appId, ApiConfigKit.getApiConfig.getAppId, accessToken.getAccessToken, refreshToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 拉取用户信息(需scope为 snsapi_userinfo)
   * @param accessToken
   * @param openId
   * @param lang
   */
  public static async getUserInfo(accessToken: string, openId: string, lang: Lang) {
    let url = util.format(this.userInfoUrl, accessToken, openId, lang)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
