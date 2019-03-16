import { InMsg } from "./in/InMsg";
import { InTextMsg } from "./in/InTextMsg";
import { InNotDefinedMsg } from "./in/InNotDefinedMsg";

export class InMsgParser {

    public static parse(obj: any): InMsg {
        return this.doParse(obj);
    }

    private static doParse(obj: any): InMsg {
        if ("text" == obj.MsgType)
            return this.parseInTextMsg(obj);

        return new InNotDefinedMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
    }

    private static parseInTextMsg(obj: any): InTextMsg {
        let msg: InTextMsg = new InTextMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType);
        msg.setContent = obj.Content;
        msg.setMsgId = obj.MsgId;
        return msg;
    }
}