/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 接收链接消息
 */
import { InMsg } from './InMsg';

export class InLinkMsg extends InMsg {
	private title: string;
	private description: string;
	private url: string;
	private msgId: string;

	constructor(toUserName: string, fromUserName: string, createTime: number, msgType: string) {
		super(toUserName, fromUserName, createTime, msgType);
	}

	public get getTitle(): string {
		return this.title;
	}

	public set setTitle(title: string) {
		this.title = title;
	}

	public get getDescription(): string {
		return this.description;
	}

	public set setDescription(description: string) {
		this.description = description;
	}

	public get getUrl(): string {
		return this.url;
	}

	public set setUrl(url: string) {
		this.url = url;
	}

	public get getMsgId(): string {
		return this.msgId;
	}

	public set setMsgId(msgId: string) {
		this.msgId = msgId;
	}
}
