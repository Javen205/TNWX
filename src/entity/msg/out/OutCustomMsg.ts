/**
 * @author Javen 
 * @copyright 2019-03-23 javendev@126.com 
 * @description 转发多客服消息 或者 转发到指定客服
 */
import { OutMsg } from "./OutMsg";
import { TransInfo } from "./TransInfo";
import { InMsg } from "../in/InMsg";

export class OutCustomMsg extends OutMsg {
    private transInfo!: TransInfo;

    constructor(inMsg: InMsg) {
        super(inMsg);
        this.msgType = "transfer_customer_service";
    }

    public toXml(): string {
        let str = super.toXml();
        if (null != this.transInfo && this.transInfo.getKfAccount) {
            str += "<TransInfo>\n";
            str += "<KfAccount><![CDATA[" + this.transInfo.getKfAccount + "]]></KfAccount>\n";
            str += "</TransInfo>\n";
        }
        str += "</xml>\n";
        return str;
    }

    public getTransInfo(): TransInfo {
        return this.transInfo;
    }

    public setTransInfo(transInfo: TransInfo) {
        this.transInfo = transInfo;
    }
}