export class MiniProgram {
    private appid: string;
    private pagepath: string;

    constructor(appId?: string, pagePath?: string) {
        this.appid = appId || "";
        this.pagepath = pagePath || "";
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