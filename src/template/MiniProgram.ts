export class MiniProgram {
    private appid!: string;
    private pagepath!: string;

    public get appId(): string {
        return this.appid;
    }
    public set appId(appid: string) {
        this.appid = appid;
    }

    public get pagePath(): string {
        return this.pagepath;
    }
    public set pagePath(pagepath: string) {
        this.pagepath = pagepath;
    }
}