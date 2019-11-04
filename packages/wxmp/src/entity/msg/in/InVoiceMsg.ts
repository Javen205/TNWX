/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收语音消息
 */
import { InMsg } from './InMsg';

export class InVoiceMsg extends InMsg {
	private mediaId: string;
	private format: string;
	private msgId: string;

	constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
		super(toUserName, fromUserName, createTime, msgType);
	}

	public get getMediaId(): string {
		return this.mediaId;
	}

	public set setMediaId(mediaId: string) {
		this.mediaId = mediaId;
	}

	public get getFormat(): string {
		return this.format;
	}

	public set setFormat(format: string) {
		this.format = format;
	}

	public get getMsgId(): string {
		return this.msgId;
	}

	public set setMsgId(msgId: string) {
		this.msgId = msgId;
	}
}
