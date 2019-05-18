/**
 * @author Javen 
 * @copyright 2019-04-14 javendev@126.com 
 * @description  axios 实现 http 请求
 */
import { HttpDelegate } from "./HttpKit";
import axios, { AxiosInstance } from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export class AxiosHttpKit implements HttpDelegate {

    httpGet(url: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            axios.get(url)
                .then(function (response) {
                    resolve(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    httpPost(url: string, data: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            axios.post(url, data)
                .then(function (response) {
                    resolve(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    httpPostWithCert(url: string, data: string, certFileContent: Buffer, caFileContent: Buffer, passphrase: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    // TODO 存在问题
    upload(url: string, filePath: string, params?: string | undefined): Promise<any> {
        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            let configs = {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: params
            };
            formData.append('media', fs.createReadStream(filePath));
            axios.post(url, formData, configs)
                .then(function (response) {
                    resolve(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }


}