import { InMsg } from "./InMsg";

export class InNotDefinedMsg extends InMsg {

    constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
        super(toUserName, fromUserName, createTime, msgType);
    }
}