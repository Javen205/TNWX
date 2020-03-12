import { Controller } from 'egg'
import * as getRawBody from 'raw-body'
import { ApiConfigKit, WeChat } from 'tnwx'
import { HandMsgAdapter } from '../../HandMsgAdapter'

export default class OpenMpController extends Controller {
  msgAdapter = new HandMsgAdapter()

  public async openMpEvent() {
    const { ctx } = this

    let appId: string = ctx.params.appId

    console.log(`openMpEvent:appId:${appId}`)

    if (!appId) {
      appId = ctx.app.config.openMpConfig.appId
    }

    ApiConfigKit.setCurrentAppId(appId)

    let msgSignature = ctx.query.msg_signature,
      timestamp = ctx.query.timestamp,
      nonce = ctx.query.nonce

    let buffer: Buffer = await getRawBody(ctx.req)
    let msgXml = buffer.toString('utf-8')

    // 接收消息并响应对应的回复
    WeChat.handleMsg(this.msgAdapter, msgXml, msgSignature, timestamp, nonce)
      .then(data => {
        ctx.body = data
      })
      .catch(error => console.log(error))
  }
}
