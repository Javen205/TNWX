import { Controller } from 'egg'
import * as getRawBody from 'raw-body'
import { QyWeChat, QyApiConfigKit } from 'tnwx'
import { HandMsgAdapter } from '../../HandMsgAdapter'

export default class QyMsgController extends Controller {
  msgAdapter = new HandMsgAdapter()

  public async get() {
    const { ctx } = this

    let appId: string = ctx.query.appId
    let corpId: string = ctx.query.corpId
    if (appId && corpId) {
      QyApiConfigKit.setCurrentAppId(appId, corpId)
    }

    let signature = ctx.query.signature, //微信加密签名
      timestamp = ctx.query.timestamp, //时间戳
      nonce = ctx.query.nonce, //随机数
      echostr = ctx.query.echostr //随机字符串
    ctx.body = QyWeChat.checkSignature(signature, timestamp, nonce, echostr)
  }

  public async post() {
    const { ctx } = this

    let appId: string = ctx.query.appId
    let corpId: string = ctx.query.corpId
    if (appId && corpId) {
      QyApiConfigKit.setCurrentAppId(appId, corpId)
    }

    let msgSignature = ctx.query.msg_signature,
      timestamp = ctx.query.timestamp,
      nonce = ctx.query.nonce

    let buffer: Buffer = await getRawBody(ctx.req)
    let msgXml = buffer.toString('utf-8')

    // 接收消息并响应对应的回复
    QyWeChat.handleMsg(this.msgAdapter, msgXml, msgSignature, timestamp, nonce)
      .then(data => {
        ctx.body = data
      })
      .catch(error => console.log(error))
  }
}
