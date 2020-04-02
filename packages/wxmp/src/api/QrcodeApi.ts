import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 生成带参数的二维码
 */
export class QrcodeApi {
  private static apiUrl: string = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=%s'
  private static showQrcodeUrl: string = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=%s'

  public static async create(json: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.apiUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, json)
  }

  /**
   * 临时二维码
   * @param response
   * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
   * @param sceneId 场景值ID，临时二维码时为32位非0整型
   * @param accessToken
   */
  public static async createTemporary(expireSeconds: number, sceneId: number, accessToken?: AccessToken) {
    return this.create(
      JSON.stringify({
        expire_seconds: expireSeconds,
        action_name: 'QR_SCENE',
        action_info: {
          scene: {
            scene_id: sceneId
          }
        }
      }),
      accessToken
    )
  }

  /**
   * 临时二维码
   * @param response
   * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
   * @param sceneStr 长度限制为1到64
   * @param accessToken
   */
  public static async createTemporaryByStr(expireSeconds: number, sceneStr: string, accessToken?: AccessToken) {
    return this.create(
      JSON.stringify({
        expire_seconds: expireSeconds,
        action_name: 'QR_STR_SCENE',
        action_info: {
          scene: {
            scene_str: sceneStr
          }
        }
      }),
      accessToken
    )
  }

  /**
   * 永久二维码
   * @param response
   * @param sceneId
   * @param accessToken
   */
  public static async createPermanent(sceneId: number, accessToken?: AccessToken) {
    return this.create(
      JSON.stringify({
        action_name: 'QR_LIMIT_SCENE',
        action_info: {
          scene: {
            scene_id: sceneId
          }
        }
      }),
      accessToken
    )
  }

  /**
   * 永久二维码
   * @param response
   * @param sceneStr
   * @param accessToken
   */
  public static async createPermanentByStr(sceneStr: string, accessToken?: AccessToken) {
    return this.create(
      JSON.stringify({
        action_name: 'QR_LIMIT_STR_SCENE',
        action_info: {
          scene: {
            scene_str: sceneStr
          }
        }
      }),
      accessToken
    )
  }

  /**
   * 通过ticket换取二维码
   * @param ticket
   */
  public static getShowQrcodeUrl(ticket: string): string {
    return util.format(this.showQrcodeUrl, ticket)
  }
}
