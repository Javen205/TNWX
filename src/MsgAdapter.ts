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
}