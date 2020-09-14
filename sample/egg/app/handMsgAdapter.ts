/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 消息控制器---处理微信各种消息与事件
 */
import {
  InTextMsg,
  OutMsg,
  InNotDefinedMsg,
  OutTextMsg,
  MsgAdapter,
  OutVoiceMsg,
  OutVideoMsg,
  OutNewsMsg,
  InFollowEvent,
  InQrCodeEvent,
  InVoiceMsg,
  InVideoMsg,
  InShortVideoMsg,
  InLocationMsg,
  InLinkMsg,
  InSpeechRecognitionResults,
  InLocationEvent,
  InMenuEvent,
  InTemplateMsgEvent,
  InShakearoundUserShakeEvent,
  ApiConfigKit,
  InEnterAgentEvent,
  InBatchJobResultEvent,
  InUpdateUserEvent,
  InUpdatePartyEvent,
  InUpdateTagEvent,
  InSuiteTicket,
  ApiConfig,
  QyApiConfigKit,
  InImageMsg,
  OutImageMsg,
  InTaskEvent,
  InAuthEvent,
  InExternalContactEvent,
  InComponentVerifyTicket,
  InAuthMpEvent,
  InBatchJobResult,
  InExternalContact,
  InRegisterCorp,
  InMsg
} from 'tnwx'

export class HandMsgAdapter implements MsgAdapter {

  async processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg> {
    let outMsg: any
    let content: string = 'IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay'
    if ('1' === inTextMsg.getContent) {
      content = '极速开发微信公众号 \n\nhttps://github.com/javen205/TNWX'
      outMsg = new OutTextMsg(inTextMsg)
      outMsg.setContent(content)
    } else if ('2' === inTextMsg.getContent) {
      return this.renderOutTextMsg(inTextMsg, '')
    } else if ('3' === inTextMsg.getContent) {
      // 多公众号支持 分别给不同的公众号发送不同的消息
      if (ApiConfigKit.getApiConfig.getAppId == 'wx614c453e0d1dcd12') {
        content = '极速开发微信公众号 \n\nhttps://github.com/javen205/weixin_guide'
        outMsg = new OutTextMsg(inTextMsg)
        outMsg.setContent(content)
      } else {
        content = '极速开发微信公众号 \n\nhttps://github.com/javen205/TNWX'
        outMsg = new OutTextMsg(inTextMsg)
        outMsg.setContent(content)
      }
    } else if ('4' === inTextMsg.getContent) {
      outMsg = new OutNewsMsg(inTextMsg)
      outMsg.addArticle('聚合支付了解下', 'IJPay 让支付触手可及', 'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png', 'https://gitee.com/javen205/IJPay')
    } else {
      outMsg = new OutTextMsg(inTextMsg)
      outMsg.setContent(inTextMsg.getContent)
      // 转发给多客服PC客户端
      // outMsg = new OutCustomMsg(inTextMsg);
      // console.log('转发给多客服PC客户端');
    }
    return outMsg
  }

  async processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg> {
    let outMsg = new OutImageMsg(inImageMsg)
    outMsg.setMediaId = inImageMsg.getMediaId
    return outMsg
  }

  async processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg> {
    let outMsg = new OutVoiceMsg(inVoiceMsg)
    outMsg.setMediaId = inVoiceMsg.getMediaId
    return outMsg
  }

  async processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg> {
    let outMsg = new OutVideoMsg(inVideoMsg)
    outMsg.setMediaId = inVideoMsg.getMediaId
    outMsg.setDescription = 'IJPay 让支付触手可及'
    outMsg.setTitle = '视频消息'
    return outMsg
  }

  async processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg> {
    let outMsg = new OutVideoMsg(inShortVideoMsg)
    outMsg.setMediaId = inShortVideoMsg.getMediaId
    outMsg.setDescription = 'TypeScript + Node.js 开发微信公众号'
    outMsg.setTitle = '短视频消息'
    return outMsg
  }

