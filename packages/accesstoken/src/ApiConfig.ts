/**
 * @author Javen
 * @copyright javendev@126.com
 * @description ApiConfig
 */

export class ApiConfig {
  private token: string
  // 企业微信为 agentId
  private appId: string
  // 企业ID
  private corpId: string
  private appScrect: string
  private suiteTicket: string
  // 是否加密 企业号必须为 true 微信测试号必须非 false
  private encryptMessage: boolean
  private encodingAesKey: string

  constructor(appId?: string, appScrect?: string, token?: string, encryptMessage: boolean = false, encodingAesKey?: string, corpId?: string, suiteTicket?: string) {
    this.appId = appId
    this.corpId = corpId
    this.appScrect = appScrect
    this.encryptMessage = encryptMessage
    this.encodingAesKey = encodingAesKey
    this.token = token
    this.suiteTicket = suiteTicket
  }

  public get getToken(): string {
    return this.token
  }

  public set setToken(token: string) {
    this.token = token
  }

  public get getAppId(): string {
    return this.appId
  }

  public set setAppId(appId: string) {
    this.appId = appId
  }

  public get getCorpId(): string {
    return this.corpId
  }

  public set setCorpId(corpId: string) {
    this.corpId = corpId
  }

  public get getSuiteTicket(): string {
    return this.suiteTicket
  }

  public set setSuiteTicket(suiteTicket: string) {
    this.appScrect = suiteTicket
  }

  public get getAppScrect(): string {
    return this.appScrect
  }

  public set setAppScrect(appScrect: string) {
    this.appScrect = appScrect
  }

  public get getEncryptMessage(): boolean {
    return this.encryptMessage
  }

  public set setEncryptMessage(encryptMessage: boolean) {
    this.encryptMessage = encryptMessage
  }

  public get getEncodingAesKey(): string {
    return this.encodingAesKey
  }

  public set setEncodingAesKey(encodingAesKey: string) {
    this.encodingAesKey = encodingAesKey
  }
}
