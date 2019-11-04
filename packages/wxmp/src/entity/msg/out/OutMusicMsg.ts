import { OutMsg } from './OutMsg';
import { InMsg } from '../in/InMsg';

export class OutMusicMsg extends OutMsg {
	private title: string;
	private description: string;
	private musicUrl: string;
	private hqMusicUrl: string;
	private funcFlag: string = '0';

	constructor(inMsg: InMsg) {
		super(inMsg);
		this.msgType = 'music';
	}

	public toXml(): string {
		let str = super.toXml();
		str += '<Music>\n';
		if (this.title) {
			str += '<Title><![CDATA[' + this.title + ']]></Title>\n';
		}
		if (this.description) {
			str += '<Description><![CDATA[' + this.description + ']]></Description>\n';
		}
		if (this.musicUrl) {
			str += '<MusicUrl><![CDATA[' + this.musicUrl + ']]></MusicUrl>\n';
		}
		if (this.hqMusicUrl) {
			str += '<HQMusicUrl><![CDATA[' + this.hqMusicUrl + ']]></HQMusicUrl>\n';
		}
		str += '<FuncFlag><![CDATA[' + this.hqMusicUrl + ']]></FuncFlag>\n</Music>\n';
		str += '</xml>\n';
		return str;
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

	public get getMusicUrl(): string {
		return this.musicUrl;
	}

	public set setMusicUrl(musicUrl: string) {
		this.musicUrl = musicUrl;
	}

	public get getHqMusicUrl(): string {
		return this.hqMusicUrl;
	}

	public set setHqMusicUrl(hqMusicUrl: string) {
		this.hqMusicUrl = hqMusicUrl;
	}

	public get getFuncFlag(): string {
		return this.funcFlag;
	}
	public set setFuncFlag(funcFlag: boolean) {
		this.funcFlag = funcFlag ? '1' : '0';
	}
}
