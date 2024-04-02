import * as util from 'util'
import * as urlencode from 'urlencode'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 身份验证
 */
export class QyOauthApi {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=%s#wechat_redirect'
  private static qrConnectUrl: string = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=%s&agentid=%s&redirect_uri=%s&state=%s'

  /**
   * 构造网页授权链接
   * @param corpId 企业的 corpId
   * @param redirectUri 授权后重定向的回调链接地址
   * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
   */
  public static getAuthorizeUrl(corpId: string, redirectUri: string, state?: string) {
    return util.format(this.authorizeUrl, corpId, urlencode.encode(redirectUri), state)
  }
  public static getQrConnect(corpId: string, agentId: string, redirectUri: string, state?: string) {
    return util.format(this.qrConnectUrl, corpId, agentId, urlencode.encode(redirectUri), state)
  }

  private static getUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s'

  /**
   * 根据 code 获取成员信息
   * @param code 通过成员授权获取到的 code
   */
  public static async getUserInfo(code: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getUserInfoUrl, accessToken.getAccessToken, code)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

   private static getUserDetailUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/auth/getuserdetail?access_token=%s'
  /**
   * 获取访问用户敏感信息
   * @param user_ticket 通过成员信息获取到的 user_ticket
   */
   public static async getUserDetail(user_ticket: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getUserDetailUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url,JSON.stringify({user_ticket:user_ticket}))
  }
}
