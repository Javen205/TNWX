/**
 * @author Javen 
 * @copyright 2019-03-17 14:44:21 javendev@126.com 
 * @description  接收地理位置消息
 */
import { InMsg } from "./InMsg";

export class InLocationMsg extends InMsg {
    private location_X!: string;
    private location_Y!: string;
    private scale!: string;
    private label!: string;
    private msgId!: string;

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public get getLocation_X(): string {
        return this.location_X;
    }

    public set setLocation_X(location_X: string) {
        this.location_X = location_X;
    }

    public get getLocation_Y(): string {
        return this.location_Y;
    }

    public set setLocation_Y(location_Y: string) {
        this.location_Y = location_Y;
    }

    public get getScale(): string {
        return this.scale;
    }

    public set setScale(scale: string) {
        this.scale = scale;
    }

    public get getLabel(): string {
        return this.label;
    }

    public set setLabel(label: string) {
        this.label = label;
    }

    public get getMsgId(): string {
        return this.msgId;
    }

    public set setMsgId(msgId: string) {
        this.msgId = msgId;
    }
}