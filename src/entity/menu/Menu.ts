
export class Menu {
    private button!: Button[];
    private matchrule!: Matchrule;

    public get getButton(): Button[] {
        return this.button;
    }
    public set setButton(button: Button[]) {
        this.button = button;
    }

    public get getMatchrule(): Matchrule {
        return this.matchrule;
    }
    public set setMatchrule(matchrule: Matchrule) {
        this.matchrule = matchrule;
    }
}

export class Button {
    private name: string;
    private type: string;

    constructor(name?: string, type?: string) {
        this.name = name || '';
        this.type = type || '';
    }

    public get getName(): string {
        return this.name;
    }
    public set setName(name: string) {
        this.name = name;
    }

    public get getType(): string {
        return this.type;
    }
    public set setType(type: string) {
        this.type = type;
    }
}


export class ClickButton extends Button {
    private key: string;

    constructor(name?: string, type?: string, key?: string) {
        super(name, type);
        this.key = key || '';
    }

    public get getKey(): string {
        return this.key;
    }
    public set setKey(key: string) {
        this.key = key;
    }
}


export class ComButton extends Button {
    private sub_button: Button[];

    constructor(name?: string, type?: string, sub_button?: Button[]) {
        super(name, type);
        this.sub_button = sub_button || [];
    }

    public get getSubButton(): Button[] {
        return this.sub_button;
    }
    public set setSubButton(sub_button: Button[]) {
        this.sub_button = sub_button;
    }
}


export class MediaButton extends Button {
    private media_id: string;

    constructor(name?: string, type?: string, media_id?: string) {
        super(name, type);
        this.media_id = media_id || '';
    }

    public get getMediaId(): string {
        return this.media_id;
    }
    public set setMediaId(media_id: string) {
        this.media_id = media_id;
    }
}

export class ViewButton extends Button {
    private url: string;

    constructor(name?: string, type?: string, url?: string) {
        super(name, type);
        this.url = url || '';
    }

    public get getUrl(): string {
        return this.url;
    }
    public set setUrl(url: string) {
        this.url = url;
    }
}

export class Matchrule {
    //用户分组id，可通过用户分组管理接口获取
    private tag_id!: string;
    //性别：男（1）女（2），不填则不做匹配
    private sex!: string;
    //国家信息
    private country!: string;
    //省份信息
    private province!: string;
    //城市信息
    private city!: string;
    //客户端版本，当前只具体到系统型号：IOS(1), Android(2),Others(3)，不填则不做匹配
    private client_platform_type!: string;
    //语言信息
    private language!: string;


    public get getTagId(): string {
        return this.tag_id;
    }

    public set setTagId(tag_id: string) {
        this.tag_id = tag_id;
    }

    public get getSex(): string {
        return this.sex;
    }

    public set setSex(sex: string) {
        this.sex = sex;
    }

    public get getCountry(): string {
        return this.country;
    }

    public set setCountry(country: string) {
        this.country = country;
    }

    public get getProvince(): string {
        return this.province;
    }

    public set setProvince(province: string) {
        this.province = province;
    }

    public get getCity(): string {
        return this.city;
    }

    public set setCity(city: string) {
        this.city = city;
    }

    public get getClientPlatformType(): string {
        return this.client_platform_type;
    }

    public set setClientPlatformType(client_platform_type: string) {
        this.client_platform_type = client_platform_type;
    }

    public get getLanguage(): string {
        return this.language;
    }

    public set setLanguage(language: string) {
        this.language = language;
    }

}