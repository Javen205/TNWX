import * as crypto from 'crypto'
import { parseString } from 'xml2js'
import { ApiConfigKit, AccessToken } from '@tnwx/accesstoken'
import {
  CryptoKit,
  MsgAdapter,
  InMsgParser,
  OutMsg,
  InTextMsg,
  InImageMsg,
  InLinkMsg,
  InLocationMsg,
  InShortVideoMsg,
  InVideoMsg,
  InVoiceMsg,
  InSpeechRecognitionResults,
  InFollowEvent,
  InLocationEvent,
  InMenuEvent,
  InQrCodeEvent,
  InTemplateMsgEvent,
  InShakearoundUserShakeEvent,
  InNotDefinedMsg,
  OutTextMsg,
  OutImageMsg,
  OutMusicMsg,
  OutNewsMsg,
  OutVideoMsg,
  OutVoiceMsg,
  OutCustomMsg,
  JsTicketApi,
  JsApiType,
  BaseMsg,
  InComponentVerifyTicket,
  InAuthMpEvent,
  InMassEvent
} from '@tnwx/commons'
import { Kits } from '@tnwx/kits'

export class WeChat {
  /**
   * JSSDK签名
   * @param nonce_str
   * @param timestamp
   * @param url
   * @param accessToken   api_authorizer_token
   * @param jsapi_ticket
   */
  public static async jssdkSignature(nonce_str: string, timestamp: string, url: string, accessToken?: AccessToken, jsapi_ticket?: string): Promise<string> {
    if (!jsapi_ticket) {
      let jsTicket = await JsTicketApi.getTicket(JsApiType.JSAPI, accessToken)
      if (jsTicket) {
        jsapi_ticket = jsTicket.getTicket
        if (ApiConfigKit.isDevMode) {
          console.debug('jsapi_ticket:', jsapi_ticket)
        }
      }
    }
    let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url
    return Kits.sha1(str)
  }

