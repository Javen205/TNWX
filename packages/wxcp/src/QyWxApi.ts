import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description
 */
export class QyWxApi {
  private static updateTaskCardUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/update_taskcard?access_token=%s'
  /**
   * 更新任务卡片消息状态
   * @param userIds 企业的成员ID列表（消息接收者，最多支持1000个）
   * @param agentId 应用的 agentId
   * @param taskId 发送任务卡片消息时指定的 taskId
   * @param clickedKey 设置指定的按钮为选择状态，需要与发送消息时指定的btn:key一致
   */
  public static async updateTaskCard(userIds: string, agentId: string, taskId: string, clickedKey: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateTaskCardUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        userids: userIds,
        agentid: agentId,
        task_id: taskId,
        clicked_key: clickedKey
      })
    )
  }
}
