import { InTextMsg } from "./msg/in/InTextMsg";
import { OutMsg } from "./msg/out/OutMsg";
import { InNotDefinedMsg } from "./msg/in/InNotDefinedMsg";

export interface MsgAdapter {
    processInTextMsg(inTextMsg: InTextMsg): OutMsg;
    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg;
}