import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 成员管理相关接口
 */
export class QyUserApi {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=%s'

  /**
   * 创建成员
   * @param jsonData 请求 JSON 数据
   * @param accessToken AccessToken
   */
  public static async create(jsonData: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }

  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=%s'

  /**
   * 更新成员
   * @param jsonData 请求 JSON 数据
   * @param accessToken AccessToken
   */
  public static async update(jsonData: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonData)
  }

  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=%s&userid=%s'

  /**
   * 读取成员
   * @param userId 成员 userId
   * @param accessToken AccessToken
   */
  public static async get(userId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUrl, accessToken.getAccessToken, userId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/delete?access_token=%s&userid=%s'

  /**
   * 删除成员
   * @param userId 成员 userId
   * @param accessToken AccessToken
   */
  public static async delete(userId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.deleteUrl, accessToken.getAccessToken, userId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static batchDeleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete?access_token=%s'

  /**
   * 批量删除成员
   * @param userIdList 成员 userId 列表
   * @param accessToken AccessToken
   */
  public static async batchDelete(userIdList: Array<string>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.batchDeleteUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        useridlist: userIdList
      })
    )
  }

  private static departmentUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token=%s&department_id=%s&fetch_child=%s'

  /**
   * 获取部门成员
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   * @param accessToken AccessToken
   */
  public static async getDepartmentUser(departmentId: string, fetchChild = 0, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.departmentUserUrl, accessToken.getAccessToken, departmentId, fetchChild)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static departmentUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=%s&department_id=%s&fetch_child=%s'

  /**
   * 获取部门成员详情
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   * @param accessToken AccessToken
   */
  public static async departmentUserInfo(departmentId: string, fetchChild = 0, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.departmentUserInfoUrl, accessToken.getAccessToken, departmentId, fetchChild)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static userIdToOpenIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=%s'

  /**
   * userid 转 openid
   * @param userId 获取的部门id
   * @param accessToken AccessToken
   */
  public static async toOpenId(userId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.userIdToOpenIdUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userid: userId
      })
    )
  }

  private static openIdToUserIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_userid?access_token=%s'

  /**
   * openid 转 userid
   * @param openId 获取的部门id
   * @param accessToken AccessToken
   */
  public static async toUerId(openId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.openIdToUserIdUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid: openId
      })
    )
  }

  private static authSuccUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/authsucc?access_token=%s&userid=%s'

  /**
   * 二次验证
   * @param userId 成员 userId
   * @param accessToken AccessToken
   */
  public static async authSucc(userId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.authSuccUrl, accessToken.getAccessToken, userId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static batchInviteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/invite?access_token=%s'

  /**
   * 邀请成员
   * @param users 成员ID列表, 最多支持1000个
   * @param partys 部门ID列表，最多支持100个
   * @param tags 标签ID列表，最多支持100个
   * @param accessToken AccessToken
   */
  public static async batchInvite(users?: Array<string>, partys?: Array<string>, tags?: Array<string>, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.batchInviteUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        user: users,
        party: partys,
        tag: tags
      })
    )
  }

  private static getJoinQrCodeUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/corp/get_join_qrcode?access_token=%s&size_type=%s'

  /**
   * 获取加入企业二维码
   * @param sizeType qrcode尺寸类型，1: 171 x 171; 2: 399 x 399; 3: 741 x 741; 4: 2052 x 2052
   */
  public static async getJoinQrCode(sizeType: number) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getJoinQrCodeUrl, accessToken.getAccessToken, sizeType)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static getMobileHashCodeUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/get_mobile_hashcode?access_token=%s'

  /**
   * 获取手机号随机串
   * @param mobile 手机号
   * @param state 企业自定义的state参数
   */
  public static async getMobileHashCode(mobile: string, state?: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getMobileHashCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        mobile: mobile,
        state: state
      })
    )
  }

  private static getUserIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserid?access_token=%s'

  /**
   * 手机号获取userid
   * @param mobile 手机号
   * @param accessToken AccessToken
   */
  public static async getUserId(mobile: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserIdUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        mobile: mobile
      })
    )
  }
}
