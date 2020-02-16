import { ApiConfig } from '../ApiConfig'
import { ICache, DefaultCache } from '@tnwx/cache'

export class OpenCpConfigKit {
  static CFG_MAP: Map<String, ApiConfig> = new Map<String, ApiConfig>()

  static currentCorpId: string

  static DEFAULT_CFG_KEY: string = '_default_open_cfg_key_'

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
    return this.CFG_MAP.set(apiConfig.getCorpId, apiConfig)
  }

  public static removeApiConfigByConfig(apiConfig: ApiConfig): boolean {
    return this.removeApiConfig(apiConfig.getCorpId)
  }

  public static removeApiConfig(corpId: string): boolean {
    return this.CFG_MAP.delete(corpId)
  }

  public static setCurrentCorpId(corpId?: string) {
    if (corpId) {
      this.currentCorpId = corpId
    } else {
      let apiConfig = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (apiConfig) {
        corpId = apiConfig.getCorpId
        this.currentCorpId = corpId
      }
    }
  }

  public static removeCurrentCorpId() {
    this.currentCorpId = ''
  }

  public static get getCorpId(): string {
    let corpId: string = this.currentCorpId
    if (!corpId) {
      let apiConfig = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (apiConfig) {
        corpId = apiConfig.getCorpId
      }
    }
    return corpId
  }

  public static get getToken(): string {
    let token: string
    let corpId: string = this.DEFAULT_CFG_KEY
    if (this.currentCorpId) {
      corpId = this.currentCorpId
    }
    let apiConfig = this.CFG_MAP.get(corpId)
    if (apiConfig) {
      token = apiConfig.getToken
    }
    if (!token) {
      throw new Error('需事先调用 OpenCpConfigKit.putApiConfig(apiConfig) 将 corpId 对应的 ApiConfig 对象存入后, 才可以使用 OpenCpConfigKit.getToken 系列方法')
    }
    return token
  }

  public static get getApiConfig(): ApiConfig {
    return this.getApiConfigByCorpId(this.currentCorpId)
  }

  public static getApiConfigByCorpId(corpId: string): ApiConfig {
    if (this.isDevMode) {
      console.debug(`getApiConfigByCorpId corpId: ${corpId}`)
    }
    let cfg = this.CFG_MAP.get(corpId)
    if (!cfg) {
      throw new Error('需事先调用 OpenCpConfigKit.putApiConfig(apiConfig) 将 corpId 对应的 ApiConfig 对象存入后,才可以使用 OpenCpConfigKit.getApiConfig 系列方法')
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
