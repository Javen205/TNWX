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
    processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): OutMsg;
}