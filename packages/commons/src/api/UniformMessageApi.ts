import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 公共 API
 */
export class UniformMessageApi {
  private static sendUniformMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=%s'

  /**
   * 下发小程序和公众号统一的服务消息
   * @param touser 用户openid
   * @param weappTemplateMsg 小程序模板消息相关的信息
   * @param mpTemplateMsg 公众号模板消息相关的信息
   */
  public static async sendUniformMessage(touser: string, mpTemplateMsg: object, weappTemplateMsg?: object) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(this.sendUniformMessageUrl, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        touser: touser,
        mp_template_msg: mpTemplateMsg,
        weapp_template_msg: weappTemplateMsg
      })
    )
  }
}
