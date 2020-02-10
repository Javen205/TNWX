import { HttpKit, Kits, SIGN_TYPE } from '@tnwx/kits'
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
  public static getSignKey(mchId: string, key: string, signType: SIGN_TYPE.SIGN_TYPE_MD5) {
    return new Promise(function(resolve, reject) {
      let reqObj: any = {
        mch_id: mchId,
        nonce_str: Kits.generateStr() //生成随机字符串
      }
      // 生成签名
      let sign: string = Kits.generateSignature(reqObj, key, signType)
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
   * @param notifyData 通知中的数据对象
   * @param key api 密钥
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
   * @param data 通知中的数据对象
   * @param key api 密钥
   * @param signType 签名类型
   */
  public static isSignatureValid(data: any, key: string, signType: SIGN_TYPE) {
    signType = signType || SIGN_TYPE.SIGN_TYPE_MD5
    if (data || typeof data !== 'object') {
      return false
    } else if (!data[Kits.FIELD_SIGN]) {
      return false
    } else {
      return data[Kits.FIELD_SIGN] === Kits.generateSignature(data, key, signType)
    }
  }
}
