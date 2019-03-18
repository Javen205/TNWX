import { OutMsg } from "./OutMsg";
import { InMsg } from "../in/InMsg";

export class OutVoiceMsg extends OutMsg {
    private mediaId!: string;

    constructor(inMsg: InMsg) {
        super(inMsg);
        this.msgType = "voice";
    }

    public toXml(): string {
        let str = super.toXml();
        if (!this.mediaId) {
            throw new Error("mediaId is null");
        }
        str += "<Voice>\n<MediaId><![CDATA[" + this.mediaId + "]]></MediaId>\n</Voice>\n</xml>\n";
        return str;
    }

    public get getMediaId(): string {
        return this.mediaId;
    }

    public set setMediaId(mediaId: string) {
        this.mediaId = mediaId;
    }
}