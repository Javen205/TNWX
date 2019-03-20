export class BatchUserInfo {
    private openid: string;
    private lang: string;

    constructor(openid: string, lang: string) {
        this.openid = openid;
        this.lang = lang;
    }

    public get getOpenId(): string {
        return this.openid;
    }

    public set setOpenId(openid: string) {
        this.openid = openid;
    }

    public get getLang(): string {
        return this.lang;
    }

    public set setLang(lang: string) {
        this.lang = lang;
    }

}