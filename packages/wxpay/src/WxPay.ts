import { HttpKit, Kits, SIGN_TYPE } from '@tnwx/kits'
import { PayKit } from './PayKit'
import { WX_API_TYPE } from './WxApiType'
import { WX_DOMAIN } from './WxDomain'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信支付
 */
export class WxPay {
  /**
   * 获取沙箱环境验签秘钥
   * @param mchId  商户号
   * @param key api 密钥
   * @param signType 签名类型 默认为 MD5 加密
   */
  public static getSignKey(mchId: string, key: string, signType = SIGN_TYPE.SIGN_TYPE_MD5): Promise<any> {
    return new Promise(function (resolve, reject) {
      let reqObj: any = {
        mch_id: mchId,
        nonce_str: Kits.generateStr() //生成随机字符串
      }
      Kits.generateSignedXml(reqObj, key, signType)
        .then(xml => {
          HttpKit.getHttpDelegate
            .httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.GET_SIGN_KEY), String(xml))
            .then(data => {
              resolve(data)
            })
            .catch(error => {
              reject(error)
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  /**
   * 判断异步通知中的 sign 是否有效
   * @param notifyData 通知中的数据对象
   * @param key api 密钥
   */
  public static notifySignatureValid(notifyData: any, key: string): boolean {
    let signType: SIGN_TYPE
    let signTypeInData = notifyData[Kits.FIELD_SIGN_TYPE]
    if (!signTypeInData) {
      signType = SIGN_TYPE.SIGN_TYPE_MD5
    } else {
      signTypeInData = String(signTypeInData).trim()
      if (signTypeInData.length === 0) {
        signType = SIGN_TYPE.SIGN_TYPE_MD5
      } else if (signTypeInData === SIGN_TYPE.SIGN_TYPE_MD5) {
        signType = SIGN_TYPE.SIGN_TYPE_MD5
      } else if (signTypeInData === SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
        signType = SIGN_TYPE.SIGN_TYPE_HMACSHA256
      } else {
        throw new Error('Invalid sign_type: ' + signTypeInData + ' in pay result notify')
      }
    }
    return this.isSignatureValid(notifyData, key, signType)
  }

  /**
   * 验证签名
   * @param data 通知中的数据对象
   * @param key api 密钥
   * @param signType 签名类型
   */
  public static isSignatureValid(data: any, key: string, signType: SIGN_TYPE): boolean {
    signType = signType || SIGN_TYPE.SIGN_TYPE_MD5
    if (data || typeof data !== 'object') {
      return false
    } else if (!data[Kits.FIELD_SIGN]) {
      return false
    } else {
      return data[Kits.FIELD_SIGN] === Kits.generateSignature(data, key, signType)
    }
  }

  /**
   * 公众号支付/小程序-预付订单再次签名,注意此处签名方式需与统一下单的签名类型一致
   * @param prepayId  预付订单号
   * @param appId     应用编号
   * @param apiKey    API Key
   * @param signType  签名方式
   */
  public static prepayIdCreateSign(prepayId: string, appId: string, apiKey: string, signType = SIGN_TYPE.SIGN_TYPE_MD5): Object {
    let data = {
      appId: appId,
      timeStamp: parseInt((Date.now() / 1000).toString()),
      nonceStr: Kits.generateStr(),
      package: 'prepay_id='.concat(prepayId),
      signType: signType
    }
    let packageSign: string = Kits.generateSignature(data, apiKey, signType)
    data['paySign'] = packageSign
    return data
  }

  /**
   * APP 支付-预付订单再次签名,注意此处签名方式需与统一下单的签名类型一致
   * @param prepayId  预付订单号
   * @param appId     应用编号
   * @param partnerId 商户号
   * @param apiKey    API Key
   * @param signType  签名方式
   */
  public static appPrepayIdCreateSign(prepayId: string, appId: string, partnerId: string, apiKey: string, signType = SIGN_TYPE.SIGN_TYPE_MD5): Object {
    let data = {
      appid: appId,
      partnerid: partnerId,
      prepayid: prepayId,
      package: 'Sign=WXPay',
      timestamp: parseInt((Date.now() / 1000).toString()),
      noncestr: Kits.generateStr()
    }
    let packageSign: string = Kits.generateSignature(data, apiKey, signType)
    data['sign'] = packageSign
    return data
  }

  /**
   * 微信支付v3 创建签名
   *
   * @param {Array<string>} unSignArray 待签名参数数组
   * @param {Buffer} key key.pem 证书
   * @returns {string}  签名字符串
   */
  public static createSign(unSignArray: Array<string>, key: Buffer): string {
    return PayKit.createSign(unSignArray, key);
  }
}
