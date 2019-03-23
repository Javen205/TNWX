/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 门店审核通知事件
 */
import { EventInMsg } from "./EventInMsg";

export class InPoiCheckNotifyEvent extends EventInMsg {

    public static EVENT: string = "poi_check_notify";

    private uniqId!: string;
    private poiId!: string;
    private result!: string;
    private msg!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
        super(toUserName, fromUserName, createTime, event);
    }

    public get getUniqId(): string {
        return this.uniqId;
    }

    public set setUniqId(uniqId: string) {
        this.uniqId = uniqId;
    }

    public get getPoiId(): string {
        return this.poiId;
    }

    public set setPoiId(poiId: string) {
        this.poiId = poiId;
    }

    public get getResult(): string {
        return this.result;
    }

    public set setResult(result: string) {
        this.result = result;
    }

    public get getMsg(): string {
        return this.msg;
    }

    public set setMsg(msg: string) {
        this.msg = msg;
    }
}