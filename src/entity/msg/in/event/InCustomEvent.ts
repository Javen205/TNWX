/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 客服消息事件
 */
import { EventInMsg } from "./EventInMsg";

export class InCustomEvent extends EventInMsg {
    // 接入会话：kf_create_session
    public static EVENT_INCUSTOM_KF_CREATE_SESSION: string = "kf_create_session";
    // 关闭会话：kf_close_session
    public static EVENT_INCUSTOM_KF_CLOSE_SESSION: string = "kf_close_session";
    // 转接会话：kf_switch_session
    public static EVENT_INCUSTOM_KF_SWITCH_SESSION: string = "kf_switch_session";

    private kfAccount!: string;
    private toKfAccount!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
        super(toUserName, fromUserName, createTime, event);
    }

    public get getKfAccount(): string {
        return this.kfAccount;
    }

    public set setKfAccount(kfAccount: string) {
        this.kfAccount = kfAccount;
    }

    public get getToKfAccount(): string {
        return this.toKfAccount;
    }

    public set setToKfAccount(toKfAccount: string) {
        this.toKfAccount = toKfAccount;
    }
}