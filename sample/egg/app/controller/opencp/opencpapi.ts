import { Controller } from 'egg'
import { OpenCpAccessTokenApi, AccessTokenType, OpenCorpAccessTokenApi, OpenCpApi, AccessToken, QySendMsgApi, QyTextMsg, QyText } from 'tnwx'

export default class OpenCpApiController extends Controller {
  public async index() {
    const { ctx } = this
    let type: number = parseInt(ctx.query.type)
    let data: string = '企业微信开放平台...'

    ctx.app.logger.info(`type:${type}`)

    switch (type) {
      case 1:
        data = JSON.stringify(await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN))
        break
      case 2:
        // 需要先获取 suite_ticket
        // 1、在 HandMsgAdapter 的 processInSuiteTicket 中有回调 10 分钟回调一次
        // 2、在开放平台 https://open.work.weixin.qq.com/  应用中手动刷新
        data = JSON.stringify(await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN))
        break
      case 3:
        // 安装应用返回的临时授权码
        let authCode: string = 'A_m53fEQ0eeY3gsr-sGdlIJqu35qYNKxGmU155MgIPjRz0MYxQsNa-ng69tKjuggOwxSt5sedJdRAv-l44Jk7MMu3lM4oEFT-nrAWdjCBEE'
        // 获取企业永久授权码
        data = JSON.stringify(await OpenCpApi.getPermanentCode(authCode))
        break
      case 4:
        // getPermanentCode 返回的信息
        let authCorpid: string = 'corpid'
        let permanentCode: string = 'permanent_code'
        let agentId: string = '1000009'

        let accessToken: AccessToken = await OpenCorpAccessTokenApi.getAccessToken(authCorpid, permanentCode)
        let text: QyTextMsg = new QyTextMsg(new QyText('开放平台发送文本消息 By TNWX'), agentId, 'Javen')
        let result = await QySendMsgApi.sendTextMessage(text, accessToken)
        data = JSON.stringify(result)
        break
      default:
        break
    }
    ctx.app.logger.info(data)
    ctx.body = data
  }
}
