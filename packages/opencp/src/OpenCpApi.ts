import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, OpenCpAccessTokenApi, AccessTokenType } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信开发平台 API
 */
export class OpenCpApi {
  private static getPreAuthCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_pre_auth_code?suite_access_token=%s'

  /**
   * 获取预授权码
   */
  public static async getPreAuthCode() {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getPreAuthCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static setSessionInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/set_session_info?suite_access_token=%s'

  /**
   * 设置授权配置
   * @param preAuthCode 预授权码
   * @param authType 授权类型：0 正式授权， 1 测试授权。 默认值为0。注意，请确保应用在正式发布后的授权类型为“正式授权”
   * @param appId 允许进行授权的应用id，如1、2、3，不填或者填空数组都表示允许授权套件内所有应用（仅旧的多应用套件可传此参数，新开发者可忽略）
   */
  public static async setSessionInfo(preAuthCode: string, authType = 0, appId?: Array<number>) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.setSessionInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        pre_auth_code: preAuthCode,
        session_info: {
          appid: appId,
          auth_type: authType
        }
      })
    )
  }

  private static getPermanentCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_permanent_code?suite_access_token=%s'

  /**
   * 获取企业永久授权码
   * @param authCode 临时授权码
   */
  public static async getPermanentCode(authCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getPermanentCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_code: authCode
      })
    )
  }

  private static getAuthInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_auth_info?suite_access_token=%s'

  /**
   * 获取企业授权信息
   * @param authCorpId 授权方corpid
   * @param permanentCode 永久授权码
   */
  public static async getAuthInfo(authCorpId: string, permanentCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getAuthInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        permanent_code: permanentCode
      })
    )
  }

  private static getAdminListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_admin_list?suite_access_token=%s'

  /**
   * 获取应用的管理员列表
   * @param authCorpId 授权方corpid
   * @param agentId 授权方安装的应用agentid
   */
  public static async getAdminList(authCorpId: string, agentId: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getAdminListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        agentid: agentId
      })
    )
  }
}
