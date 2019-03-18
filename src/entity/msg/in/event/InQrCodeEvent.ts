import { EventInMsg } from "./EventInMsg";

export class InQrCodeEvent extends EventInMsg {

    // 用户未关注时，进行关注后的事件推送： subscribe
    public static EVENT_INQRCODE_SUBSCRIBE = "subscribe";

    // 用户已关注时的事件推送： SCAN
    public static EVENT_INQRCODE_SCAN = "SCAN";

    private eventKey!: string;
    private ticket!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
        super(toUserName, fromUserName, createTime, event);
    }

    public get getEventKey(): string {
        return this.eventKey;
    }

    public set setEventKey(eventKey: string) {
        this.eventKey = eventKey;
    }

    public get getTicket(): string {
        return this.ticket;
    }

    public set setTicket(ticket: string) {
        this.ticket = ticket;
    }
}
