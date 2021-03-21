import { QyApiConfigKit } from '@tnwx/accesstoken'
import { parseString } from 'xml2js'
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
  InTaskEvent,
  InEnterAgentEvent,
  InBatchJobResultEvent,
  InUpdateUserEvent,
  InUpdatePartyEvent,
  InUpdateTagEvent,
  QyJsTicketApi,
  QyJsApiType,
  InSuiteTicket,
  BaseMsg,
  InAuthEvent,
  InBatchJobResult,
  InExternalContact,
  InExternalContactEvent,
  InRegisterCorp
} from '@tnwx/commons'

import { Kits } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 处理企业微信消息以及事件
 */
export class QyWeChat {
  /**
   * JSSDK签名
   * @param nonce_str 随机字符串
   * @param timestamp 时间戳
   * @param url 当前网页的URL， 不包含#及其后面部分
   * @param type QyJsApiType
   * @param jsapi_ticket jsapi_ticket
   */
  public static async jssdkSignature(nonce_str: string, timestamp: string, url: string, type: QyJsApiType, jsapi_ticket?: string): Promise<string> {
    if (!jsapi_ticket) {
      let jsTicket = await QyJsTicketApi.getTicket(type)
      if (jsTicket) {
        jsapi_ticket = jsTicket.getTicket
        if (QyApiConfigKit.isDevMode()) {
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
    let cryptoKit: CryptoKit = new CryptoKit(QyApiConfigKit.getApiConfig, signature, timestamp, nonce)
    try {
      return cryptoKit.decrypt(echostr)
    } catch (error) {
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
    let cryptoKit: CryptoKit
    return new Promise(function(resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async (err, result) => {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        result = result.xml
        let isEncrypt: boolean = true
        cryptoKit = new CryptoKit(QyApiConfigKit.getApiConfig, msgSignature, timestamp, nonce)
        // 对加密数据解密
        result = cryptoKit.decryptMsg(result.Encrypt)

        if (QyApiConfigKit.isDevMode()) {
          console.debug('接收消息:\n')
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
        } else if (inMsg instanceof InTaskEvent) {
          outMsg = await msgAdapter.processInTaskEvent(<InTaskEvent>inMsg)
        } else if (inMsg instanceof InEnterAgentEvent) {
          outMsg = await msgAdapter.processInEnterAgentEvent(<InEnterAgentEvent>inMsg)
        } else if (inMsg instanceof InBatchJobResultEvent) {
          outMsg = await msgAdapter.processInBatchJobResultEvent(<InBatchJobResultEvent>inMsg)
        } else if (inMsg instanceof InUpdateUserEvent) {
          outMsg = await msgAdapter.processInUpdateUserEvent(<InUpdateUserEvent>inMsg)
        } else if (inMsg instanceof InUpdatePartyEvent) {
          outMsg = await msgAdapter.processInUpdatePartyEvent(<InUpdatePartyEvent>inMsg)
        } else if (inMsg instanceof InUpdateTagEvent) {
          outMsg = await msgAdapter.processInUpdateTagEvent(<InUpdateTagEvent>inMsg)
        } else if (inMsg instanceof InSuiteTicket) {
          isEncrypt = false
          outMsg = await msgAdapter.processInSuiteTicket(<InSuiteTicket>inMsg)
        } else if (inMsg instanceof InAuthEvent) {
          isEncrypt = false
          outMsg = await msgAdapter.processInAuthEvent(<InAuthEvent>inMsg)
        } else if (inMsg instanceof InBatchJobResult) {
          isEncrypt = false
          outMsg = await msgAdapter.processInBatchJobResult(<InBatchJobResult>inMsg)
        } else if (inMsg instanceof InExternalContact) {
          isEncrypt = false
          outMsg = await msgAdapter.processInExternalContact(<InExternalContact>inMsg)
        } else if (inMsg instanceof InExternalContactEvent) {
          isEncrypt = false
          outMsg = await msgAdapter.processInExternalContactEvent(<InExternalContactEvent>inMsg)
        } else if (inMsg instanceof InRegisterCorp) {
          isEncrypt = false
          outMsg = await msgAdapter.processInRegisterCorp(<InRegisterCorp>inMsg)
        } else if (inMsg instanceof InNotDefinedMsg) {
          if (QyApiConfigKit.isDevMode()) {
            console.debug(`未能识别的消息类型。消息 xml 内容为：\n ${result}`)
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
        if (isEncrypt) {
          //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
          responseMsg = cryptoKit.encryptMsg(responseMsg)
        }
        if (QyApiConfigKit.isDevMode()) {
          console.debug(`发送消息:\n ${responseMsg}`)
          console.debug('--------------------------\n')
        }
        //返回给微信服务器
        resolve(responseMsg)
      })
    })
  }
}
