import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, OpenCpAccessTokenApi, AccessTokenType, OpenComponentAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信开发平台 API
 */
export class OpenMpApi {
  private static getPreAuthCodeUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_create_preauthcode?component_access_token=%s'

  /**
   * 获取预授权码
   * @param appId 第三方平台 appid
   */
  public static async getPreAuthCode(appId: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.getPreAuthCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId
      })
    )
  }

  private static queryAuthUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_query_auth?component_access_token=%s'

  /**
   * 使用授权码获取授权信息
   * @param appId               第三方平台 appid
   * @param authorizationCode   授权码
   */
  public static async queryAuth(appId: string, authorizationCode: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.queryAuthUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId,
        authorization_code: authorizationCode
      })
    )
  }

  private static getAuthorizerInfoUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_get_authorizer_info?component_access_token=%s'

  /**
   * 获取授权方的帐号基本信息
   * @param appId           第三方平台 appid
   * @param authorizerAppId 授权方 appid
   */
  public static async getAuthorizerInfo(appId: string, authorizerAppId: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.getAuthorizerInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId,
        authorizer_appid: authorizerAppId
      })
    )
  }

  private static getAuthorizerOptionUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_get_authorizer_info?component_access_token=%s'

  /**
   * 获取授权方选项信息
   * @param appId           第三方平台 appid
   * @param authorizerAppId 授权方 appid
   * @param optionName      选项名称
   */
  public static async getAuthorizerOption(appId: string, authorizerAppId: string, optionName: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.getAuthorizerOptionUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId,
        authorizer_appid: authorizerAppId,
        option_name: optionName
      })
    )
  }

  private static setAuthorizerOptionUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_set_authorizer_option?component_access_token=%s'

  /**
   * 设置授权方选项信息
   * @param appId           第三方平台 appid
   * @param authorizerAppId 授权方 appid
   * @param optionName      选项名称
   * @param optionValue     选项值
   */
  public static async setAuthorizerOption(appId: string, authorizerAppId: string, optionName: string, optionValue: string) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.setAuthorizerOptionUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId,
        authorizer_appid: authorizerAppId,
        option_name: optionName,
        option_value: optionValue
      })
    )
  }

  private static getAuthorizerListUrl = 'https://api.weixin.qq.com/cgi-bin/component/api_get_authorizer_list?component_access_token=%s'

  /**
   * 拉取所有已授权的帐号信息
   * @param appId   第三方平台 appid
   * @param offset  偏移位置/起始位置
   * @param count   拉取数量，最大为 500
   */
  public static async getAuthorizerList(appId: string, offset: number, count: number) {
    let accessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
    let url = util.format(this.getAuthorizerListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        component_appid: appId,
        offset: offset,
        count: count
      })
    )
  }
}
