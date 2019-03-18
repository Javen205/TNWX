import { OutMsg } from "./OutMsg";
import { InMsg } from "../in/InMsg";

export class OutImageMsg extends OutMsg {
    private mediaId!: string;

    constructor(inMsg: InMsg) {
        super(inMsg);
        this.msgType = "image";
    }

    public toXml(): string {
        let str = super.toXml();
        if (!this.mediaId) {
            throw new Error("mediaId is null");
        }
        str += "<Image>\n<MediaId><![CDATA[" + this.mediaId + "]]></MediaId></Image>\n</xml>\n";
        return str;
    }

    public get getMediaId(): string {
        return this.mediaId;
    }

    public set setMediaId(mediaId: string) {
        this.mediaId = mediaId;
    }
}