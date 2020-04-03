import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 获取公众号的自动回复规则
 */
export class AutoReplyInfoApi {
  private static getCurrentAutoreplyInfoUrl: string = 'https://api.weixin.qq.com/cgi-bin/get_current_autoreply_info?access_token=%s'

  /**
   * 获取公众号的自动回复规则
   * @param accessToken
   */
  public static async get(accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getCurrentAutoreplyInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }
}
