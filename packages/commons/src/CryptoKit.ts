import * as crypto from 'crypto'
import * as xml2js from 'xml2js'
import { ApiConfig } from '@tnwx/accesstoken'

export class CryptoKit {
  //用于构建 xml 结构
  static xmlParser = new xml2js.Builder({
    rootName: 'xml',
    cdata: true,
    headless: true,
    renderOpts: {
      pretty: true,
      indent: ' '
    }
  })
  aesModel: string
  token: string
  appId: string
  encodingAesKey: Buffer
  iv: Buffer
  msgSignature: string
  timestamp: string
  nonce: string

  constructor(config: ApiConfig, msgSignature: string, timestamp: string, nonce: string) {
    this.aesModel = 'aes-256-cbc'
    this.token = config.getToken
    this.appId = config.getAppId
    this.encodingAesKey = Buffer.from(config.getEncodingAesKey + '=', 'base64')
    this.iv = this.encodingAesKey.slice(0, 16)
    this.msgSignature = msgSignature
    this.timestamp = timestamp
    this.nonce = nonce
  }

  getMsgSignature(encryptedMsg: string): string {
    //将token、timestamp、nonce、cryptedMsg 四个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [this.token, this.timestamp, this.nonce, encryptedMsg].sort().join('')
    //创建加密类型
    const hashCode = crypto.createHash('sha1')
    //对传入的字符串进行加密
    let tempSignature = hashCode.update(tempStr, 'utf8').digest('hex')
    //将 sha1 加密的签名字符串返回
    return tempSignature
  }

  decrypt(echostr: string): string {
    // 实例 AES 解密对象
    let deCipheriv = crypto.createDecipheriv(this.aesModel, this.encodingAesKey, this.iv)
    // 设置自定填充数据为 false
    deCipheriv.setAutoPadding(false)
    // 对密文解密对密文解密 并去除前 16 个随机字符串
    let decipheredBuff = Buffer.concat([deCipheriv.update(echostr, 'base64'), deCipheriv.final()])
    decipheredBuff = this.PKCS7Decoder(decipheredBuff)
    // 移除头部16个随机字节
    let len_netOrder_corpid = decipheredBuff.slice(16)
    // 4个字节的 msg_len
    let msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0)
    // 截取 msg_len 长度的 msg
    let result = len_netOrder_corpid.slice(4, msg_len + 4).toString()
    return result
  }
  /**
   *  微信消息解密
   *  @param encryptMsg 加密字符串
   */
  decryptMsg(encryptMsg: string): any {
    //获取签名认证
    let tempSignature = this.getMsgSignature(encryptMsg)
    //判断消息是否来自微信服务器
    if (this.msgSignature !== tempSignature) {
      throw new Error('msgSignature is not invalid')
    }
    //实例 AES 解密对象
    let deCipheriv = crypto.createDecipheriv(this.aesModel, this.encodingAesKey, this.iv)
    //设置自定填充数据为 false
    deCipheriv.setAutoPadding(false)
    //对密文解密 并去除前 16 个随机字符串
    let deEncryptedMsg = Buffer.concat([deCipheriv.update(encryptMsg, 'base64'), deCipheriv.final()]).toString('utf8')
    //获取填充字符串的位置
    let pad = deEncryptedMsg.charCodeAt(deEncryptedMsg.length - 1)
    //对微信消息进行处理
    deEncryptedMsg = deEncryptedMsg.slice(20, -pad).replace(/<\/xml>.*/, '</xml>')
    //讲解密后的XML 转为 JSON 对象
    return this.parseXmlToObj(deEncryptedMsg)
  }

  /**
   *  微信消息加密
   *  @param xmlMsg
   */
  encryptMsg(xmlMsg: string): string {
    //声明 16位的随机字符串
    let random = crypto.randomBytes(8).toString('hex')
    let text = Buffer.from(xmlMsg)
    let buf = Buffer.alloc(4)
    buf.writeUInt32BE(text.length, 0)
    //进行PKCS7补位
    let pack = this.KCS7Encoder(20 + text.length + this.appId.length)
    //拼接要加密的字符串
    let content = random + buf.toString('binary') + text.toString('binary') + this.appId + pack
    //实例 AES 加密对象
    let cipheriv = crypto.createCipheriv(this.aesModel, this.encodingAesKey, this.iv)
    //设置自定填充数据为 false
    cipheriv.setAutoPadding(false)
    //对明文加密
    let encryptedMsg = Buffer.concat([cipheriv.update(content, 'binary'), cipheriv.final()]).toString('base64')
    //获取认证签名
    let msgSignature = this.getMsgSignature(encryptedMsg)
    //返回XML结果
    return CryptoKit.xmlParser.buildObject({
      Encrypt: encryptedMsg,
      MsgSignature: msgSignature,
      TimeStamp: this.timestamp,
      Nonce: this.nonce
    })
  }

  KCS7Encoder(textLength: number): string {
    let blockSize = 32
    // 计算需要填充的位数
    let amountToPad = blockSize - (textLength % blockSize)
    if (amountToPad === 0) {
      amountToPad = blockSize
    }
    // 获得补位所用的字符
    let pad = String.fromCharCode(amountToPad),
      s: string[] = []
    for (let i = 0; i < amountToPad; i++) s.push(pad)
    return s.join('')
  }

  PKCS7Decoder(buff: Buffer) {
    var pad = buff[buff.length - 1]
    if (pad < 1 || pad > 32) {
      pad = 0
    }
    return buff.slice(0, buff.length - pad)
  }

  parseXmlToObj(xml: string): any {
    if (!xml || typeof xml != 'string') return {}
    let re: any = {}
    xml = xml.replace(/^<xml>|<\/xml>$/g, '')
    let ms = xml.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/gi)
    if (ms && ms.length > 0) {
      ms.forEach(t => {
        let ms = t.match(/<([a-z0-9]+)>([\s\S]*?)<\/\1>/i) || []
        let tagName = ms[1]
        let cdata = ms[2] || ''
        cdata = cdata.replace(/^\s*<\!\[CDATA\[\s*|\s*\]\]>\s*$/g, '')
        re[tagName] = cdata
      })
    }
    return re
  }
}
