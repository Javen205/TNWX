import { OutMsg } from './OutMsg';
import { InMsg } from '../in/InMsg';

export class OutVideoMsg extends OutMsg {
	private mediaId: string;
	private title: string;
	private description: string;

	constructor(inMsg: InMsg) {
		super(inMsg);
		this.msgType = 'video';
	}

	public toXml(): string {
		let str = super.toXml();
		if (!this.mediaId) {
			throw new Error('mediaId is null');
		}
		str += '<Video>\n';
		str += '<MediaId><![CDATA[' + this.getMediaId + ']]></MediaId>\n';
		str += '<Title><![CDATA[' + this.getTitle + ']]></Title>\n';
		str += '<Description><![CDATA[' + this.getDescription + ']]></Description>\n';
		str += '</Video>\n';
		str += '</xml>\n';
		return str;
	}

	public get getMediaId(): string {
		return this.mediaId;
	}

	public set setMediaId(mediaId: string) {
		this.mediaId = mediaId;
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
}
