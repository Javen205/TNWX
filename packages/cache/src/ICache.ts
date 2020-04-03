/**
 * @author Javen
 * @copyright javendev@126.com
 * @description access_token 缓存接口
 */

export interface ICache {
  get(key: string): Promise<any>
  set(key: string, jsonValue: string): Promise<any>
  remove(key: string): Promise<any>
}
