/**
 * @author Javen 
 * @copyright 2019-03-18 16:21:39 javendev@126.com 
 * @description 消息控制器---处理微信各种消息与事件
 */
import { InTextMsg } from "../entity/msg/in/InTextMsg";
import { OutMsg } from "../entity/msg/out/OutMsg";
import { InNotDefinedMsg } from "../entity/msg/in/InNotDefinedMsg";
import { OutTextMsg } from "../entity/msg/out/OutTextMsg";
import { MsgAdapter } from "../MsgAdapter";
import { OutVoiceMsg } from "../entity/msg/out/OutVoiceMsg";
import { OutVideoMsg } from "../entity/msg/out/OutVideoMsg";
import { OutImageMsg } from "../entity/msg/out/OutImageMsg";
import { OutNewsMsg } from "../entity/msg/out/OutNewsMsg";
import { InFollowEvent } from "../entity/msg/in/event/InFollowEvent";
import { InQrCodeEvent } from "../entity/msg/in/event/InQrCodeEvent";
import { InMsg } from "../entity/msg/in/InMsg";
import { InImageMsg } from "../entity/msg/in/InImageMsg";
import { InVoiceMsg } from "../entity/msg/in/InVoiceMsg";
import { InVideoMsg } from "../entity/msg/in/InVideoMsg";
import { InShortVideoMsg } from "../entity/msg/in/InShortVideoMsg";
import { InLocationMsg } from "../entity/msg/in/InLocationMsg";
import { InLinkMsg } from "../entity/msg/in/InLinkMsg";
import { InSpeechRecognitionResults } from "../entity/msg/in/InSpeechRecognitionResults";
import { InLocationEvent } from "../entity/msg/in/event/InLocationEvent";
import { InMenuEvent } from "../entity/msg/in/event/InMenuEvent";
import { InTemplateMsgEvent } from "../entity/msg/in/event/InTemplateMsgEvent";
import { OutCustomMsg } from "../entity/msg/out/OutCustomMsg";

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
        } else {
            // outMsg = new OutTextMsg(inTextMsg);
            // outMsg.setContent(content);
            // 转发给多客服PC客户端
            outMsg = new OutCustomMsg(inTextMsg);
            console.log("转发给多客服PC客户端");

        }
        return outMsg;
    }



    processInImageMsg(inImageMsg: InImageMsg): OutMsg {
        let outMsg = new OutImageMsg(inImageMsg);
        outMsg.setMediaId = inImageMsg.getMediaId;
        return outMsg;
    }
    processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg {
        let outMsg = new OutVoiceMsg(inVoiceMsg);
        outMsg.setMediaId = inVoiceMsg.getMediaId;
        return outMsg;
    }
    processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inVideoMsg);
        outMsg.setMediaId = inVideoMsg.getMediaId;
        outMsg.setDescription = "IJPay 让支付触手可及";
        outMsg.setTitle = "视频消息";
        return outMsg;
    }
    processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inShortVideoMsg);
        outMsg.setMediaId = inShortVideoMsg.getMediaId;
        outMsg.setDescription = "TypeScript + Node.js 开发微信公众号";
        outMsg.setTitle = "短视频消息";
        return outMsg;
    }
    processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg {
        return this.renderOutTextMsg(inLocationMsg,
            "位置消息... \n\nX:" + inLocationMsg.getLocation_X + " Y:" + inLocationMsg.getLocation_Y + "\n\n" + inLocationMsg.getLabel);
    }
    processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg {
        let text = new OutTextMsg(inLinkMsg);
        text.setContent("链接频消息..." + inLinkMsg.getUrl);
        return text;
    }
    processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg {
        let text = new OutTextMsg(inSpeechRecognitionResults);
        text.setContent("语音识别消息..." + inSpeechRecognitionResults.getRecognition);
        return text;
    }

    processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg {

        if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
            return this.renderOutTextMsg(inFollowEvent,
                "感谢你的关注 么么哒 \n\n交流群：114196246");
        }
        else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
            console.error("取消关注：" + inFollowEvent.getFromUserName);
            return this.renderOutTextMsg(inFollowEvent);
        } else {
            return this.renderOutTextMsg(inFollowEvent);
        }
    }

    processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg {
        if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
            console.debug("扫码未关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent,
                "感谢您的关注，二维码内容：" + inQrCodeEvent.getEventKey);
        }
        else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
            console.debug("扫码已关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent);
        } else {
            return this.renderOutTextMsg(inQrCodeEvent);
        }
    }
    processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg {
        console.debug("发送地理位置事件：" + inLocationEvent.getFromUserName);

        return this.renderOutTextMsg(inLocationEvent,
            "地理位置是：" + inLocationEvent.getLatitude);
    }
    processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg {
        console.debug("菜单事件：" + inMenuEvent.getFromUserName);

        return this.renderOutTextMsg(inMenuEvent,
            "菜单事件内容是：" + inMenuEvent.getEventKey);
    }
    processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg {
        console.debug("模板消息事件：" + inTemplateMsgEvent.getFromUserName + " " + inTemplateMsgEvent.getStatus);
        return this.renderOutTextMsg(inTemplateMsgEvent,
            "消息发送状态：" + inTemplateMsgEvent.getStatus);
    }


    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg {
        return this.renderOutTextMsg(inNotDefinedMsg,
            "未知消息");
    }

    renderOutTextMsg(inMsg: InMsg, content?: string): OutTextMsg {
        let outMsg = new OutTextMsg(inMsg);
        outMsg.setContent(content ? content : " ");
        return outMsg;
    }
}