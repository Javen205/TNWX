import { DefaultHttpKit } from './DefaultHttpKit';
import { AxiosHttpKit } from './AxiosHttpKit';

/**
 * @author Javen 
 * @copyright 2019-03-30 javendev@126.com 
 * @description http 工具封装
 */
export class HttpKit {
    private static delegate: HttpDelegate = new AxiosHttpKit();

    public static get getHttpDelegate(): HttpDelegate {
        return this.delegate;
    }

    public static set setHttpDelegate(delegate: HttpDelegate) {
        this.delegate = delegate;
    }
}

export interface HttpDelegate {
    httpGet(url: string): Promise<any>;
    httpPost(url: string, data: string): Promise<any>;
    upload(url: string, filePath: string, params?: string): Promise<any>;
}