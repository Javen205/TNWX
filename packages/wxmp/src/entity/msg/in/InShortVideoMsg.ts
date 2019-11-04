/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收视频消息
 */
import { InMsg } from './InMsg';

export class InShortVideoMsg extends InMsg {
	private mediaId: string;
	private thumbMediaId: string;
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

	public get getThumbMediaId(): string {
		return this.thumbMediaId;
	}

	public set setThumbMediaId(thumbMediaId: string) {
		this.thumbMediaId = thumbMediaId;
	}

	public get getMsgId(): string {
		return this.msgId;
	}

	public set setMsgId(msgId: string) {
		this.msgId = msgId;
	}
}
