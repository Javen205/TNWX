import { ApiConfig } from '../ApiConfig'
import { IAccessTokenCache } from '../cache/IAccessTokenCache'
import { DefaultAccessTokenCache } from '../cache/DefaultAccessTokenCache'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信 ApiConfigKit
 */
export class QyApiConfigKit {
  static CFG_MAP: Map<String, ApiConfig> = new Map<String, ApiConfig>()

  static SEPARATOR: string = '_'

  static currentAppId: string

  static devMode: boolean = false

  static _accessTokenCache: IAccessTokenCache = new DefaultAccessTokenCache()

  public set devMode(devMode: boolean) {
    this.devMode = devMode
  }
  public static isDevMode(): boolean {
    return this.devMode
  }

  public static putApiConfig(apiConfig: ApiConfig) {
    return this.CFG_MAP.set(apiConfig.getAppId.concat(this.SEPARATOR).concat(apiConfig.getCorpId), apiConfig)
  }

  public static removeApiConfigByConfig(apiConfig: ApiConfig): boolean {
    return this.removeApiConfig(apiConfig.getAppId, apiConfig.getCorpId)
  }

  public static removeApiConfig(appId: string, corpId: string): boolean {
    return this.CFG_MAP.delete(appId.concat(this.SEPARATOR).concat(corpId))
  }

  public static setCurrentAppId(appId: string, corpId: string) {
    this.currentAppId = appId.concat(this.SEPARATOR).concat(corpId)
  }

  public static removeCurrentAppId() {
    this.currentAppId = ''
  }

  public static get getCorpId(): string {
    let corpId: string
    if (this.currentAppId) {
      corpId = this.currentAppId.split(this.SEPARATOR)[1]
      console.debug(`getCorpId: ${corpId}`)
    }
    if (!corpId) {
      throw new Error('需事先调用 QyApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后, 才可以使用 QyApiConfigKit.getCorpId 系列方法')
    }
    return corpId
  }

  public static get getAppId(): string {
    let appId: string
    if (this.currentAppId) {
      appId = this.currentAppId.split(this.SEPARATOR)[0]
      console.debug(`getAppId: ${appId}`)
    }
    if (!appId) {
      throw new Error('需事先调用 QyApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后, 才可以使用 QyApiConfigKit.getAppId 系列方法')
    }
    return appId
  }

  public static get getToken(): string {
    let token: string
    let apiConfig = this.CFG_MAP.get(this.currentAppId)
    if (apiConfig) {
      token = apiConfig.getToken
    }
    if (!token) {
      throw new Error('需事先调用 ApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后, 才可以使用 ApiConfigKit.getToken 系列方法')
    }
    return token
  }

  public static get getApiConfig(): ApiConfig {
    return this.getApiConfigByAppId(this.getAppId, this.getCorpId)
  }

  public static getApiConfigByAppId(appId: string, corpId: string): ApiConfig {
    if (this.isDevMode) {
      console.debug(`getApiConfigByAppId appId : ${appId} corpId: ${corpId}`)
    }
    let cfg = this.CFG_MAP.get(appId.concat(this.SEPARATOR).concat(corpId))
    if (!cfg) {
      throw new Error('需事先调用 QyApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后,才可以使用 ApiConfigKit.getApiConfigByAppId 系列方法')
    }
    return cfg
  }

  public static get getAccessTokenCache(): IAccessTokenCache {
    return this._accessTokenCache
  }

  public static set setAccessTokenCache(accessTokenCache: IAccessTokenCache) {
    this._accessTokenCache = accessTokenCache
  }
}
