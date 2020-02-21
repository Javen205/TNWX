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
  InExternalContactEvent
} from 'tnwx'

export class HandMsgAdapter extends MsgAdapter {
  processInTextMsg(inTextMsg: InTextMsg): OutMsg {
    let outMsg: any
    let content: string = 'IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay'
    if ('1' === inTextMsg.getContent) {
      content = '极速开发微信公众号 \n\nhttps://github.com/javen205/TNWX'
      outMsg = new OutTextMsg(inTextMsg)
      outMsg.setContent(content)
    } else if ('2' === inTextMsg.getContent) {
      return this.renderOutTextMsg(inTextMsg, '')
    } else if ('极速开发微信公众号' == inTextMsg.getContent) {
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
    } else if ('聚合支付' == inTextMsg.getContent) {
      outMsg = new OutNewsMsg(inTextMsg)
      outMsg.addArticle('聚合支付了解下', 'IJPay 让支付触手可及', 'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png', 'https://gitee.com/javen205/IJPay')
      outMsg.addArticle('jfinal-weixin', '极速开发微信公众号', 'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png', 'https://gitee.com/JFinal/jfinal-weixin')
    } else {
      outMsg = new OutTextMsg(inTextMsg)
      outMsg.setContent(inTextMsg.getContent)
      // 转发给多客服PC客户端
      // outMsg = new OutCustomMsg(inTextMsg);
      // console.log('转发给多客服PC客户端');
    }
    return outMsg
  }

  processInImageMsg(inImageMsg: InImageMsg): OutMsg {
    let outMsg = new OutImageMsg(inImageMsg)
    outMsg.setMediaId = inImageMsg.getMediaId
    return outMsg
  }
  processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg {
    let outMsg = new OutVoiceMsg(inVoiceMsg)
    outMsg.setMediaId = inVoiceMsg.getMediaId
    return outMsg
  }
  processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg {
    let outMsg = new OutVideoMsg(inVideoMsg)
    outMsg.setMediaId = inVideoMsg.getMediaId
    outMsg.setDescription = 'IJPay 让支付触手可及'
    outMsg.setTitle = '视频消息'
    return outMsg
  }
  processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg {
    let outMsg = new OutVideoMsg(inShortVideoMsg)
    outMsg.setMediaId = inShortVideoMsg.getMediaId
    outMsg.setDescription = 'TypeScript + Node.js 开发微信公众号'
    outMsg.setTitle = '短视频消息'
    return outMsg
  }
  processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg {
    return this.renderOutTextMsg(inLocationMsg, '位置消息... \n\nX:' + inLocationMsg.getLocation_X + ' Y:' + inLocationMsg.getLocation_Y + '\n\n' + inLocationMsg.getLabel)
  }
  processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg {
    let text = new OutTextMsg(inLinkMsg)
    text.setContent('链接频消息...' + inLinkMsg.getUrl)
    return text
  }
  processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg {
    let text = new OutTextMsg(inSpeechRecognitionResults)
    text.setContent('语音识别消息...' + inSpeechRecognitionResults.getRecognition)
    return text
  }

  processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg {
    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
      return this.renderOutTextMsg(inFollowEvent, '感谢你的关注 么么哒 \n\n交流群：114196246')
    } else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
      console.error('取消关注：' + inFollowEvent.getFromUserName)
      return this.renderOutTextMsg(inFollowEvent)
    } else {
      return this.renderOutTextMsg(inFollowEvent)
    }
  }

  processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg {
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
  processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg {
    console.debug('发送地理位置事件：' + inLocationEvent.getFromUserName)

    return this.renderOutTextMsg(inLocationEvent, '地理位置是：' + inLocationEvent.getLatitude)
  }
  processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg {
    console.debug('菜单事件：' + inMenuEvent.getFromUserName)

    return this.renderOutTextMsg(inMenuEvent, '菜单事件内容是：' + inMenuEvent.getEventKey)
  }
  processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg {
    console.debug('模板消息事件：' + inTemplateMsgEvent.getFromUserName + ' ' + inTemplateMsgEvent.getStatus)
    return this.renderOutTextMsg(inTemplateMsgEvent, '消息发送状态：' + inTemplateMsgEvent.getStatus)
  }
  processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): OutMsg {
    console.debug('摇一摇事件：' + inShakearoundUserShakeEvent.getFromUserName + ' ' + inShakearoundUserShakeEvent.getUuid)
    return this.renderOutTextMsg(inShakearoundUserShakeEvent, 'uuid：' + inShakearoundUserShakeEvent.getUuid)
  }
  processInEnterAgentEvent(inEnterAgentEvent: InEnterAgentEvent) {
    console.log('进入应用事件')
    return this.renderOutTextMsg(inEnterAgentEvent, inEnterAgentEvent.getFromUserName + ' 进入应用 ' + inEnterAgentEvent.getAgentId)
  }

  processInTaskEvent(inTaskEvent: InTaskEvent) {
    console.log('进入应用事件:')
    console.log(inTaskEvent)
    return this.renderOutTextMsg(inTaskEvent, inTaskEvent.getAgentId + ' key: ' + inTaskEvent.getEventKey + ' taskId: ' + inTaskEvent.getTaskId)
  }

  processInBatchJobResultEvent(inBatchJobResultEvent: InBatchJobResultEvent): OutMsg {
    console.log(inBatchJobResultEvent)
    return this.renderOutTextMsg(inBatchJobResultEvent, inBatchJobResultEvent.getJobId)
  }

  processInUpdateUserEvent(inUpdateUserEvent: InUpdateUserEvent): OutMsg {
    console.log(inUpdateUserEvent)
    return this.renderOutTextMsg(inUpdateUserEvent, inUpdateUserEvent.getUserId)
  }

  processInUpdatePartyEvent(inUpdatePartyEvent: InUpdatePartyEvent): OutMsg {
    console.log(inUpdatePartyEvent)
    return this.renderOutTextMsg(inUpdatePartyEvent, inUpdatePartyEvent.getParentId)
  }

  processInUpdateTagEvent(inUpdateTagEvent: InUpdateTagEvent): OutMsg {
    console.log(inUpdateTagEvent)
    return this.renderOutTextMsg(inUpdateTagEvent, inUpdateTagEvent.getTagId + '')
  }

  processInSuiteTicket(inSuiteTicket: InSuiteTicket): string {
    console.log(`inSuiteTicket:${JSON.stringify(inSuiteTicket)}`)
    let config: ApiConfig = QyApiConfigKit.getApiConfig
    config.setSuiteTicket = inSuiteTicket.suiteTicket
    let appId = config.getAppId
    let corpId = config.getCorpId
    QyApiConfigKit.removeApiConfig(appId, corpId)
    QyApiConfigKit.putApiConfig(config)
    QyApiConfigKit.setCurrentAppId(appId, corpId)
    return 'success'
  }

  processInAuthEvent(inAuthEvent: InAuthEvent): string {
    console.log(`inAuthEvent:${JSON.stringify(inAuthEvent)}`)
    return 'success'
  }

  processInExternalContactEvent(inExternalContactEvent: InExternalContactEvent): string {
    console.log(`inExternalContactEvent:${JSON.stringify(inExternalContactEvent)}`)
    return 'success'
  }

  processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg {
    return this.renderOutTextMsg(inNotDefinedMsg, '未知消息')
  }
}
