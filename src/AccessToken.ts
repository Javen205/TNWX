export class AccessToken {
    private _accessToken: string;
    private _expiresTime: number;

    constructor(access_token: string, expires_time: number) {
        this._accessToken = access_token;
        this._expiresTime = expires_time;
    }

    public get accessToken(): string {
        return this._accessToken;
    }
    public set accessToken(access_token: string) {
        this._accessToken = access_token;
    }

    public get expiresTime(): number {
        return this._expiresTime;
    }
    public set expiresTime(expires_time: number) {
        this._expiresTime = expires_time;
    }
}