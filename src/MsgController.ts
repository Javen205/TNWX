import { InTextMsg } from "./msg/in/InTextMsg";
import { OutMsg } from "./msg/out/OutMsg";
import { InNotDefinedMsg } from "./msg/in/InNotDefinedMsg";
import { OutTextMsg } from "./msg/out/OutTextMsg";
import { MsgAdapter } from "./MsgAdapter";

export class MsgController implements MsgAdapter {

    processInTextMsg(inTextMsg: InTextMsg): OutMsg {
        let content: string = "IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay";
        if ("开源项目" == inTextMsg.getContent) {
            content = "极速开发微信公众号 \n\nhttps://github.com/javen205/TNW"
        }
        let text = new OutTextMsg(inTextMsg);
        text.setContent(content);
        return text;
    }

    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg {
        let text = new OutTextMsg(inNotDefinedMsg);
        text.setContent("未知消息...");
        return text;
    }

}