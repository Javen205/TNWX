import * as crypto from 'crypto'
import { QyApiConfigKit } from '@tnwx/accesstoken'

export class QyWeChat {
  /**
   *  验证成为开发者
   *  @param signature
   *  @param timestamp
   *  @param nonce
   *  @param echostr
   */
  public static checkSignature(signature: string, timestamp: string, nonce: string, echostr: string): string {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [QyApiConfigKit.getToken, timestamp, nonce].sort().join('')
    //创建加密类型
    const hashCode = crypto.createHash('sha1')
    //对传入的字符串进行加密
    let tempSignature = hashCode.update(tempStr, 'utf8').digest('hex')
    //校验签名
    if (tempSignature === signature) {
      return echostr
    } else {
      return '签名异常'
    }
  }
}
