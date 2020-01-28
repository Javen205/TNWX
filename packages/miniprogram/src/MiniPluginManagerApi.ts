import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 插件管理相关 API
 */

export class MiniPluginManagerApi {
  private static pluginUrl: string = 'https://api.weixin.qq.com/wxa/plugin?access_token=%s'
  private static devPluginUrl: string = 'https://api.weixin.qq.com/wxa/devplugin?access_token=%s'

  /**
   * 向插件开发者发起使用插件的申请
   * @param appId 插件 appId
   * @param reason 申请使用理由
   */
  public static async applyPlugin(appId: string, reason?: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.pluginUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: 'apply',
        plugin_appid: appId,
        reason: reason
      })
    )
  }

  /**
   * 获取当前所有插件使用方（供插件开发者调用）
   * @param page 要拉取第几页的数据
   * @param num 每页的记录数
   */
  public static async getPluginDevApplyList(page = 0, num = 20) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.devPluginUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: 'dev_apply_list',
        page: page,
        num: num
      })
    )
  }

  /**
   * 查询已添加的插件
   */
  public static async getPluginList() {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.pluginUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: 'list'
      })
    )
  }

  /**
   * 修改插件使用申请的状态（供插件开发者调用）
   * @param action 修改操作 dev_agree 同意申请 dev_refuse 拒绝申请 dev_delete 删除已拒绝的申请者
   * @param appId 使用者的 appId,同意申请时填写
   * @param reason 拒绝理由,拒绝申请时填写
   */
  public static async setDevPluginApplyStatus(action: string, appId?: string, reason?: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.devPluginUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: action,
        appid: appId,
        reason: reason
      })
    )
  }

  /**
   * 删除已添加的插件
   * @param appId 插件 appId
   */
  public static async unbindPlugin(appId: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.pluginUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        action: 'unbind',
        plugin_appid: appId
      })
    )
  }
}
