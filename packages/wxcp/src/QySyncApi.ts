import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 成员管理，异步批量相关接口
 */
export class QySyncApi {
  private static batchSyncUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/syncuser?access_token=%s'

  /**
   * 增量更新成员
   * @param mediaId  上传的csv文件的 mediaId
   * @param toInvite 是否邀请新建的成员使用企业微信
   * @param callback 回调信息
   * @param accessToken {AccessToken}
   */
  public static async batchSyncUser(mediaId: string, toInvite = true, callback?: QySyncCallback, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.batchSyncUserUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        media_id: mediaId,
        to_invite: toInvite,
        callback: callback
      })
    )
  }

  private static replaceUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/replaceuser?access_token=%s'

  /**
   * 全量覆盖成员
   * @param mediaId  上传的csv文件的 mediaId
   * @param toInvite 是否邀请新建的成员使用企业微信
   * @param callback 回调信息
   * @param accessToken {AccessToken}
   */
  public static async replaceUser(mediaId: string, toInvite = true, callback?: QySyncCallback, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.replaceUserUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        media_id: mediaId,
        to_invite: toInvite,
        callback: callback
      })
    )
  }

  private static replacePartyUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/replaceparty?access_token=%s'

  /**
   * 全量覆盖部门
   * @param mediaId  上传的csv文件的 mediaId
   * @param callback 回调信息
   * @param accessToken {AccessToken}
   */
  public static async replaceParty(mediaId: string, callback?: QySyncCallback, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.replacePartyUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        media_id: mediaId,
        callback: callback
      })
    )
  }

  private static getResultUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/getresult?access_token=%s&jobid=%s'

  /**
   * 获取异步任务结果
   * @param jobId  异步任务id，最大长度为64字节
   * @param accessToken {AccessToken}
   */
  public static async getResult(jobId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await QyAccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getResultUrl, accessToken.getAccessToken, jobId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}

export class QySyncCallback {
  private url: string
  private token: string
  private encodingaeskey: string

  constructor(url: string, token: string, encodingaeskey: string) {
    this.url = url
    this.token = token
    this.encodingaeskey = encodingaeskey
  }

  public get getToken(): string {
    return this.token
  }

  public set setToken(token: string) {
    this.token = token
  }

  public get getUrl(): string {
    return this.url
  }

  public set setUrl(url: string) {
    this.url = url
  }

  public get encodingAesKey(): string {
    return this.encodingaeskey
  }

  public set encodingAesKey(encodingaeskey: string) {
    this.encodingaeskey = encodingaeskey
  }
}
