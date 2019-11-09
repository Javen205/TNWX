/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 数据统计接口
 */
import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'
import { DeviceIdentifier } from './ShakeAroundDeviceApi'

export class ShakeAroundStatisticsApi {
  private static statisticsDeviceUrl: string = 'https://api.weixin.qq.com/shakearound/statistics/device?access_token=%s'
  /**
   *  以设备为维度的数据统计接口
   *  @param deviceIdentifier 指定页面的设备ID
   *  @param beginDate 起始日期时间戳，最长时间跨度为30天，单位为秒
   *  @param endDate 结束日期时间戳，最长时间跨度为30天，单位为秒
   */
  public static async getByDevice(deviceIdentifier: DeviceIdentifier, beginDate: number, endDate: number) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.statisticsDeviceUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        device_identifier: deviceIdentifier,
        begin_date: beginDate,
        end_date: endDate
      })
    )
  }

  private static statisticsDeviceListUrl: string = 'https://api.weixin.qq.com/shakearound/statistics/devicelist?access_token=%s'
  /**
   *  批量查询设备统计数据接口
   *  @param date 	指定查询日期时间戳，单位为秒
   *  @param pageIndex 指定查询的结果页序号；返回结果按摇周边人数降序排序，每50条记录为一页
   */
  public static async getDeviceList(date: number, pageIndex: number) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.statisticsDeviceListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        date: date,
        page_index: pageIndex
      })
    )
  }

  private static statisticsPageUrl: string = 'https://api.weixin.qq.com/shakearound/statistics/page?access_token=%s'
  /**
   *  以页面为维度的数据统计接口
   *  @param pageId 指定页面的设备ID
   *  @param beginDate 起始日期时间戳，最长时间跨度为30天，单位为秒
   *  @param endDate 结束日期时间戳，最长时间跨度为30天，单位为秒
   */
  public static async getByPage(pageId: number, beginDate: number, endDate: number) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.statisticsPageUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        page_id: pageId,
        begin_date: beginDate,
        end_date: endDate
      })
    )
  }

  private static statisticsPageListUrl: string = 'https://api.weixin.qq.com/shakearound/statistics/pagelist?access_token=%s'
  /**
   *  批量查询页面统计数据接口
   *  @param date 指定查询日期时间戳
   *  @param pageIndex 指定查询的结果页序号；返回结果按摇周边人数降序排序，每50条记录为一页
   */
  public static async getPageList(date: number, pageIndex: number) {
    let accessToken: AccessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.statisticsPageListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        date: date,
        page_index: pageIndex
      })
    )
  }
}
