import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 附近的小程序相关 API
 */
export class NearByPoiApi {
  private static addUrl: string = 'https://api.weixin.qq.com/wxa/addnearbypoi?access_token=%s'

  /**
   * 添加地点
   * @param picList 门店图片
   * @param storeName 门店名字
   * @param hour 营业时间，格式11:11-12:12
   * @param credential 资质号
   * @param address 地址
   * @param companyName 主体名字
   * @param serviceInfos 服务标签列表
   * @param qualificationList 证明材料
   * @param kfInfo 客服信息
   * @param poiId 门店的poi_id
   */
  public static async add(
    picList: object,
    storeName: string,
    hour: string,
    credential: string,
    address: string,
    companyName: string,
    serviceInfos?: object,
    qualificationList?: object,
    kfInfo?: object,
    poiId?: string
  ) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.addUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        is_comm_nearby: 1,
        pic_list: picList,
        service_infos: serviceInfos,
        store_name: storeName,
        hour: hour,
        credential: credential,
        address: address,
        company_name: companyName,
        qualification_list: qualificationList,
        kf_info: kfInfo,
        poi_id: poiId
      })
    )
  }

  private static delUrl: string = 'https://api.weixin.qq.com/wxa/delnearbypoi?access_token=%s'

  /**
   * 删除地点
   * @param poiId 附近地点 ID
   */
  public static async delete(poiId: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.delUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        poi_id: poiId
      })
    )
  }

  private static getUrl: string = 'https://api.weixin.qq.com/wxa/getnearbypoilist?access_token=%s&page=%s&page_rows=%s'

  /**
   * 查看地点列表
   * @param page 起始页id（从1开始计数）
   * @param pageRow 每页展示个数（最多1000个）
   */
  public static async get(page: number, pageRow: number) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.delUrl, (<AccessToken>accessToken).getAccessToken, page, pageRow)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static showStatusUrl: string = 'https://api.weixin.qq.com/wxa/setnearbypoishowstatus?access_token=%s'

  /**
   * 展示/取消展示附近小程序
   * @param poiId 附近地点 ID
   * @param status 是否展示
   */
  public static async showStatus(poiId: string, status: number) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.showStatusUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        poi_id: poiId,
        status: status
      })
    )
  }
}
