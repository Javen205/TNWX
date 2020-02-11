import { Controller } from 'egg'
import * as getRawBody from 'raw-body'
import { ApiConfigKit, WeChat } from 'tnwx'
import { handMsgAdapter } from '../handMsgAdapter'

export default class MsgController extends Controller {
  msgAdapter = new handMsgAdapter()

  public async get() {
    const { ctx } = this

    let appId: string = ctx.query.appId
    if (appId) {
      ApiConfigKit.setCurrentAppId(appId)
    }

    let signature = ctx.query.signature, //微信加密签名
      timestamp = ctx.query.timestamp, //时间戳
      nonce = ctx.query.nonce, //随机数
      echostr = ctx.query.echostr //随机字符串
    ctx.body = WeChat.checkSignature(signature, timestamp, nonce, echostr)
  }

  public async post() {
    const { ctx } = this

    let appId: string = ctx.query.appId
    if (appId) {
      ApiConfigKit.setCurrentAppId(appId)
    }

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
