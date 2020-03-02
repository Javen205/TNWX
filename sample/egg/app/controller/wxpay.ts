import { Controller } from 'egg'
import { WxPay, WxPayApiConifgKit, Kits, SIGN_TYPE, HttpKit, WX_DOMAIN, WX_API_TYPE, WxPayApiConfig, WX_TRADE_TYPE } from 'tnwx'

export default class WxPayController extends Controller {
  public async index() {
    const { ctx } = this

    let type: number = parseInt(ctx.query.type)

    let data: string = 'TNWX 微信支付...'
    let config: WxPayApiConfig = WxPayApiConifgKit.getConfig

    switch (type) {
      case 0:
        data = JSON.stringify(config)
        break
      case 1:
        data = await WxPay.getSignKey(config.mchId, config.apiKey)
        break
      case 2:
        let reqObj = {
          appid: config.appId,
          mch_id: config.mchId,
          nonce_str: Kits.generateStr(), //生成随机字符串
          body: 'IJPay 让支付触手可及',
          attach: 'TNWX 微信系开发脚手架',
          out_trade_no: Kits.generateStr(),
          total_fee: 666,
          spbill_create_ip: '127.0.0.1',
          notify_url: 'https://gitee.com/Javen205/TNWX',
          trade_type: WX_TRADE_TYPE.JSAPI
        }
        // 生成签名
        // let sign: string = Kits.generateSignature(reqObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_MD5)
        // reqObj['sign'] = sign
        // // obj 对象转化为 xml
        // let xml: string = await Kits.obj2xml(reqObj)
        // console.log(`xml:${xml}`)

        let xml = await Kits.generateSignedXml(reqObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_MD5)

        data = await HttpKit.getHttpDelegate.httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.UNIFIED_ORDER), xml)
        break
      default:
        break
    }

    ctx.app.logger.info(data)
    ctx.body = data
  }
}
