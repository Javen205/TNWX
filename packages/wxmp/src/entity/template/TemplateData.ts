/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 模板消息数据
 */

export class TemplateData {
	private touser: string;
	private template_id: string;
	private url: string;
	private miniprogram: MiniProgram;
	private data: Map<string, TemplateItem>;

	public New(): TemplateData {
		this.data = new Map<string, TemplateItem>();
		this.miniprogram = new MiniProgram();
		return this;
	}

	public get getToUser(): string {
		return this.touser;
	}

	public setToUser(touser: string): TemplateData {
		this.touser = touser;
		return this;
	}

	public get getTemplateId(): string {
		return this.template_id;
	}

	public setTemplateId(templateId: string): TemplateData {
		this.template_id = templateId;
		return this;
	}

	public get getTemplateUrl(): string {
		return this.url;
	}

	public setTemplateUrl(url: string): TemplateData {
		this.url = url;
		return this;
	}

	public get getMiniProgram(): MiniProgram {
		return this.miniprogram;
	}

	public setMiniProgram(miniprogram: MiniProgram): TemplateData {
		this.miniprogram = miniprogram;
		return this;
	}

	public add(key: string, value: string, color: string): TemplateData {
		this.data.set(key, new TemplateItem(value, color));
		return this;
	}

	public build(): string {
		let temp = {
			touser: this.touser,
			template_id: this.template_id,
			url: this.url,
			miniprogram: this.miniprogram,
			data: this._mapToObj(this.data)
		};
		return JSON.stringify(temp);
	}

	_mapToObj(map: Map<any, any>) {
		let obj = Object.create(null);
		for (let [ k, v ] of map) {
			obj[k] = v;
		}
		return obj;
	}

	_objToMap(obj: any) {
		let strMap = new Map();
		for (let k of Object.keys(obj)) {
			strMap.set(k, obj[k]);
		}
		return strMap;
	}
}

export class MiniProgram {
	private appid: string;
	private pagepath: string;

	constructor(appId?: string, pagePath?: string) {
		this.appid = appId || '';
		this.pagepath = pagePath || '';
	}

	public get getAppId(): string {
		return this.appid;
	}
	public set setAppId(appid: string) {
		this.appid = appid;
	}

	public get getPagePath(): string {
		return this.pagepath;
	}
	public set getPagePath(pagepath: string) {
		this.pagepath = pagepath;
	}
}

export class TemplateItem {
	private value: string;
	private color: string;

	constructor(value: string, color: string) {
		this.value = value;
		this.color = color;
	}

	public get getValue(): string {
		return this.value;
	}
	public set setValue(value: string) {
		this.value = value;
	}

	public get getColor(): string {
		return this.color;
	}
	public set setColor(color: string) {
		this.color = color;
	}
}
