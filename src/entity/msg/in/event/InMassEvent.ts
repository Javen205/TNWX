/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 群发结果
 */
import { EventInMsg } from "./EventInMsg";

export class InMassEvent extends EventInMsg {
    public static EVENT: string = "MASSSENDJOBFINISH";
    //群发成功
    public static EVENT_INMASS_STATUS_SENDSUCCESS: string = "sendsuccess";
    //群发失败，其他失败情况是err(num)
    public static EVENT_INMASS_STATUS_SENDFAIL: string = "sendfail";

    private msgId!: string;
    private status!: string;
    private totalCount!: string;
    private filterCount!: string;
    private sentCount!: string;
    private errorCount!: string;

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

    public get getTotalCount(): string {
        return this.totalCount;
    }

    public set setTotalCount(totalCount: string) {
        this.totalCount = totalCount;
    }

    public get getFilterCount(): string {
        return this.filterCount;
    }

    public set setFilterCount(filterCount: string) {
        this.filterCount = filterCount;
    }

    public get getSentCount(): string {
        return this.sentCount;
    }

    public set setSentCount(sentCount: string) {
        this.sentCount = sentCount;
    }

    public get getErrorCount(): string {
        return this.errorCount;
    }

    public set setErrorCount(errorCount: string) {
        this.errorCount = errorCount;
    }
}