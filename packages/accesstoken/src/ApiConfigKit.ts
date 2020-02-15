import { ApiConfig } from './ApiConfig'
import { ICache, DefaultCache } from '@tnwx/cache'

export class ApiConfigKit {
  static CFG_MAP: Map<String, ApiConfig> = new Map<String, ApiConfig>()

  static currentAppId: string

  static DEFAULT_CFG_KEY: string = '_default_cfg_key_'

  static devMode: boolean = false

  static _cache: ICache = new DefaultCache()

  public set devMode(devMode: boolean) {
    this.devMode = devMode
  }
  public static isDevMode(): boolean {
    return this.devMode
  }

  public static putApiConfig(apiConfig: ApiConfig) {
    if (this.CFG_MAP.size == 0) {
      this.CFG_MAP.set(this.DEFAULT_CFG_KEY, apiConfig)
    }
    return this.CFG_MAP.set(apiConfig.getAppId, apiConfig)
  }

  public static removeApiConfigByConfig(apiConfig: ApiConfig): boolean {
    return this.removeApiConfig(apiConfig.getAppId)
  }

  public static removeApiConfig(appId: string): boolean {
    return this.CFG_MAP.delete(appId)
  }

  public static setCurrentAppId(appId?: string) {
    if (appId) {
      this.currentAppId = appId
    } else {
      let apiConfig = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (apiConfig) {
        appId = apiConfig.getAppId
        this.currentAppId = appId
      }
    }
  }

  public static removeCurrentAppId() {
    this.currentAppId = ''
  }

  public static get getAppId(): string {
    let appId: string = this.currentAppId
    if (!appId) {
      let apiConfig = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (apiConfig) {
        appId = apiConfig.getAppId
      }
    }
    return appId
  }

  public static get getToken(): string {
    let token: string
    let appId: string = this.DEFAULT_CFG_KEY
    if (this.currentAppId) {
      appId = this.currentAppId
    }
    let apiConfig = this.CFG_MAP.get(appId)
    if (apiConfig) {
      token = apiConfig.getToken
    }
    if (!token) {
      throw new Error('需事先调用 ApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后, 才可以使用 ApiConfigKit.getToken 系列方法')
    }
    return token
  }

  public static get getApiConfig(): ApiConfig {
    return this.getApiConfigByAppId(this.getAppId)
  }

  public static getApiConfigByAppId(appId: string): ApiConfig {
    if (ApiConfigKit.isDevMode) {
      console.debug(`getApiConfigByAppId appId: ${appId}`)
    }
    let cfg = this.CFG_MAP.get(appId)
    if (!cfg) {
      throw new Error('需事先调用 ApiConfigKit.putApiConfig(apiConfig) 将 appId 对应的 ApiConfig 对象存入后,才可以使用 ApiConfigKit.getApiConfig 系列方法')
    }
    return cfg
  }

  public static get getCache(): ICache {
    return this._cache
  }

  public static set setCache(cache: ICache) {
    this._cache = cache
  }
}
