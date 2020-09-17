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
  httpGet(url: string, options?: any): Promise<any>
  httpGetToResponse(url: string, options?: any): Promise<any>
  httpPost(url: string, data: string, options?: any): Promise<any>
  httpPostToResponse(url: string, data: string, options?: any): Promise<any>
  httpDeleteToResponse(url: string, options?: any): Promise<any>
  httpPostWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any>
  upload(url: string, filePath: string, params?: string): Promise<any>
  uploadToResponse(url: string, filePath: string, data: string, options?: any): Promise<any>
  httpPutToResponse(url: string, data: string, options?: any): Promise<any>
}
