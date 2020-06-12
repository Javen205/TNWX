import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 自定义菜单
 */
export class MenuApi {
  private static createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
  private static deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s'
  private static getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s'
  private static getSelfMenuInfoUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=%s'

  private static addConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=%s'
  private static delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=%s'
  private static tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=%s'

  /**
   * 创建菜单
   * @param menuJson
   * @param accessToken
   */
  public static async create(menuJson: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createMenuUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, menuJson)
  }

  /**
   * 删除菜单
   * @param accessToken
   */
  public static async delete(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.deleteMenuUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 查询菜单
   * @param accessToken
   */
  public static async get(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getMenuUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * @param accessToken
   */
  public static async getCurrentSelfMenu(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getSelfMenuInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 添加个性化菜单
   * @param menuJson
   */
  public static async addConditional(menuJson: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addConditionalUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, menuJson)
  }

  /**
   * 删除个性化菜单
   * @param menuId
   * @param accessToken
   */
  public static async deleteConditional(menuId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delConditionalUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        menuid: menuId
      })
    )
  }

  /**
   * 测试个性化菜单匹配结果
   * @param openId
   * @param accessToken
   */
  public static async tryMatch(openId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.tryMatchUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        user_id: openId
      })
    )
  }
}
