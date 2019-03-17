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
    private static parseInEvent(obj: any) {

    }

}