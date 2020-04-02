import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 语义理解
 */
export class SemanticApi {
  private static searchUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=%s'

  public static async search(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.searchUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }
}
