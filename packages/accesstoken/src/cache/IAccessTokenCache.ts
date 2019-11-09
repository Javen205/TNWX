/**
 * @author Javen
 * @copyright javendev@126.com
 * @description access_token 缓存接口
 */

export interface IAccessTokenCache {
  get(key: string): string
  set(key: string, jsonValue: string): void
  remove(key: string): void
}