  /**
   *  验证成为开发者
   *  @param signature
   *  @param timestamp
   *  @param nonce
   *  @param echostr
   */
  public static checkSignature(signature: string, timestamp: string, nonce: string, echostr: string): string {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [ApiConfigKit.getToken, timestamp, nonce].sort().join('')
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
  /**
   *  处理消息
   *  @param msgAdapter
   *  @param msgXml
   *  @param msgSignature
   *  @param timestamp
   *  @param nonce
   */
  public static handleMsg(msgAdapter: MsgAdapter, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string): Promise<string> {
    //实例微信消息加解密
    let cryptoKit: CryptoKit
    return new Promise(function (resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async function (err, result) {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        result = result.xml
        let isEncryptMessage: boolean = false
        //判断消息加解密方式
        if (ApiConfigKit.getApiConfig.getEncryptMessage && ApiConfigKit.getApiConfig.getEncodingAesKey) {
          isEncryptMessage = true
          cryptoKit = new CryptoKit(ApiConfigKit.getApiConfig, msgSignature || '', timestamp || '', nonce || '')
          //对加密数据解密
          result = cryptoKit.decryptMsg(result.Encrypt)
        }

        if (ApiConfigKit.isDevMode()) {
          console.debug('接收消息 isEncryptMessage=', isEncryptMessage)
          console.debug(result)
          console.debug('------------------------\n')
        }

        let inMsg: BaseMsg = InMsgParser.parse(result)
        let responseMsg: string
        let outMsg: OutMsg | string

        // 处理接收的消息
        if (inMsg instanceof InTextMsg) {
          outMsg = await msgAdapter.processInTextMsg(<InTextMsg>inMsg)
        } else if (inMsg instanceof InImageMsg) {
          outMsg = await msgAdapter.processInImageMsg(<InImageMsg>inMsg)
        } else if (inMsg instanceof InLinkMsg) {
          outMsg = await msgAdapter.processInLinkMsg(<InLinkMsg>inMsg)
        } else if (inMsg instanceof InLocationMsg) {
          outMsg = await msgAdapter.processInLocationMsg(<InLocationMsg>inMsg)
        } else if (inMsg instanceof InShortVideoMsg) {
          outMsg = await msgAdapter.processInShortVideoMsg(<InShortVideoMsg>inMsg)
        } else if (inMsg instanceof InVideoMsg) {
          outMsg = await msgAdapter.processInVideoMsg(<InVideoMsg>inMsg)
        } else if (inMsg instanceof InVoiceMsg) {
          outMsg = await msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg)
        } else if (inMsg instanceof InVoiceMsg) {
          outMsg = await msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg)
        } else if (inMsg instanceof InSpeechRecognitionResults) {
          outMsg = await msgAdapter.processInSpeechRecognitionResults(<InSpeechRecognitionResults>inMsg)
        } else if (inMsg instanceof InFollowEvent) {
          outMsg = await msgAdapter.processInFollowEvent(<InFollowEvent>inMsg)
        } else if (inMsg instanceof InLocationEvent) {
          outMsg = await msgAdapter.processInLocationEvent(<InLocationEvent>inMsg)
        } else if (inMsg instanceof InMenuEvent) {
          outMsg = await msgAdapter.processInMenuEvent(<InMenuEvent>inMsg)
        } else if (inMsg instanceof InQrCodeEvent) {
          outMsg = await msgAdapter.processInQrCodeEvent(<InQrCodeEvent>inMsg)
        } else if (inMsg instanceof InTemplateMsgEvent) {
          outMsg = await msgAdapter.processInTemplateMsgEvent(<InTemplateMsgEvent>inMsg)
        } else if (inMsg instanceof InShakearoundUserShakeEvent) {
          outMsg = await msgAdapter.processInShakearoundUserShakeEvent(<InShakearoundUserShakeEvent>inMsg)
        } else if (inMsg instanceof InComponentVerifyTicket) {
          isEncryptMessage = false
          outMsg = await msgAdapter.processInComponentVerifyTicket(<InComponentVerifyTicket>inMsg)
        } else if (inMsg instanceof InAuthMpEvent) {
          isEncryptMessage = false
          outMsg = await msgAdapter.processInAuthMpEvent(<InAuthMpEvent>inMsg)
        } else if (inMsg instanceof InMassEvent) {
          outMsg = await msgAdapter.processInMassEvent(<InMassEvent>inMsg)
        } else if (inMsg instanceof InNotDefinedMsg) {
          if (ApiConfigKit.isDevMode()) {
            console.debug('未能识别的消息类型。 消息 xml 内容为：\n')
            console.debug(result)
          }
          outMsg = await msgAdapter.processIsNotDefinedMsg(<InNotDefinedMsg>inMsg)
        }

        // 处理发送的消息
        if (outMsg instanceof OutTextMsg) {
          let outTextMsg = <OutTextMsg>outMsg
          if (outTextMsg.getContent.trim()) {
            responseMsg = outTextMsg.toXml()
          } else {
            responseMsg = 'success'
          }
        } else if (outMsg instanceof OutImageMsg) {
          responseMsg = (<OutImageMsg>outMsg).toXml()
        } else if (outMsg instanceof OutMusicMsg) {
          responseMsg = (<OutMusicMsg>outMsg).toXml()
        } else if (outMsg instanceof OutNewsMsg) {
          responseMsg = (<OutNewsMsg>outMsg).toXml()
        } else if (outMsg instanceof OutVideoMsg) {
          responseMsg = (<OutVideoMsg>outMsg).toXml()
        } else if (outMsg instanceof OutVoiceMsg) {
          responseMsg = (<OutVoiceMsg>outMsg).toXml()
        } else if (outMsg instanceof OutCustomMsg) {
          responseMsg = (<OutCustomMsg>outMsg).toXml()
        } else if (typeof outMsg === 'string') {
          responseMsg = outMsg
        }
        //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
        responseMsg = isEncryptMessage ? cryptoKit.encryptMsg(responseMsg) : responseMsg
        if (ApiConfigKit.isDevMode()) {
          console.debug(`发送消息:\n ${responseMsg}`)
          console.debug('--------------------------\n')
        }
        //返回给微信服务器
        resolve(responseMsg)
      })
    })
  }
}
