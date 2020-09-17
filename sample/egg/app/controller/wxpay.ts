import { Controller } from 'egg'
import { WxPayApiConifgKit, WX_DOMAIN, WX_API_TYPE, WxPayApiConfig, PayKit, WxPay, Kits, WX_TRADE_TYPE, SIGN_TYPE, HttpKit, RequestMethod } from 'tnwx'
import * as fs from 'fs'
import * as path from 'path'
import * as x509 from 'x509'

export default class WxPayController extends Controller {
  public async index() {
    const { ctx } = this

    let type: number = parseInt(ctx.query.type)

    let config: WxPayApiConfig = WxPayApiConifgKit.getConfig
    let ip = ctx.request.ip

    console.log(`type: ${type}, ip:${ip}`)

    switch (type) {
      case 100:
        // 获取配置
        try {
          const cert = x509.parseCert(config.certPath)
          console.log(`证书序列号：${cert.serial}`)
          ctx.body = cert
        } catch (error) {
          console.log(error)
        }
        break
      case 0:
        // 获取配置
        try {
          ctx.body = JSON.stringify(config)
        } catch (error) {
          console.log(error)
        }
        break
      case 1:
        // 获取沙箱环境 key
        try {
          let data = await WxPay.getSignKey(config.mchId, config.apiKey, SIGN_TYPE.SIGN_TYPE_MD5)
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }
        break
      case 2:
        // 统一下单
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

          let data = await HttpKit.getHttpDelegate.httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.UNIFIED_ORDER), xml)
          // ctx.set('Content-Type', 'text/xml')
          // ctx.body = data
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }
        break
      case 3:
        // 双向证书 退款
        try {
          let refundObj = {
            appid: config.appId,
            mch_id: config.mchId,
            nonce_str: Kits.generateStr(), //生成随机字符串
            out_trade_no: Kits.generateStr(),
            out_refund_no: Kits.generateStr(),
            total_fee: 666,
            refund_fee: 100,
            sign_type: SIGN_TYPE.SIGN_TYPE_HMACSHA256
          }
          let xml = await Kits.generateSignedXml(refundObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_HMACSHA256)
          let pfx: Buffer = fs.readFileSync(config.certP12Path)
          let data = await HttpKit.getHttpDelegate.httpPostWithCert(WX_DOMAIN.CHINA.concat(WX_API_TYPE.REFUND), xml, pfx, config.mchId)
          ctx.body = await Kits.xml2obj(data)
        } catch (error) {
          console.log(error)
        }
        break
      case 4:
        // Api-v3 get 请求
        try {
          let result = await PayKit.v3(
            RequestMethod.GET,
            WX_DOMAIN.CHINA, //
            WX_API_TYPE.GET_CERTIFICATES,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath)
          )
          console.log(`result.data:${result.data}`)

          // 应答报文主体
          let data = JSON.stringify(result.data)
          // 应答状态码
          console.log(`status:${result.status}`)
          console.log(`data:${data}`)
          // http 请求头
          let headers = result.headers
          // 证书序列号
          let serial = headers['wechatpay-serial']
          // 应答时间戳
          let timestamp = headers['wechatpay-timestamp']
          // 应答随机串
          let nonce = headers['wechatpay-nonce']
          // 应答签名
          let signature = headers['wechatpay-signature']

          console.log(`serial:\n${serial}`)
          console.log(`timestamp:\n${timestamp}`)
          console.log(`nonce:\n${nonce}`)
          console.log(`signature:\n${signature}`)

          // 根据序列号查证书  验证签名
          // let verifySignature: boolean = PayKit.verifySignature(signature, data, nonce, timestamp, fs.readFileSync(ctx.app.config.WxPayConfig.wxCertPath))
          let verifySignature: boolean = PayKit.verifySign(headers, data, fs.readFileSync(ctx.app.config.WxPayConfig.wxCertPath))
          console.log(`verifySignature:${verifySignature}`)

          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 5:
        // Api-v3 get 请求 有参数
        try {
          let params: Map<string, string> = new Map()
          params.set('service_id', '500001')
          params.set('appid', 'wxd678efh567hg6787')
          params.set('openid', 'oUpF8uMuAJO_M2pxb1Q9zNjWeS6o')

          let result = await PayKit.v3(
            RequestMethod.GET,
            WX_DOMAIN.CHINA, //
            WX_API_TYPE.PAY_SCORE_USER_SERVICE_STATE,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            '',
            params
          )
          console.log(`status:${result.status}`)

          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break
      case 6:
        // Api-v3 delete 请求
        try {
          let result = await PayKit.v3(
            RequestMethod.DELETE,
            WX_DOMAIN.CHINA, //
            WX_API_TYPE.MERCHANT_SERVICE_COMPLAINTS_NOTIFICATIONS,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath)
          )

          ctx.body = `status:${result.status}`
        } catch (error) {
          console.log(error)
        }
        break
      case 7:
        // Api-v3 post 请求
        try {
          let data: string = JSON.stringify({
            url: 'https://gitee.com/javen205/TNWX'
          })

          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.POST,
            WX_DOMAIN.CHINA, //
            WX_API_TYPE.MERCHANT_SERVICE_COMPLAINTS_NOTIFICATIONS,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )

          console.log(`status:${result.status}`)
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break

      case 8:
        // 证书和回调报文解密
        let certPath = '/Users/Javen/cert/platform_cert.pem'
        try {
          let decrypt = PayKit.aes256gcmDecrypt(
            config.apiKey3,
            ctx.app.config.AEAD_AES_256_GCM.nonce,
            ctx.app.config.AEAD_AES_256_GCM.associated_data,
            ctx.app.config.AEAD_AES_256_GCM.ciphertext
          )
          // 保存证书
          fs.writeFileSync(certPath, decrypt)
          ctx.body = decrypt
        } catch (error) {
          console.log(error)
        }
        break
      case 9:
        // 微信公众号、微信小程序预付订单二次签名
        try {
          let data = WxPay.prepayIdCreateSign('prepayId', config.appId, config.apiKey, SIGN_TYPE.SIGN_TYPE_HMACSHA256)
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 10:
        // APP支付二次签名
        try {
          let data = WxPay.appPrepayIdCreateSign('prepayId', config.appId, config.mchId, config.apiKey, SIGN_TYPE.SIGN_TYPE_HMACSHA256)
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 11:
        // 文件上传
        try {
          let filePath = '/Users/Javen/Documents/pic/wxpay.png'

          let sha256 = Kits.sha256x(fs.readFileSync(filePath))
          let filename = path.basename(filePath)

          console.log(sha256)
          console.log(filename)

          let data: string = JSON.stringify({
            filename,
            sha256
          })

          console.log(`data:${data}`)

          let result = await PayKit.exeUpload(
            WX_DOMAIN.CHINA, //
            WX_API_TYPE.MERCHANT_UPLOAD_MEDIA,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            filePath,
            data
          )
          console.log(`status:${result.status}`)

          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break
      case 12:
        try {
          let data: string = JSON.stringify({
            appid: config.appId,
            mchid: config.mchId,
            description: 'TNWX 微信支付-扫码支付',
            out_trade_no: Kits.generateStr(),
            notify_url: config.getDomin,
            amount: {
              total: 800
            }
          })

          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.POST,
            WX_DOMAIN.CHINA,
            WX_API_TYPE.NATIVE_PAY,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )
          console.log(`status:${result.status}`)
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break;
      case 13:
        try {
          let data: string = JSON.stringify({
            appid: config.appId,
            mchid: config.mchId,
            description: 'TNWX 微信支付-JSAPI支付',
            out_trade_no: Kits.generateStr(),
            notify_url: config.getDomin,
            amount: {
              total: 800
            },
            payer: {
              openid: 'o-_-itxuXeGW3O1cxJ7FXNmq8Wf8'
            }
          })

          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.POST,
            WX_DOMAIN.CHINA,
            WX_API_TYPE.JS_API_PAY,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )
          let status = result.status
          let prepayId: string, paySign: string
          if (status === 200) {
            prepayId = result.data.prepay_id
            let appId: string = config.appId
            let timeStamp: string = parseInt((Date.now() / 1000).toString()) + ''
            let nonceStr: string = Kits.generateStr()
            let ext: string = 'prepayId='.concat(prepayId)
            paySign = WxPay.createSign([appId, timeStamp, nonceStr, ext], fs.readFileSync(config.keyPath))
            let json = JSON.stringify({
              appId: appId,
              timeStamp: timeStamp,
              nonceStr: nonceStr,
              package: ext,
              signType: 'RSA',
              paySign: paySign,
            })
            ctx.body = json
            return
          }
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break;
      case 14:
        try {
          let data: string = JSON.stringify({
            appid: config.appId,
            mchid: config.mchId,
            description: 'TNWX 微信支付-H5支付',
            out_trade_no: Kits.generateStr(),
            notify_url: config.getDomin,
            amount: {
              total: 800
            },
            scene_info: {
              payer_client_ip: ip,
              h5_info: {
                type: 'Wap'
              }
            }
          })
          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.POST,
            WX_DOMAIN.CHINA,
            WX_API_TYPE.H5_PAY,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )
          console.log(`status:${result.status}`)
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break;
      case 15:
        try {
          let data: string = JSON.stringify({
            url: 'https://gitee.com/javen205/IJPay'
          })
          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.POST,
            WX_DOMAIN.CHINA,
            WX_API_TYPE.MERCHANT_SERVICE_COMPLAINTS_NOTIFICATIONS,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )
          console.log(`status:${result.status}`)
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break;
      case 16:
        try {
          let data: string = JSON.stringify({
            url: 'https://gitee.com/javen205/IJPay'
          })
          console.log(`data:${data}`)

          let result = await PayKit.v3(
            RequestMethod.PUT,
            WX_DOMAIN.CHINA,
            WX_API_TYPE.MERCHANT_SERVICE_COMPLAINTS_NOTIFICATIONS,
            config.mchId,
            x509.parseCert(config.certPath).serial,
            fs.readFileSync(config.keyPath),
            data
          )
          console.log(`status:${result.status}`)
          ctx.body = result.data
        } catch (error) {
          console.log(error)
        }
        break;
      default:
        break
    }
  }
}
