import { InTextMsg } from "./msg/in/InTextMsg";
import { OutMsg } from "./msg/out/OutMsg";
import { InNotDefinedMsg } from "./msg/in/InNotDefinedMsg";
import { OutTextMsg } from "./msg/out/OutTextMsg";
import { MsgAdapter } from "./MsgAdapter";
import { OutVoiceMsg } from "./msg/out/OutVoiceMsg";
import { OutVideoMsg } from "./msg/out/OutVideoMsg";
import { OutImageMsg } from "./msg/out/OutImageMsg";
import { OutNewsMsg } from "./msg/out/OutNewsMsg";

export class MsgController implements MsgAdapter {
    processInTextMsg(inTextMsg: InTextMsg): OutMsg {
        let outMsg: any;
        let content: string = "IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay";
        if ("1" == inTextMsg.getContent) {
            content = "极速开发微信公众号 \n\nhttps://github.com/javen205/TNW"
            outMsg = new OutTextMsg(inTextMsg);
            outMsg.setContent(content);
        } else if ("2" == inTextMsg.getContent) {
            outMsg = new OutNewsMsg(inTextMsg);
            outMsg.addArticle("聚合支付了解下", "IJPay 让支付触手可及",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/javen205/IJPay")
            outMsg.addArticle("jfinal-weixin", "极速开发微信公众号",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/JFinal/jfinal-weixin")
        }
        return outMsg;
    }



    processInImageMsg(inImageMsg: import("./msg/in/InImageMsg").InImageMsg): OutMsg {
        let outMsg = new OutImageMsg(inImageMsg);
        outMsg.setMediaId = inImageMsg.getMediaId;
        return outMsg;
    }
    processInVoiceMsg(inVoiceMsg: import("./msg/in/InVoiceMsg").InVoiceMsg): OutMsg {
        let outMsg = new OutVoiceMsg(inVoiceMsg);
        outMsg.setMediaId = inVoiceMsg.getMediaId;
        return outMsg;
    }
    processInVideoMsg(inVideoMsg: import("./msg/in/InVideoMsg").InVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inVideoMsg);
        outMsg.setMediaId = inVideoMsg.getMediaId;
        outMsg.setDescription = "IJPay 让支付触手可及";
        outMsg.setTitle = "视频消息";
        return outMsg;
    }
    processInShortVideoMsg(inShortVideoMsg: import("./msg/in/InShortVideoMsg").InShortVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inShortVideoMsg);
        outMsg.setMediaId = inShortVideoMsg.getMediaId;
        outMsg.setDescription = "TypeScript + Node.js 开发微信公众号";
        outMsg.setTitle = "短视频消息";
        return outMsg;
    }
    processInLocationMsg(inLocationMsg: import("./msg/in/InLocationMsg").InLocationMsg): OutMsg {
        let text = new OutTextMsg(inLocationMsg);
        text.setContent("位置消息... \n\nX:" + inLocationMsg.getLocation_X + " Y:" + inLocationMsg.getLocation_Y);
        return text;
    }
    processInLinkMsg(inLinkMsg: import("./msg/in/InLinkMsg").InLinkMsg): OutMsg {
        let text = new OutTextMsg(inLinkMsg);
        text.setContent("链接频消息..." + inLinkMsg.getUrl);
        return text;
    }
    processInSpeechRecognitionResults(inSpeechRecognitionResults: import("./msg/in/InSpeechRecognitionResults").InSpeechRecognitionResults): OutMsg {
        let text = new OutTextMsg(inSpeechRecognitionResults);
        text.setContent("语音识别消息..." + inSpeechRecognitionResults.getRecognition);
        return text;
    }


    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg {
        let text = new OutTextMsg(inNotDefinedMsg);
        text.setContent("未知消息...");
        return text;
    }
}