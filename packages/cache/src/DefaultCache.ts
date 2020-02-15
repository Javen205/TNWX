/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 默认的缓存策略
 */

import { ICache } from './ICache'

export class DefaultCache implements ICache {
  private map: Map<string, string> = new Map<string, string>()

  get(key: string): string {
    return this.map.get(key) || ''
  }

  set(key: string, jsonValue: string) {
    this.map.set(key, jsonValue)
  }

  remove(key: string) {
    this.map.delete(key)
  }
}
