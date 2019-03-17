import { InTextMsg } from "./msg/in/InTextMsg";
import { OutMsg } from "./msg/out/OutMsg";
import { InNotDefinedMsg } from "./msg/in/InNotDefinedMsg";
import { InImageMsg } from "./msg/in/InImageMsg";
import { InVideoMsg } from "./msg/in/InVideoMsg";
import { InVoiceMsg } from "./msg/in/InVoiceMsg";
import { InShortVideoMsg } from "./msg/in/InShortVideoMsg";
import { InLocationMsg } from "./msg/in/InLocationMsg";
import { InLinkMsg } from "./msg/in/InLinkMsg";
import { InSpeechRecognitionResults } from "./msg/in/InSpeechRecognitionResults";
import { InFollowEvent } from "./msg/in/event/InFollowEvent";
import { InQrCodeEvent } from "./msg/in/event/InQrCodeEvent";
import { InLocationEvent } from "./msg/in/event/InLocationEvent";
import { InMenuEvent } from "./msg/in/event/InMenuEvent";
import { InTemplateMsgEvent } from "./msg/in/event/InTemplateMsgEvent";

export interface MsgAdapter {
    processInTextMsg(inTextMsg: InTextMsg): OutMsg;
    processInImageMsg(inImageMsg: InImageMsg): OutMsg;
    processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg;
    processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg;
    processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg;
    processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg;
    processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg;
    processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg;
    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg;

    processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg;
    processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg;
    processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg;
    processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg;
    processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg;

}