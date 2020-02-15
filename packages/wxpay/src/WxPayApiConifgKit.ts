import { WxPayApiConfig } from './WxPayApiConfig'
import { ICache, DefaultCache } from '@tnwx/cache'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信支付常用配置 Kit
 */
export class WxPayApiConifgKit {
  static CFG_MAP: Map<String, WxPayApiConfig> = new Map<String, WxPayApiConfig>()

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

  public static putConfig(config: WxPayApiConfig) {
    if (this.CFG_MAP.size == 0) {
      this.CFG_MAP.set(this.DEFAULT_CFG_KEY, config)
    }
    return this.CFG_MAP.set(config.appId, config)
  }

  public static removeConfigByConfig(config: WxPayApiConfig): boolean {
    return this.removeConfig(config.appId)
  }

  public static removeConfig(appId: string): boolean {
    return this.CFG_MAP.delete(appId)
  }

  public static setCurrentAppId(appId?: string) {
    if (appId) {
      this.currentAppId = appId
    } else {
      let config = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (config) {
        appId = config.appId
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
      let config = this.CFG_MAP.get(this.DEFAULT_CFG_KEY)
      if (config) {
        appId = config.appId
      }
    }
    return appId
  }

  public static get getConfig(): WxPayApiConfig {
    return this.getConfigByAppId(this.currentAppId)
  }

  public static getConfigByAppId(appId: string): WxPayApiConfig {
    if (this.isDevMode) {
      console.debug(`getConfigByAppId appId: ${appId}`)
    }
    let cfg = this.CFG_MAP.get(appId)
    if (!cfg) {
      throw new Error('需事先调用 WxPayApiConfigKit.putConfig(config) 将 appId 对应的 config 对象存入后,才可以使用 WxPayApiConfigKit.getConfig 系列方法')
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
