/**
 * @author Javen 
 * @copyright 2019-03-15 16:12:03 javendev@126.com 
 * @description 封装 access_token
 */

export class AccessToken {
    private access_token!: string;
    private expires_in!: number;
    private errcode!: number;
    private errmsg!: string;


    private expired_time!: number;
    private jsonstr!: string;


    constructor(jsonStr: string) {
        this.jsonstr = jsonStr;
        let accessToken = JSON.parse(jsonStr);
        console.log('accessToken', accessToken);
        this.access_token = accessToken.access_token;
        this.expires_in = accessToken.expires_in;
        this.errcode = accessToken.errcode;
        this.errmsg = accessToken.errmsg;

        if (this.expires_in) {
            this.expired_time = new Date().getTime() + ((this.expires_in - 9) * 1000);
        }
        // 从缓存读取时还原
        if (accessToken.expired_time) {
            this.expired_time = accessToken.expired_time;
        }

    }


    public get getCacheJson(): string {
        let temp = JSON.parse(this.jsonstr);
        temp.expired_time = this.expired_time;
        return JSON.stringify(temp);
    }


    public isAvailable(): boolean {
        if (this.expired_time == null)
            return false;
        if (this.errcode != null)
            return false;
        if (this.expired_time < new Date().getTime())
            return false;
        return this.access_token != null;
    }

    public get accessToken(): string {
        return this.access_token;
    }
    public set accessToken(access_token: string) {
        this.access_token = access_token;
    }

    public get expiresIn(): number {
        return this.expires_in;
    }
    public set expiresIn(expires_in: number) {
        this.expires_in = expires_in;
    }

    public get errCode(): number {
        return this.errcode;
    }
    public set errCode(errcode: number) {
        this.errcode = errcode;
    }

    public get errMsg(): string {
        return this.errmsg;
    }
    public set errMsg(errmsg: string) {
        this.errmsg = errmsg;
    }


    public get jsonStr(): string {
        return this.jsonstr;
    }

}