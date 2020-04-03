import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信门店接口
 */
export class PoiApi {
  private static addPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/addpoi?access_token=%s'
  private static getPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getpoi?access_token=%s'
  private static getPoiListUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/getpoilist?access_token=%s'
  private static updatePoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/updatepoi?access_token=%s'
  private static delPoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/delpoi?access_token=%s'
  private static getWxCategoryUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getwxcategory?access_token=%s'

  /**
   * 创建门店
   * @param jsonStr
   * @param accessToken
   */
  public static async addPoi(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addPoiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  /**
   * 查询门店信息
   * @param poiId
   * @param accessToken
   */
  public static async getPoi(poiId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getPoiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        poi_id: poiId
      })
    )
  }

  /**
   * 查询门店列表
   * @param begin 开始位置，0 即为从第一条开始查询
   * @param limit 返回数据条数，最大允许50，默认为20
   * @param accessToken
   */
  public static async getPoiList(begin: number = 0, limit: number = 20, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getPoiListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        begin: begin,
        limit: limit
      })
    )
  }

  /**
   * 修改门店服务信息
   * @param jsonStr
   * @param accessToken
   */
  public static async updatePoi(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updatePoiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  /**
   * 删除门店
   * @param poiId
   * @param accessToken
   */
  public static async delPoi(poiId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delPoiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        poi_id: poiId
      })
    )
  }

  /**
   * 门店类目表
   * @param accessToken
   */
  public static async getWxCategory(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getWxCategoryUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
