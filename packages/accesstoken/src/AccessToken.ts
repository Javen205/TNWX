/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 封装 access_token
 */

export class AccessToken {
  private access_token: string
  private refresh_token: string
  private expires_in: number
  private errcode: number
  private errmsg: string
  private expired_time: number
  private json: string

  constructor(json: string, tokenType = AccessTokenType.NORMAL_TOKEN) {
    this.json = json
    let accessToken = JSON.parse(json)
    if (tokenType === AccessTokenType.NORMAL_TOKEN) {
      this.access_token = accessToken.access_token
    } else if (tokenType === AccessTokenType.PROVIDER_TOKEN) {
      this.access_token = accessToken.provider_access_token
    } else if (tokenType === AccessTokenType.SUITE_TOKEN) {
      this.access_token = accessToken.suite_access_token
    } else if (tokenType === AccessTokenType.COMPONENT_TOKEN) {
      this.access_token = accessToken.component_access_token
    } else if (tokenType === AccessTokenType.AUTHORIZER_TOKEN) {
      this.access_token = accessToken.authorizer_access_token
      this.refresh_token = accessToken.authorizer_refresh_token
    }
    this.expires_in = accessToken.expires_in
    this.errcode = accessToken.errcode
    this.errmsg = accessToken.errmsg

    if (this.expires_in) {
      this.expired_time = new Date().getTime() + (this.expires_in - 9) * 1000
    }
    // 从缓存读取时还原
    if (accessToken.expired_time) {
      this.expired_time = accessToken.expired_time
    }
  }

  public get getCacheJson(): string {
    let temp = JSON.parse(this.json)
    temp.expired_time = this.expired_time
    return JSON.stringify(temp)
  }

  public isAvailable(): boolean {
    if (this.expired_time == null) return false
    if (this.errcode) return false
    if (this.expired_time < new Date().getTime()) return false
    return this.access_token != null
  }

  public get getAccessToken(): string {
    return this.access_token
  }

  public set setAccessToken(access_token: string) {
    this.access_token = access_token
  }

  public get getRefeshAccessToken(): string {
    return this.refresh_token
  }

  public set setRefeshAccessToken(refresh_token: string) {
    this.refresh_token = refresh_token
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

/**
 * AccessToken 类型
 */
export enum AccessTokenType {
  /**
   * 企业微信第三方应用凭证
   */
  SUITE_TOKEN = 'suite_token',
  /**
   * 企业微信服务商凭证
   */
  PROVIDER_TOKEN = 'provider_token',
  /**
   * 普通接口凭证(适用于微信公众号、企业微信、小程序、小游戏)
   */
  NORMAL_TOKEN = 'normal_token',
  /**
   * 微信开放平台凭证
   */
  COMPONENT_TOKEN = 'component_access_token',
  /**
   * 微信开放平台第三方应用凭证
   */
  AUTHORIZER_TOKEN = 'authorizer_token'
}
