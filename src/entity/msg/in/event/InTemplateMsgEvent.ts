import { EventInMsg } from "./EventInMsg";

export class InTemplateMsgEvent extends EventInMsg {
    //"success": 成功
    public static EVENT_INTEMPLATEMSG_STATUS_SUCCESS = "success";
    //"block": 用户拒绝接收
    public static EVENT_INTEMPLATEMSG_STATUS_BLOCK = "block";
    //"failed: system failed": 发送失败（非用户拒绝）
    public static EVENT_INTEMPLATEMSG_STATUS_FAILED = "failed: system failed";

    private msgId!: string;
    private status!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
        super(toUserName, fromUserName, createTime, event);
    }

    public get getMsgId(): string {
        return this.msgId;
    }

    public set setMsgId(msgId: string) {
        this.msgId = msgId;
    }

    public get getStatus(): string {
        return this.status;
    }

    public set setStatus(status: string) {
        this.status = status;
    }
}