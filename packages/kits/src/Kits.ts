/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 常用的工具方法
 */
import { parseString, Builder } from 'xml2js'
import * as crypto from 'crypto'
import * as uuid from 'uuid'

export enum SIGN_TYPE {
  SIGN_TYPE_HMACSHA256 = 'HMAC-SHA256',
  SIGN_TYPE_MD5 = 'MD5'
}

export class Kits {
  public static FIELD_SIGN = 'sign'
  public static FIELD_SIGN_TYPE = 'sign_type'

  /**
   * AES-128-CBC 加密方法
   * @param key  加密key
   * @param iv   向量
   * @param data 需要加密的数据
   */
  public static aes128cbcEncrypt(key: Buffer, iv: Buffer, data: string): string {
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    let crypted = cipher.update(data, 'utf8', 'binary')
    crypted += cipher.final('binary')
    crypted = Buffer.from(crypted, 'binary').toString('base64')
    return crypted
  }

  /**
   * AES-128-CBC     解密方法
   * @param key      解密的key
   * @param iv       向量
   * @param crypted  密文
   */
  public static aes128cbcDecrypt(key: Buffer, iv: Buffer, crypted: string): string {
    crypted = Buffer.from(crypted, 'base64').toString('binary')
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    let decoded = decipher.update(crypted, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    return decoded
  }

  /**
   * AES-256-ECB 加密方法
   * @param key  加密key
   * @param iv   向量
   * @param data 需要加密的数据
   */
  public static aes256ecbEncrypt(key: Buffer, iv: Buffer, data: string): string {
    let cipher = crypto.createCipheriv('aes-256-ecb', key, iv)
    let crypted = cipher.update(data, 'utf8', 'binary')
    crypted += cipher.final('binary')
    crypted = Buffer.from(crypted, 'binary').toString('base64')
    return crypted
  }

  /**
   * AES-256-ECB     解密方法
   * @param key      解密的key
   * @param iv       向量
   * @param crypted  密文
   */
  public static aes256ecbDecrypt(key: Buffer, iv: Buffer, crypted: string) {
    crypted = Buffer.from(crypted, 'base64').toString('binary')
    let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    let decoded = decipher.update(crypted, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    return decoded
  }

  /**
   * hmacsha256 加密
   * @param data
   * @param key
   */
  public static hmacsha256(data: string, key: string): string {
    return crypto
      .createHmac('sha256', key)
      .update(data, 'utf8')
      .digest('hex')
  }

  /**
   * sha256 加密
   * @param data
   */
  public static sha256(data: string): string {
    return this.hash(data, 'sha256')
  }

  /**
   * sha256 加密
   * @param data
   */
  public static sha256x(data: crypto.BinaryLike) {
    return this.hashx(data, 'sha256')
  }

  /**
   * sha1加密
   * @param data
   */
  public static sha1(data: string): string {
    return this.hash(data, 'sha1')
  }

  /**
   * md5 加密
   * @param data
   */
  public static md5(data: string): string {
    return this.hash(data, 'md5')
  }

  public static hash(data: string, algorithm: string) {
    return crypto
      .createHash(algorithm)
      .update(data, 'utf8')
      .digest('hex')
  }

  public static hashx(data: crypto.BinaryLike, algorithm: string) {
    return crypto
      .createHash(algorithm)
      .update(data)
      .digest('hex')
  }

  /**
   * SHA256withRSA
   * @param data 待加密字符
   * @param privatekey 私钥key
   */
  public static sha256WithRsa(data: string, privatekey: Buffer): string {
    return crypto
      .createSign('RSA-SHA256')
      .update(data)
      .sign(privatekey, 'base64')
  }

  /**
   * SHA256withRSA 验证签名
   * @param publicKey 公钥key
   * @param signature 待验证的签名串
   * @param data 需要验证的字符串
   */
  public static sha256WithRsaVerify(publicKey: Buffer, signature: string, data: string) {
    return crypto
      .createVerify('RSA-SHA256')
      .update(data)
      .verify(publicKey, signature, 'base64')
  }

  /**
   * AEAD_AES_256_GCM 解密
   * @param key
   * @param nonce
   * @param associatedData
   * @param ciphertext
   */
  public static aes256gcmDecrypt(key: string, nonce: string, associatedData: string, ciphertext: string): string {
    let ciphertextBuffer = Buffer.from(ciphertext, 'base64')
    let authTag = ciphertextBuffer.slice(ciphertextBuffer.length - 16)
    let data = ciphertextBuffer.slice(0, ciphertextBuffer.length - 16)
    let decipherIv = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    decipherIv.setAuthTag(Buffer.from(authTag))
    decipherIv.setAAD(Buffer.from(associatedData))
    let decryptStr = decipherIv.update(data, null, 'utf8')
    decipherIv.final()
    return decryptStr
  }

  /**
   * 随机生成字符串
   */
  public static generateStr(): string {
    return uuid.v4().replace(/\-/g, '')
  }

  /**
   * 生成签名
   * @param data
   * @param key api key
   * @param signTypeParam 签名类型
   */
  public static generateSignature(data: any, key: string, signTypeParam: SIGN_TYPE, signKeyType = SIGN_KEY_TYPE.KEY): string {
    let signType = signTypeParam || SIGN_TYPE.SIGN_TYPE_MD5
    if (signType !== SIGN_TYPE.SIGN_TYPE_MD5 && signType !== SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
      throw new Error('Invalid signType: ' + signType)
    }
    let combineStr = ''
    let sortArray = Object.keys(data).sort()
    for (let i = 0; i < sortArray.length; ++i) {
      let key = sortArray[i]
      if (key !== this.FIELD_SIGN && data[key]) {
        let value = String(data[key])
        if (value.length > 0) {
          combineStr = combineStr + key + '=' + value + '&'
        }
      }
    }
    if (combineStr.length === 0) {
      throw new Error('There is no data to generate signature')
    } else {
      if (signKeyType === SIGN_KEY_TYPE.KEY) {
        combineStr = combineStr + 'key=' + key
      } else {
        if (signType !== SIGN_TYPE.SIGN_TYPE_MD5) {
          throw new Error('work wx generate signature require the use of md5')
        }
        combineStr = combineStr + 'secret=' + key
      }

      if (signType === SIGN_TYPE.SIGN_TYPE_MD5) {
        return this.md5(combineStr).toUpperCase()
      } else if (signType === SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
        return this.hmacsha256(combineStr, key).toUpperCase()
      } else {
        throw new Error('Invalid signType: ' + signType)
      }
    }
  }

  /**
   * 生成带有签名的 xml 数据
   * @param data
   * @param key
   * @param signType
   */
  public static generateSignedXml(data: object, key: string, signType: SIGN_TYPE): Promise<any> {
    let that = this
    let clonedData = JSON.parse(JSON.stringify(data))
    // 添加签名 sign
    clonedData[this.FIELD_SIGN] = this.generateSignature(data, key, signType)
    return new Promise(function(resolve, reject) {
      that
        .obj2xml(clonedData)
        .then(function(xmlStr) {
          resolve(xmlStr)
        })
        .catch(function(err) {
          reject(err)
        })
    })
  }

  /**
   * xml 字符串转换成对象
   * @param xmlStr
   */
  public static xml2obj(xmlStr: string): Promise<any> {
    return new Promise(function(resolve, reject) {
      parseString(xmlStr, function(err, result) {
        if (err) {
          reject(err)
        } else {
          let data = result['xml']
          let obj: any = {}
          Object.keys(data).forEach(function(key) {
            if (data[key].length > 0) {
              obj[key] = data[key][0]
            }
          })
          resolve(obj)
        }
      })
    })
  }

  /**
   * 普通对象转换成 xml 字符串
   * @param obj
   */
  public static obj2xml(obj: Object): Promise<any> {
    return new Promise(function(resolve, reject) {
      let builder = new Builder({ cdata: true, rootName: 'xml' })
      try {
        let xmlStr = builder.buildObject(obj)
        resolve(xmlStr)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export enum SIGN_KEY_TYPE {
  KEY = 'key',
  SECRET = 'secret'
}
