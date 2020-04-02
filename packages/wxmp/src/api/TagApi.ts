import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 用户标签
 */
export class TagApi {
  private static createTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/create?access_token=%s'
  private static getTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/get?access_token=%s'
  private static updateTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/update?access_token=%s'
  private static deleteTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=%s'
  private static getUserTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=%s'
  private static batchTaggingUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=%s'
  private static batchUnTaggingUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=%s'
  private static getIdListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=%s'

  /**
   * 创建标签
   * @param tagName
   */
  public static async create(tagName: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tag: {
          name: tagName
        }
      })
    )
  }

  /**
   * 获取公众号已创建的标签
   * @param accessToken
   */
  public static async get(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  /**
   * 编辑标签
   * @param tagId
   * @param tagName
   * @param accessToken
   */
  public static async update(tagId: number, tagName: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tag: {
          id: tagId,
          name: tagName
        }
      })
    )
  }

  /**
   * 删除标签
   * @param tagId
   * @param accessToken
   */
  public static async delete(tagId: number, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.deleteTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tag: {
          id: tagId
        }
      })
    )
  }

  /**
   * 获取标签下粉丝列表
   * @param tagId
   * @param nextOpenid
   * @param accessToken
   */
  public static async getUser(tagId: number, nextOpenid?: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserTagUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        tagid: tagId,
        next_openid: nextOpenid
      })
    )
  }

  /**
   * 批量为用户打标签
   * @param tagId
   * @param openIdList
   * @param accessToken
   */
  public static async batchAddTag(tagId: number, openIdList: string[], accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.batchTaggingUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid_list: openIdList,
        tagid: tagId
      })
    )
  }

  /**
   * 批量为用户取消标签
   * @param tagId
   * @param openIdList
   * @param accessToken
   */
  public static async batchDelTag(tagId: number, openIdList: string[], accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.batchUnTaggingUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid_list: openIdList,
        tagid: tagId
      })
    )
  }

  /**
   * 获取用户身上的标签列表
   * @param openId
   * @param accessToken
   */
  public static async getUserTag(openId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getIdListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid: openId
      })
    )
  }
}
