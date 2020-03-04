import { Controller } from 'egg'
import { WxPay, WxPayApiConifgKit, Kits, SIGN_TYPE, HttpKit, WX_DOMAIN, WX_API_TYPE, WxPayApiConfig, WX_TRADE_TYPE } from 'tnwx'
import * as fs from 'fs'

export default class WxPayController extends Controller {
  public async index() {
    const { ctx } = this

    let type: number = parseInt(ctx.query.type)

    let data: string = 'TNWX 微信支付...'
    let config: WxPayApiConfig = WxPayApiConifgKit.getConfig
    let ip = ctx.request.ip

    console.log(`ip:${ip}`)

    switch (type) {
      case 0:
        try {
          data = JSON.stringify(config)
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 1:
        try {
          data = await WxPay.getSignKey(config.mchId, config.apiKey)
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }
        break
      case 2:
        try {
          let reqObj = {
            appid: config.appId,
            mch_id: config.mchId,
            nonce_str: Kits.generateStr(), //生成随机字符串
            body: 'IJPay 让支付触手可及',
            attach: 'TNWX 微信系开发脚手架',
            out_trade_no: Kits.generateStr(),
            total_fee: 666,
            spbill_create_ip: ip,
            notify_url: 'https://gitee.com/Javen205/TNWX',
            trade_type: WX_TRADE_TYPE.JSAPI,
            sign_type: SIGN_TYPE.SIGN_TYPE_HMACSHA256
          }
          let xml = await Kits.generateSignedXml(reqObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_HMACSHA256)

          data = await HttpKit.getHttpDelegate.httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.UNIFIED_ORDER), xml)
          // ctx.set('Content-Type', 'text/xml')
          // ctx.body = data
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }
        break
      case 3:
        try {
          let refundObj = {
            appid: config.appId,
            mch_id: config.mchId,
            nonce_str: Kits.generateStr(), //生成随机字符串
            out_trade_no: Kits.generateStr(),
            out_refund_no: Kits.generateStr(),
            total_fee: 666,
            refund_fee: 100
          }

          let xml = await Kits.generateSignedXml(refundObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_MD5)
          let pfx: Buffer = fs.readFileSync(config.certP12Path)
          data = await HttpKit.getHttpDelegate.httpPostWithCert(WX_DOMAIN.CHINA.concat(WX_API_TYPE.REFUND), xml, pfx, config.mchId)
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }

        break
      default:
        break
    }
  }
}
