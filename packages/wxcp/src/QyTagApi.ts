import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 标签管理相关接口
 */
export class QyTagApi {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/create?access_token=%s'

  /**
   * 创建标签
   * @param tagName 标签名称
   * @param tagId 标签id
   * @param accessToken {AccessToken}
   */
  public static async create(tagName: string, tagId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tagname: tagName,
        tagid: tagId
      })
    )
  }

  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/update?access_token=%s'

  /**
   * 更新标签名字
   * @param tagName 标签名称
   * @param tagId 标签id
   * @param accessToken {AccessToken}
   */
  public static async update(tagName: string, tagId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tagname: tagName,
        tagid: tagId
      })
    )
  }

  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/delete?access_token=%s&tagid=%s'

  /**
   * 删除标签
   * @param tagId 标签id
   * @param accessToken {AccessToken}
   */
  public static async delete(tagId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.deleteUrl, accessToken.getAccessToken, tagId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=%s&tagid=%s'

  /**
   * 获取标签成员
   * @param tagId 标签id
   * @param accessToken {AccessToken}
   */
  public static async getUserByTagId(tagId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserUrl, accessToken.getAccessToken, tagId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static addTagUsersUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers?access_token=%s'

  /**
   * 增加标签成员
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   * @param accessToken {AccessToken}
   */
  public static async addTagUsers(tagId: number, userList?: Array<string>, partyList?: Array<number>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.addTagUsersUrl, accessToken.getAccessToken, tagId)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tagid: tagId,
        userlist: userList,
        partylist: partyList
      })
    )
  }

  private static delTagUsersUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/deltagusers?access_token=%s'

  /**
   * 删除标签成员
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   * @param accessToken {AccessToken}
   */
  public static async delTagUsers(tagId: number, userList?: Array<string>, partyList?: Array<number>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.delTagUsersUrl, accessToken.getAccessToken, tagId)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tagid: tagId,
        userlist: userList,
        partylist: partyList
      })
    )
  }

  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/list?access_token=%s'

  /**
   * 获取标签列表
   * @param accessToken {AccessToken}
   */
  public static async getTagList(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
