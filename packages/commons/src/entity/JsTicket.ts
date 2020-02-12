export class JsTicket {
  private ticket: string
  private expires_in: number
  private errcode: number
  private errmsg: string

  private expired_time: number
  private json: string

  constructor(json: string) {
    this.json = json
    let ticket = JSON.parse(json)
    this.ticket = ticket.ticket
    this.expires_in = ticket.expires_in
    this.errcode = ticket.errcode
    this.errmsg = ticket.errmsg

    if (this.expires_in) {
      this.expired_time = new Date().getTime() + (this.expires_in - 9) * 1000
    }
    // 从缓存读取时还原
    if (ticket.expired_time) {
      this.expired_time = ticket.expired_time
    }
  }

  public get getCacheJson(): string {
    let temp = JSON.parse(this.json)
    temp.expired_time = this.expired_time
    return JSON.stringify(temp)
  }

  public isAvailable(): boolean {
    if (this.expired_time == null) return false
    if (this.errcode != null) return false
    if (this.expired_time < new Date().getTime()) return false
    return this.ticket != null
  }

  public get getTicket(): string {
    return this.ticket
  }

  public set setTicket(ticket: string) {
    this.ticket = ticket
  }

  public get getExpiresIn(): number {
    return this.expires_in
  }

  public set setExpiresIn(expires_in: number) {
    this.expires_in = expires_in
  }

  public get getErrCode(): number {
    return this.errcode
  }

  public set setErrCode(errcode: number) {
    this.errcode = errcode
  }

  public get getErrMsg(): string {
    return this.errmsg
  }

  public set setErrMsg(errmsg: string) {
    this.errmsg = errmsg
  }

  public get getJson(): string {
    return this.json
  }
}
