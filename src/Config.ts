export class Config {
    private _token: string;
    private _appId: string;
    private _appScrect: string;
    private _encryptMessage: boolean;
    private _encodingAesKey: string;

    constructor(token: string, appId: string, appScrect: string,
        encryptMessage: boolean, encodingAesKey: string) {
        this._token = token;
        this._appId = appId;
        this._appScrect = appScrect;
        this._encryptMessage = encryptMessage;
        this._encodingAesKey = encodingAesKey;
    }

    public get token(): string {
        return this._token;
    }
    public set token(token: string) {
        this._token = token;
    }

    public get appId(): string {
        return this._appId;
    }
    public set appId(appId: string) {
        this._appId = appId;
    }

    public get appScrect(): string {
        return this._appScrect;
    }
    public set appScrect(appScrect: string) {
        this._appScrect = appScrect;
    }

    public get encryptMessage(): boolean {
        return this._encryptMessage;
    }
    public set encryptMessage(encryptMessage: boolean) {
        this._encryptMessage = encryptMessage;
    }

    public get encodingAesKey(): string {
        return this._encodingAesKey;
    }
    public set encodingAesKey(encodingAesKey: string) {
        this._encodingAesKey = encodingAesKey;
    }
}