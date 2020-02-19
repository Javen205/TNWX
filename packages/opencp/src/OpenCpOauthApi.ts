import * as util from 'util'
import * as urlencode from 'urlencode'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi, OpenCpAccessTokenApi, AccessTokenType } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 身份验证-网页授权登录、扫码授权登录
 */
export class OpenCpOauthApi {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=%s#wechat_redirect'
  private static qrConnectUrl: string = 'https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=%s&redirect_uri=%s&state=%s&usertype=%s'

  /**
   * 构造网页授权链接
   * @param suiteId 第三方应用id
   * @param redirectUri 授权后重定向的回调链接地址
   * @param scope 应用授权作用域。
   * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
   */
  public static getAuthorizeUrl(suiteId: string, redirectUri: string, scope: string, state?: string) {
    return util.format(this.authorizeUrl, suiteId, urlencode.encode(redirectUri), scope, state)
  }

  /**
   * 构造扫码登录链接
   * @param corpId 服务商的corpId
   * @param redirectUri 授权登录之后目的跳转网址
   * @param state 重定向后会带上state参数
   * @param userType 支持登录的类型。admin代表管理员登录（使用微信扫码）,member代表成员登录（使用企业微信扫码），默认为admin
   */
  public static getQrConnect(corpId: string, redirectUri: string, state?: string, userType?: string) {
    return util.format(this.qrConnectUrl, corpId, urlencode.encode(redirectUri), state, userType)
  }

  private static getUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/getuserinfo3rd?suite_access_token=%s&code=%s'

  /**
   * 根据 code 获取成员信息
   * @param code 通过成员授权获取到的 code
   */
  public static async getUserInfo(code: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getUserInfoUrl, accessToken.getAccessToken, code)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getUserDetailUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/getuserdetail3rd?suite_access_token=%s'

  /**
   * 获取访问用户敏感信息
   * @param userTicket 成员票据
   */
  public static async getUserDetail(userTicket: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getUserDetailUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        user_ticket: userTicket
      })
    )
  }

  private static getLoginInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_login_info?access_token=%s'

  /**
   * 获取登录用户信息
   * @param authCode oauth2.0授权企业微信管理员登录产生的code
   */
  public static async getLoginInfo(authCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.getLoginInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_code: authCode
      })
    )
  }
}