  async processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationMsg, '位置消息... \n\nX:' + inLocationMsg.getLocation_X + ' Y:' + inLocationMsg.getLocation_Y + '\n\n' + inLocationMsg.getLabel)
  }

  async processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg> {
    let text = new OutTextMsg(inLinkMsg)
    text.setContent('链接频消息...' + inLinkMsg.getUrl)
    return text
  }
  async processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg> {
    let text = new OutTextMsg(inSpeechRecognitionResults)
    text.setContent('语音识别消息...' + inSpeechRecognitionResults.getRecognition)
    return text
  }

  async processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {
    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
      return this.renderOutTextMsg(inFollowEvent, '感谢你的关注 么么哒 \n\n交流群：114196246')
    } else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
      console.error('取消关注：' + inFollowEvent.getFromUserName)
      return this.renderOutTextMsg(inFollowEvent)
    } else {
      return this.renderOutTextMsg(inFollowEvent)
    }
  }

  async processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg> {
    if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
      console.debug('扫码未关注：' + inQrCodeEvent.getFromUserName)
      return this.renderOutTextMsg(inQrCodeEvent, '感谢您的关注，二维码内容：' + inQrCodeEvent.getEventKey)
    } else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
      console.debug('扫码已关注：' + inQrCodeEvent.getFromUserName)
      return this.renderOutTextMsg(inQrCodeEvent)
    } else {
      return this.renderOutTextMsg(inQrCodeEvent)
    }
  }
  async processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg> {
    console.debug('发送地理位置事件：' + inLocationEvent.getFromUserName)

    return this.renderOutTextMsg(inLocationEvent, '地理位置是：' + inLocationEvent.getLatitude)
  }
  async processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg> {
    console.debug('菜单事件：' + inMenuEvent.getFromUserName)

    return this.renderOutTextMsg(inMenuEvent, '菜单事件内容是：' + inMenuEvent.getEventKey)
  }
  async processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg> {
    console.debug('模板消息事件：' + inTemplateMsgEvent.getFromUserName + ' ' + inTemplateMsgEvent.getStatus)
    return this.renderOutTextMsg(inTemplateMsgEvent, '消息发送状态：' + inTemplateMsgEvent.getStatus)
  }
  async processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): Promise<OutMsg> {
    console.debug('摇一摇事件：' + inShakearoundUserShakeEvent.getFromUserName + ' ' + inShakearoundUserShakeEvent.getUuid)
    return this.renderOutTextMsg(inShakearoundUserShakeEvent, 'uuid：' + inShakearoundUserShakeEvent.getUuid)
  }
  async processInEnterAgentEvent(inEnterAgentEvent: InEnterAgentEvent) {
    console.log('进入应用事件')
    return this.renderOutTextMsg(inEnterAgentEvent, inEnterAgentEvent.getFromUserName + ' 进入应用 ' + inEnterAgentEvent.getAgentId)
  }

  async processInTaskEvent(inTaskEvent: InTaskEvent) {
    console.log('进入应用事件:')
    console.log(inTaskEvent)
    return this.renderOutTextMsg(inTaskEvent, inTaskEvent.getAgentId + ' key: ' + inTaskEvent.getEventKey + ' taskId: ' + inTaskEvent.getTaskId)
  }

  async processInBatchJobResultEvent(inBatchJobResultEvent: InBatchJobResultEvent): Promise<OutMsg> {
    console.log(inBatchJobResultEvent)
    return this.renderOutTextMsg(inBatchJobResultEvent, inBatchJobResultEvent.getJobId)
  }

  async processInUpdateUserEvent(inUpdateUserEvent: InUpdateUserEvent): Promise<OutMsg> {
    console.log(inUpdateUserEvent)
    return this.renderOutTextMsg(inUpdateUserEvent, inUpdateUserEvent.getUserId)
  }

  async processInUpdatePartyEvent(inUpdatePartyEvent: InUpdatePartyEvent): Promise<OutMsg> {
    console.log(inUpdatePartyEvent)
    return this.renderOutTextMsg(inUpdatePartyEvent, inUpdatePartyEvent.getParentId)
  }

  async processInUpdateTagEvent(inUpdateTagEvent: InUpdateTagEvent): Promise<OutMsg> {
    console.log(inUpdateTagEvent)
    return this.renderOutTextMsg(inUpdateTagEvent, inUpdateTagEvent.getTagId + '')
  }

  async processInSuiteTicket(inSuiteTicket: InSuiteTicket): Promise<string> {
    console.log(`inSuiteTicket:${JSON.stringify(inSuiteTicket)}`)
    let config: ApiConfig = QyApiConfigKit.getApiConfig
    config.setTicket = inSuiteTicket.suiteTicket
    let appId = config.getAppId
    let corpId = config.getCorpId
    QyApiConfigKit.removeApiConfig(appId, corpId)
    QyApiConfigKit.putApiConfig(config)
    QyApiConfigKit.setCurrentAppId(appId, corpId)
    return 'success'
  }

  async processInComponentVerifyTicket(inComponentVerifyTicket: InComponentVerifyTicket): Promise<string> {
    console.log(`inComponentVerifyTicket:${JSON.stringify(inComponentVerifyTicket)}`)
    let appId = inComponentVerifyTicket.appId
    let config: ApiConfig = ApiConfigKit.getApiConfigByAppId(appId)
    config.setTicket = inComponentVerifyTicket.getTicket
    ApiConfigKit.removeApiConfig(appId)
    ApiConfigKit.putApiConfig(config)
    ApiConfigKit.setCurrentAppId(appId)
    return 'success'
  }

  async processInAuthEvent(inAuthEvent: InAuthEvent): Promise<string> {
    console.log(`inAuthEvent:${JSON.stringify(inAuthEvent)}`)
    return 'success'
  }

  async processInAuthMpEvent(inAuthMpEvent: InAuthMpEvent): Promise<string> {
    console.log(`InAuthMpEvent:${JSON.stringify(inAuthMpEvent)}`)
    return 'success'
  }

  async processInExternalContactEvent(inExternalContactEvent: InExternalContactEvent): Promise<string> {
    console.log(`inExternalContactEvent:${JSON.stringify(inExternalContactEvent)}`)
    return 'success'
  }

  async processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inNotDefinedMsg, '未知消息')
  }

  async processInBatchJobResult(inBatchJobResult: InBatchJobResult): Promise<string> {
    console.log(inBatchJobResult.jobId);
    return 'success'
  }

  async processInExternalContact(inExternalContact: InExternalContact): Promise<string> {
    console.log(inExternalContact.authCorpId);
    return 'success'
  }

  async processInRegisterCorp(inRegisterCorp: InRegisterCorp): Promise<string> {
    console.log(inRegisterCorp.authCorpId);
    return 'success'
  }

  async renderOutTextMsg(inMsg: InMsg, content?: string | undefined): Promise<OutTextMsg> {
    let OutMsg = new OutTextMsg(inMsg)
    OutMsg.setContent(content ? content : ' ')
    return OutMsg
  }
}
