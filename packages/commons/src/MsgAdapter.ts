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
export interface MsgAdapter {
  // 处理文本消息
  processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg>
  // 处理图片消息
  processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg>
  // 处理声音消息
  processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg>
  // 处理视频消息
  processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg>
  // 处理小视频消息
  processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg>
  // 处理地理位置消息
  processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg>
  // 处理链接消息
  processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg>
  // 处理语音识别结果
  processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg>
  // 处理未定义的消息(其他消息...该扩展了)
  processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg>
  // 处理关注、取消关注事件
  processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg>
  // 处理扫码事件
  processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg>
  // 处理地理位置事件
  processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg>
  // 处理地理位置事件
  processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg>
  // 处理模板消息事件
  processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg>
  // 处理摇一摇周边事件
  processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): Promise<OutMsg>
  // 任务卡片事件
  processInTaskEvent(inTaskEvent: InTaskEvent): Promise<OutMsg>
  // 进入应用
  processInEnterAgentEvent(inEnterAgentEvent: InEnterAgentEvent): Promise<OutMsg>
  // 异步任务完成通知
  processInBatchJobResultEvent(inBatchJobResultEvent: InBatchJobResultEvent): Promise<OutMsg>
  // 成员变更通知
  processInUpdateUserEvent(inUpdateUserEvent: InUpdateUserEvent): Promise<OutMsg>
  // 部门变更通知
  processInUpdatePartyEvent(inUpdatePartyEvent: InUpdatePartyEvent): Promise<OutMsg>
  // 标签变更通知
  processInUpdateTagEvent(inUpdateTagEvent: InUpdateTagEvent): Promise<OutMsg>
  // 群发结果通知
  processInMassEvent(inMassEvent: InMassEvent): Promise<OutMsg>
  // 推送 suite_ticket
  processInSuiteTicket(inSuiteTicket: InSuiteTicket): Promise<string>
  // 推送 component_verify_ticket
  processInComponentVerifyTicket(inComponentVerifyTicket: InComponentVerifyTicket): Promise<string>
  // 企业微信开放平台授权通知事件
  processInAuthEvent(inAuthEvent: InAuthEvent): Promise<string>
  // 微信开放平台授权通知事件
  processInAuthMpEvent(inAuthMpEvent: InAuthMpEvent): Promise<string>
  // 异步任务回调通知
  processInBatchJobResult(inBatchJobResult: InBatchJobResult): Promise<string>
  // 企业客户事件
  processInExternalContactEvent(inExternalContactEvent: InExternalContactEvent): Promise<string>
  // 外部联系人事件
  processInExternalContact(inExternalContact: InExternalContact): Promise<string>
  // 注册完成回调事件
  processInRegisterCorp(inRegisterCorp: InRegisterCorp): Promise<string>
  renderOutTextMsg(inMsg: InMsg, content?: string): Promise<OutTextMsg>
}
