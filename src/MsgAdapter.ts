import { InTextMsg } from "./entity/msg/in/InTextMsg";
import { OutMsg } from "./entity/msg/out/OutMsg";
import { InNotDefinedMsg } from "./entity/msg/in/InNotDefinedMsg";
import { InImageMsg } from "./entity/msg/in/InImageMsg";
import { InVideoMsg } from "./entity/msg/in/InVideoMsg";
import { InVoiceMsg } from "./entity/msg/in/InVoiceMsg";
import { InShortVideoMsg } from "./entity/msg/in/InShortVideoMsg";
import { InLocationMsg } from "./entity/msg/in/InLocationMsg";
import { InLinkMsg } from "./entity/msg/in/InLinkMsg";
import { InSpeechRecognitionResults } from "./entity/msg/in/InSpeechRecognitionResults";
import { InFollowEvent } from "./entity/msg/in/event/InFollowEvent";
import { InQrCodeEvent } from "./entity/msg/in/event/InQrCodeEvent";
import { InLocationEvent } from "./entity/msg/in/event/InLocationEvent";
import { InMenuEvent } from "./entity/msg/in/event/InMenuEvent";
import { InTemplateMsgEvent } from "./entity/msg/in/event/InTemplateMsgEvent";
import { InShakearoundUserShakeEvent } from "./entity/msg/in/event/InShakearoundUserShakeEvent";

export interface MsgAdapter {
    // 处理文本消息
    processInTextMsg(inTextMsg: InTextMsg): OutMsg;
    // 处理图片消息
    processInImageMsg(inImageMsg: InImageMsg): OutMsg;
    // 处理声音消息
    processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg;
    // 处理视频消息
    processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg;
    // 处理小视频消息
    processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg;
    // 处理地理位置消息
    processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg;
    // 处理链接消息
    processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg;
    // 处理语音识别结果
    processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg;
    // 处理未定义的消息(其他消息...小哥该扩展了)
    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg;

    // 处理关注、取消关注事件
    processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg;
    // 处理扫码事件
    processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg;
    // 处理地理位置事件
    processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg;
    // 处理地理位置事件
    processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg;
    // 处理模板消息事件
    processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg;
    // 处理摇一摇周边事件
    processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): OutMsg;
}