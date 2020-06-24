import { InTextMsg } from './entity/msg/in/InTextMsg'
import { OutMsg } from './entity/msg/out/OutMsg'
import { InNotDefinedMsg } from './entity/msg/in/InNotDefinedMsg'
import { InImageMsg } from './entity/msg/in/InImageMsg'
import { InVideoMsg } from './entity/msg/in/InVideoMsg'
import { InVoiceMsg } from './entity/msg/in/InVoiceMsg'
import { InShortVideoMsg } from './entity/msg/in/InShortVideoMsg'
import { InLocationMsg } from './entity/msg/in/InLocationMsg'
import { InLinkMsg } from './entity/msg/in/InLinkMsg'
import { InSpeechRecognitionResults } from './entity/msg/in/InSpeechRecognitionResults'
import { InFollowEvent } from './entity/msg/in/event/InFollowEvent'
import { InQrCodeEvent } from './entity/msg/in/event/InQrCodeEvent'
import { InLocationEvent } from './entity/msg/in/event/InLocationEvent'
import { InMenuEvent } from './entity/msg/in/event/InMenuEvent'
import { InTemplateMsgEvent } from './entity/msg/in/event/InTemplateMsgEvent'
import { InShakearoundUserShakeEvent } from './entity/msg/in/event/InShakearoundUserShakeEvent'
import { InTaskEvent } from './entity/msg/in/event/InTaskEvent'
import { InEnterAgentEvent } from './entity/msg/in/event/InEnterAgentEvent'
import { InBatchJobResultEvent } from './entity/msg/in/event/InBatchJobResultEvent'
import { InUpdatePartyEvent } from './entity/msg/in/event/InUpdatePartyEvent'
import { InSuiteTicket } from './entity/msg/in/InSuiteTicket'
import { InAuthEvent } from './entity/msg/in/InAuthEvent'
import { InMsg } from './entity/msg/in/InMsg'
import { OutTextMsg } from './entity/msg/out/OutTextMsg'
import { InBatchJobResult } from './entity/msg/in/InBatchJobResult'
import { InUpdateTagEvent } from './entity/msg/in/event/InUpdateTagEvent'
import { InUpdateUserEvent } from './entity/msg/in/event/InUpdateUserEvent'
import { InExternalContactEvent } from './entity/msg/in/event/InExternalContactEvent'
import { InExternalContact } from './entity/msg/in/InExternalContact'
import { InRegisterCorp } from './entity/msg/in/InRegisterCorp'
import { InComponentVerifyTicket } from './entity/msg/in/InComponentVerifyTicket'
import { InAuthMpEvent } from './entity/msg/in/InAuthMpEvent'
import { InMassEvent } from './entity/msg/in/event/InMassEvent'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 消息适配器
 */
export abstract class MsgAdapter {
  // 处理文本消息
  async processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inTextMsg, '')
  }
  // 处理图片消息
  async processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inImageMsg, '')
  }
  // 处理声音消息
  async processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inVoiceMsg, '')
  }
  // 处理视频消息
  async processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inVideoMsg, '')
  }
  // 处理小视频消息
  async processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inShortVideoMsg, '')
  }
  // 处理地理位置消息
  async processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationMsg, '')
  }
  // 处理链接消息
  async processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inLinkMsg, '')
  }
  // 处理语音识别结果
  async processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg> {
    return this.renderOutTextMsg(inSpeechRecognitionResults, '')
  }
  // 处理未定义的消息(其他消息...该扩展了)
  async processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inNotDefinedMsg, '')
  }
  // 处理关注、取消关注事件
  async processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inFollowEvent, '')
  }
  // 处理扫码事件
  async processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inQrCodeEvent, '')
  }
  // 处理地理位置事件
  async processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationEvent, '')
  }
  // 处理地理位置事件
  async processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inMenuEvent, '')
  }
  // 处理模板消息事件
  async processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inTemplateMsgEvent, '')
  }
  // 处理摇一摇周边事件
  async processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inShakearoundUserShakeEvent, '')
  }
  // 任务卡片事件
  async processInTaskEvent(inTaskEvent: InTaskEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inTaskEvent, '')
  }
  // 进入应用
  async processInEnterAgentEvent(inEnterAgentEvent: InEnterAgentEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inEnterAgentEvent, '')
  }
  // 异步任务完成通知
  async processInBatchJobResultEvent(inBatchJobResultEvent: InBatchJobResultEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inBatchJobResultEvent, '')
  }
  // 成员变更通知
  async processInUpdateUserEvent(inUpdateUserEvent: InUpdateUserEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inUpdateUserEvent, '')
  }
  // 部门变更通知
  async processInUpdatePartyEvent(inUpdatePartyEvent: InUpdatePartyEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inUpdatePartyEvent, '')
  }
  // 标签变更通知
  async processInUpdateTagEvent(inUpdateTagEvent: InUpdateTagEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inUpdateTagEvent, '')
  }

  // 群发结果通知
  async processInMassEvent(inMassEvent: InMassEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inMassEvent, '')
  }

  // 推送 suite_ticket
  async processInSuiteTicket(inSuiteTicket: InSuiteTicket): Promise<string> {
    return 'success'
  }

  // 推送 component_verify_ticket
  async processInComponentVerifyTicket(inComponentVerifyTicket: InComponentVerifyTicket): Promise<string> {
    return 'success'
  }

  // 企业微信开放平台授权通知事件
  async processInAuthEvent(inAuthEvent: InAuthEvent): Promise<string> {
    return 'success'
  }

  // 微信开放平台授权通知事件
  async processInAuthMpEvent(inAuthMpEvent: InAuthMpEvent): Promise<string> {
    return 'success'
  }

  // 异步任务回调通知
  async processInBatchJobResult(inBatchJobResult: InBatchJobResult): Promise<string> {
    return 'success'
  }

  // 企业客户事件
  async processInExternalContactEvent(inExternalContactEvent: InExternalContactEvent): Promise<string> {
    return 'success'
  }

  // 外部联系人事件
  async processInExternalContact(inExternalContact: InExternalContact): Promise<string> {
    return 'success'
  }

  // 注册完成回调事件
  async processInRegisterCorp(inRegisterCorp: InRegisterCorp): Promise<string> {
    return 'success'
  }

  renderOutTextMsg(inMsg: InMsg, content?: string): OutTextMsg {
    let OutMsg = new OutTextMsg(inMsg)
    OutMsg.setContent(content ? content : ' ')
    return OutMsg
  }
}
