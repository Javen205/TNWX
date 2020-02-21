import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, OpenCpAccessTokenApi, AccessTokenType } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 推广二维码相关接口
 */
export class OpenQrCode {
  private static getRegisterCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_register_code?provider_access_token=%s'

  /**
   * 获取注册码
   * @param templateId 推广包ID
   * @param corpName 企业名称
   * @param adminName 管理员姓名
   * @param adminMobile 管理员手机号
   * @param state 用户自定义的状态值
   * @param followUser 跟进人的userid，必须是服务商所在企业的成员
   */
  public static async getRegisterCode(templateId: string, corpName?: string, adminName?: string, adminMobile?: string, state?: string, followUser?: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.getRegisterCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        template_id: templateId,
        corp_name: corpName,
        admin_name: adminName,
        admin_mobile: adminMobile,
        state: state,
        follow_user: followUser
      })
    )
  }

  private static getRegisterCodeInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_register_info?provider_access_token=%s'

  /**
   * 查询注册状态
   * @param registerCode 查询的注册码
   */
  public static async getRegisterCodeInfo(registerCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.getRegisterCodeInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        register_code: registerCode
      })
    )
  }

  private static setScopeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set_scope?access_token=%s'

  /**
   * 设置授权应用可见范围
   * @param accessToken 注册完成回调事件或者查询注册状态返回的access_token
   * @param agentId 授权方应用id
   * @param allowUser
   * @param allowParty
   * @param allowTag
   */
  public static async setScope(accessToken: string, agentId: string, allowUser?: Array<string>, allowParty?: Array<number>, allowTag?: Array<number>) {
    let url = util.format(this.setScopeUrl, accessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        agentid: agentId,
        allow_user: allowUser,
        allow_party: allowParty,
        allow_tag: allowTag
      })
    )
  }

  private static contactSyncSuccessUrl = 'https://qyapi.weixin.qq.com/cgi-bin/sync/contact_sync_success=%s'

  /**
   * 设置通讯录同步完成
   * @param accessToken 注册完成回调事件或者查询注册状态返回的access_token
   */
  public static async contactSyncSuccess(accessToken: string) {
    let url = util.format(this.contactSyncSuccessUrl, accessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
