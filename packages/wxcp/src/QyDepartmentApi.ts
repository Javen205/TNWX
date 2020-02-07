import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 部门管理相关接口
 */
export class QyDepartmentApi {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=%s'

  /**
   * 创建部门
   * @param name 部门名称
   * @param parentId 父部门id，32位整型
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   * @param id 部门id，32位整型，指定时必须大于1
   */
  public static async create(name: string, parentId: number, nameEn?: string, order?: number, id?: number) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.createUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        name: name,
        name_en: nameEn,
        parentid: parentId,
        order: order,
        id: id
      })
    )
  }

  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=%s'

  /**
   * 更新部门
   * @param id 部门id
   * @param name 部门名称
   * @param parentId 父部门id
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   */
  public static async update(id: number, name?: string, parentId?: number, nameEn?: string, order?: number) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        id: id,
        name: name,
        name_en: nameEn,
        parentid: parentId,
        order: order
      })
    )
  }

  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=%s&id=%s'

  /**
   * 删除部门
   * @param id 部门id
   */
  public static async delete(id: number) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.deleteUrl, accessToken.getAccessToken, id)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=%s&id=%s'

  /**
   * 获取部门列表
   * @param id 部门id
   */
  public static async get(id: number) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getUrl, accessToken.getAccessToken, id)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
