import { InMsg } from "../in/InMsg";

export abstract class OutMsg {
    // 接收方帐号 openId
    protected toUserName: string;
    // 开发者微信号
    protected fromUserName: string;
    // 消息创建时间
    protected createTime: number;
    /**
     * 被动响应消息类型
     * 1：text 文本消息
     * 2：image 图片消息
     * 3：voice 语音消息
     * 4：video 视频消息
     * 5：music 音乐消息
     * 6：news 图文消息
     */
    protected msgType!: string;

    constructor(inMsg: InMsg) {
        this.toUserName = inMsg.getFromUserName;
        this.fromUserName = inMsg.getToUserName;
        this.createTime = this.now();
    }

    public toXml(): string {
        let xmlContent = "<xml><ToUserName><![CDATA[" + this.toUserName + "]]></ToUserName>";
        xmlContent += "<FromUserName><![CDATA[" + this.fromUserName + "]]></FromUserName>";
        xmlContent += "<CreateTime>" + this.createTime + "</CreateTime>";
        xmlContent += "<MsgType><![CDATA[" + this.msgType + "]]></MsgType>";
        return xmlContent;
    }

    public now(): number {
        return new Date().getTime();
    }

    public get getToUserName(): string {
        return this.toUserName;
    }

    public set setToUserName(toUserName: string) {
        this.toUserName = toUserName;
    }

    public get getFromUserName(): string {
        return this.fromUserName;
    }

    public set setFromUserName(fromUserName: string) {
        this.fromUserName = fromUserName;
    }

    public get getCreateTime(): number {
        return this.createTime;
    }

    public set setCreateTime(createTime: number) {
        this.createTime = createTime;
    }

    public get getMsgType(): string {
        return this.msgType;
    }

    public set setMsgType(msgType: string) {
        this.msgType = msgType;
    }
}