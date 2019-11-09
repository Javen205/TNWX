import * as crypto from 'crypto'
import { parseString } from 'xml2js'
import { CryptoKit } from './kit/CryptoKit'
import { ApiConfigKit } from '@tnwx/accesstoken'
import { InMsgParser } from './entity/msg/InMsgParser'
import { InMsg } from './entity/msg/in/InMsg'
import { InTextMsg } from './entity/msg/in/InTextMsg'
import { OutMsg } from './entity/msg/out/OutMsg'
import { InNotDefinedMsg } from './entity/msg/in/InNotDefinedMsg'
import { MsgAdapter } from './msgAdapter'
import { OutTextMsg } from './entity/msg/out/OutTextMsg'
import { InImageMsg } from './entity/msg/in/InImageMsg'
import { InLinkMsg } from './entity/msg/in/InLinkMsg'
import { InLocationMsg } from './entity/msg/in/InLocationMsg'
import { InShortVideoMsg } from './entity/msg/in/InShortVideoMsg'
import { InVideoMsg } from './entity/msg/in/InVideoMsg'
import { InVoiceMsg } from './entity/msg/in/InVoiceMsg'
import { InSpeechRecognitionResults } from './entity/msg/in/InSpeechRecognitionResults'
import { OutImageMsg } from './entity/msg/out/OutImageMsg'
import { OutMusicMsg } from './entity/msg/out/OutMusicMsg'
import { OutNewsMsg } from './entity/msg/out/OutNewsMsg'
import { OutVideoMsg } from './entity/msg/out/OutVideoMsg'
import { OutVoiceMsg } from './entity/msg/out/OutVoiceMsg'
import { InFollowEvent } from './entity/msg/in/event/InFollowEvent'
import { InLocationEvent } from './entity/msg/in/event/InLocationEvent'
import { InMenuEvent } from './entity/msg/in/event/InMenuEvent'
import { InQrCodeEvent } from './entity/msg/in/event/InQrCodeEvent'
import { InTemplateMsgEvent } from './entity/msg/in/event/InTemplateMsgEvent'
import { OutCustomMsg } from './entity/msg/out/OutCustomMsg'
import { JsTicketApi, JsApiType } from './api/JsTicketApi'
import { InShakearoundUserShakeEvent } from './entity/msg/in/event/InShakearoundUserShakeEvent'

export class WeChat {
  /**
   *  JSSDK签名
   *  @param jsapi_ticket
   *  @param nonce_str
   *  @param timestamp
   *  @param url
   */
  public static async jssdkSignature(nonce_str: string, timestamp: string, url: string, jsapi_ticket?: string) {
    if (!jsapi_ticket) {
      let jsTicket = await JsTicketApi.getTicket(JsApiType.JSAPI)
      if (jsTicket) {
        jsapi_ticket = jsTicket.getTicket
        if (ApiConfigKit.isDevMode) {
          console.debug('jsapi_ticket:', jsapi_ticket)
        }
      }
    }
    let str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url
    return crypto
      .createHash('sha1')
      .update(str, 'utf8')
      .digest('hex')
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
  public static handleMsg(msgAdapter: MsgAdapter, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string) {
    //实例微信消息加解密
    let cryptoKit: CryptoKit
    return new Promise(function(resolve, reject) {
      parseString(msgXml, { explicitArray: false }, function(err, result) {
        if (err) {
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

        let inMsg: InMsg = InMsgParser.parse(result)
        let responseMsg: string
        let outMsg: OutMsg

        // 处理接收的消息
        if (inMsg instanceof InTextMsg) {
          outMsg = msgAdapter.processInTextMsg(<InTextMsg>inMsg)
        } else if (inMsg instanceof InImageMsg) {
          outMsg = msgAdapter.processInImageMsg(<InImageMsg>inMsg)
        } else if (inMsg instanceof InLinkMsg) {
          outMsg = msgAdapter.processInLinkMsg(<InLinkMsg>inMsg)
        } else if (inMsg instanceof InLocationMsg) {
          outMsg = msgAdapter.processInLocationMsg(<InLocationMsg>inMsg)
        } else if (inMsg instanceof InShortVideoMsg) {
          outMsg = msgAdapter.processInShortVideoMsg(<InShortVideoMsg>inMsg)
        } else if (inMsg instanceof InVideoMsg) {
          outMsg = msgAdapter.processInVideoMsg(<InVideoMsg>inMsg)
        } else if (inMsg instanceof InVoiceMsg) {
          outMsg = msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg)
        } else if (inMsg instanceof InVoiceMsg) {
          outMsg = msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg)
        } else if (inMsg instanceof InSpeechRecognitionResults) {
          outMsg = msgAdapter.processInSpeechRecognitionResults(<InSpeechRecognitionResults>inMsg)
        } else if (inMsg instanceof InFollowEvent) {
          outMsg = msgAdapter.processInFollowEvent(<InFollowEvent>inMsg)
        } else if (inMsg instanceof InLocationEvent) {
          outMsg = msgAdapter.processInLocationEvent(<InLocationEvent>inMsg)
        } else if (inMsg instanceof InMenuEvent) {
          outMsg = msgAdapter.processInMenuEvent(<InMenuEvent>inMsg)
        } else if (inMsg instanceof InQrCodeEvent) {
          outMsg = msgAdapter.processInQrCodeEvent(<InQrCodeEvent>inMsg)
        } else if (inMsg instanceof InTemplateMsgEvent) {
          outMsg = msgAdapter.processInTemplateMsgEvent(<InTemplateMsgEvent>inMsg)
        } else if (inMsg instanceof InShakearoundUserShakeEvent) {
          outMsg = msgAdapter.processInShakearoundUserShakeEvent(<InShakearoundUserShakeEvent>inMsg)
        } else if (inMsg instanceof InNotDefinedMsg) {
          if (ApiConfigKit.isDevMode()) {
            console.debug('未能识别的消息类型。 消息 xml 内容为：\n')
            console.debug(result)
          }
          outMsg = msgAdapter.processIsNotDefinedMsg(<InNotDefinedMsg>inMsg)
        }

        // 处理发送的消息
        if (outMsg instanceof OutTextMsg) {
          let outTextMsg = <OutTextMsg>outMsg
          if (outTextMsg.getContent.trim()) {
            responseMsg = outTextMsg.toXml()
          } else {
            responseMsg = ''
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
        }
        //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
        responseMsg = isEncryptMessage ? cryptoKit.encryptMsg(responseMsg) : responseMsg
        if (ApiConfigKit.isDevMode()) {
          console.debug('发送消息')
          console.debug(responseMsg)
          console.debug('--------------------------------------------------------\n')
        }
        //返回给微信服务器
        resolve(responseMsg)
      })
    })
  }
}
