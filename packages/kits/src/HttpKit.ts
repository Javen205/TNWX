import { DefaultHttpKit } from './DefaultHttpKit'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 封装网络请求工具
 */
export class HttpKit {
  private static delegate: HttpDelegate = new DefaultHttpKit()

  public static get getHttpDelegate(): HttpDelegate {
    return this.delegate
  }

  public static set setHttpDelegate(delegate: HttpDelegate) {
    this.delegate = delegate
  }
}

export interface HttpDelegate {
  httpGet(url: string): Promise<any>
  httpPost(url: string, data: string): Promise<any>
  httpPostWithCert(url: string, data: string, certFileContent: Buffer, caFileContent: Buffer, passphrase: string): Promise<any>
  upload(url: string, filePath: string, params?: string): Promise<any>
}
