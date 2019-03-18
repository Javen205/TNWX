import { InSpeechRecognitionResults } from "./in/InSpeechRecognitionResults";
import { InMsg } from "./in/InMsg";
import { InImageMsg } from "./in/InImageMsg";
import { InTextMsg } from "./in/InTextMsg";
import { InNotDefinedMsg } from "./in/InNotDefinedMsg";
import { InVideoMsg } from "./in/InVideoMsg";
import { InShortVideoMsg } from "./in/InShortVideoMsg";
import { InLocationMsg } from "./in/InLocationMsg";
import { InLinkMsg } from "./in/InLinkMsg";
import { InVoiceMsg } from "./in/InVoiceMsg";
import { OutMsg } from "./out/OutMsg";
import { InFollowEvent } from "./in/event/InFollowEvent";
import { InQrCodeEvent } from "./in/event/InQrCodeEvent";
import { InLocationEvent } from "./in/event/InLocationEvent";
import { InNotDefinedEvent } from "./in/event/InNotDefinedEvent";
import { InMenuEvent } from "./in/event/InMenuEvent";
import { ScanCodeInfo } from "./in/event/ScanCodeInfo";
import { InTemplateMsgEvent } from "./in/event/InTemplateMsgEvent";

export class InMsgParser {

    public static parse(obj: any): InMsg {
        return this.doParse(obj);
    }

    private static doParse(obj: any): InMsg {
        if ("text" == obj.MsgType)
            return this.parseInTextMsg(obj);
        if ("image" == obj.MsgType)
            return this.parseInImageMsg(obj);
        if ("video" == obj.MsgType)
            return this.parseInVideoMsg(obj);
        if ("shortvideo" == obj.MsgType)
            return this.parseInShortVideoMsg(obj);
        if ("location" == obj.MsgType)
            return this.parseInLocationMsg(obj);
        if ("link" == obj.MsgType)
            return this.parseInLinkMsg(obj);
        if ("voice" == obj.MsgType)
            return this.parseInVoiceMsgAndInSpeechRecognitionResults(obj);
        if ("event" == obj.MsgType)
            return this.parseInEvent(obj);
        console.log("无法识别的消息类型 " + obj.MsgType + "，请查阅微信公众平台开发文档 https://mp.weixin.qq.com/wiki");
        return new InNotDefinedMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
    }


    private static parseInTextMsg(obj: any): InMsg {
        let msg: InTextMsg = new InTextMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setContent = obj.Content;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
    private static parseInImageMsg(obj: any): InMsg {
        let msg: InImageMsg = new InImageMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setPicUrl = obj.PicUrl;
        msg.setMediaId = obj.MediaId;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
    private static parseInVideoMsg(obj: any): InMsg {
        let msg: InVideoMsg = new InVideoMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setThumbMediaId = obj.ThumbMediaId;
        msg.setMediaId = obj.MediaId;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
    private static parseInShortVideoMsg(obj: any): InMsg {
        let msg: InShortVideoMsg = new InShortVideoMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setThumbMediaId = obj.ThumbMediaId;
        msg.setMediaId = obj.MediaId;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
    private static parseInLocationMsg(obj: any): InMsg {
        let msg: InLocationMsg = new InLocationMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setLocation_X = obj.Location_X;
        msg.setLocation_Y = obj.Location_Y;
        msg.setScale = obj.Scale;
        msg.setLabel = obj.Label;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
    private static parseInLinkMsg(obj: any): InMsg {
        let msg: InLinkMsg = new InLinkMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setTitle = obj.Title;
        msg.setDescription = obj.Description;
        msg.setUrl = obj.Url;
        msg.setMsgId = obj.MsgId;
        return msg;
    }

    private static parseInVoiceMsgAndInSpeechRecognitionResults(obj: any): InMsg {
        let recognition: string = obj.Recognition;
        let mediaId: string = obj.MediaId;
        let format: string = obj.Format;
        let msgId: string = obj.MsgId;
        if (recognition) {
            let msg = new InVoiceMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
            msg.setMediaId = mediaId;
            msg.setFormat = format;
            msg.setMsgId = msgId;
            return msg;
        } else {
            let msg = new InSpeechRecognitionResults(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
            msg.setMediaId = mediaId;
            msg.setFormat = format;
            msg.setMsgId = msgId;
            msg.setRecognition = recognition;
            return msg;
        }
    }
    private static parseInEvent(obj: any): InMsg {
        let event = obj.Event;
        let eventKey = obj.EventKey;
        if ("unsubscribe" == event) {
            let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        let ticket = obj.Ticket;
        // 用户未关注时，进行关注后的事件推送
        if ("subscribe" == event && eventKey && eventKey.startsWith("qrscene_")) {
            let e = new InQrCodeEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            e.setTicket = ticket;
            return e;
        }
        // 用户已关注时的事件推送
        if ("SCAN" == event) {
            let e = new InQrCodeEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            e.setTicket = ticket;
            return e;
        }

        if ("subscribe" == event) {
            let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // 上报地理位置事件
        if ("LOCATION" == event) {
            let e = new InLocationEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setLatitude = obj.Latitude;
            e.setLongitude = obj.Longitude;
            e.setPrecision = obj.Precision;
            return e;
        }
        // 自定义菜单事件之一 1：点击菜单拉取消息时的事件推送
        if ("CLICK" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // 自定义菜单事件之二 2：点击菜单跳转链接时的事件推送
        if ("VIEW" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // 扫码推事件 和 扫码推事件且弹出“消息接收中”提示框
        if ("scancode_push" == event || "scancode_waitmsg" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            let scanType = obj.ScanCodeInfo.ScanType;
            let scanResult = obj.ScanCodeInfo.ScanResult;
            e.setScanCodeInfo = new ScanCodeInfo(scanType, scanResult);
            return e;
        }
        // 5. pic_sysphoto：弹出系统拍照发图，这个后台其实收不到该菜单的消息，
        // 点击它后，调用的是手机里面的照相机功能，而照相以后再发过来时，就收到的是一个图片消息了
        if ("pic_sysphoto" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // pic_photo_or_album：弹出拍照或者相册发图
        if ("pic_photo_or_album" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // pic_weixin：弹出微信相册发图器
        if ("pic_weixin" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // location_select：弹出地理位置选择器
        if ("location_select" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // media_id：下发消息（除文本消息）
        if ("media_id" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // view_limited：跳转图文消息URL
        if ("view_limited" == event) {
            let e = new InMenuEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setEventKey = eventKey;
            return e;
        }
        // 模板消息是否送达成功通知事件
        if ("TEMPLATESENDJOBFINISH" == event) {
            let e = new InTemplateMsgEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
            e.setMsgId = obj.MsgID;
            e.setStatus = obj.Status;
            return e;
        }
        console.error("无法识别的事件类型" + event + "，请查阅微信公众平台开发文档 https://mp.weixin.qq.com/wiki");
        return new InNotDefinedEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event);
    }

}