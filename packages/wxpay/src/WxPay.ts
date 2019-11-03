import { HttpKit, Kits, SIGN_TYPE } from '@tnw/kits'
import { WX_API_TYPE } from './WxApiType'
import { WX_DOMAIN } from './WxDomain'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信支付
 */
export class WxPay {
  public static getSignKey(mchId: string, key: string) {
    return new Promise(function (resolve, reject) {
      let reqObj: any = {
        mch_id: mchId,
        nonce_str: Kits.generateStr() //生成随机字符串
      }
      // 生成签名
      let sign: string = Kits.generateSignature(reqObj, key, SIGN_TYPE.SIGN_TYPE_MD5)
      reqObj['sign'] = sign
      // obj 对象转化为 xml
      Kits.obj2xml(reqObj)
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
   * @param notifyData
   * @param key api key
   */
  public static notifySignatureValid(notifyData: any, key: string) {
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
   * @param data
   * @param key
   * @param signTypeParam
   */
  public static isSignatureValid(data: any, key: string, signTypeParam: SIGN_TYPE) {
    let signType = signTypeParam || SIGN_TYPE.SIGN_TYPE_MD5
    if (data === null || typeof data !== 'object') {
      return false
    } else if (!data[Kits.FIELD_SIGN]) {
      return false
    } else {
      return data[Kits.FIELD_SIGN] === Kits.generateSignature(data, key, signType)
    }
  }
}
