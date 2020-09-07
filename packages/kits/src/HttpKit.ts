import { AxiosHttpKit } from './AxiosHttpKit'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 封装网络请求工具
 */
export class HttpKit {
  private static delegate: HttpDelegate = new AxiosHttpKit()

  public static get getHttpDelegate(): HttpDelegate {
    return this.delegate
  }

  public static set setHttpDelegate(delegate: HttpDelegate) {
    this.delegate = delegate
  }
}

export interface HttpDelegate {
  httpGet<T = any>(url: string, options?: any): Promise<T>
  httpGetToResponse<T = any>(url: string, options?: any): Promise<T>
  httpPost<T = any>(url: string, data: string, options?: any): Promise<T>
  httpPostToResponse<T = any>(url: string, data: string, options?: any): Promise<T>
  httpDeleteToResponse<T = any>(url: string, options?: any): Promise<T>
  httpPostWithCert<T = any>(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<T>
  upload<T = any>(url: string, filePath: string, params?: string): Promise<T>
  uploadToResponse<T = any>(url: string, filePath: string, data: string, options?: any): Promise<T>
}
