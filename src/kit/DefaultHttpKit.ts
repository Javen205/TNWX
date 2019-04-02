import Promise from 'bluebird';
import * as request from 'request';
import * as fs from 'fs';
import { HttpDelegate } from "./HttpKit";


export class DefaultHttpKit implements HttpDelegate {

    httpGet(url: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            request.get(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            })
        });
    }

    httpPost(url: string, data: string): Promise<any> {
        return new Promise(function (resolve, reject) {
            request.post({
                url: url,
                form: data
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            })
        });
    }

    upload(url: string, filePath: string, params?: string): Promise<any> {
        let form = {};
        //构造表单
        if (params) {
            form = {
                media: fs.createReadStream(filePath),
                description: params // 在上传视频素材时需要POST另一个表单，id为description
            }
        } else {
            form = {
                media: fs.createReadStream(filePath)
            }
        }
        return new Promise(function (resolve, reject) {
            request.post({ url: url, formData: form, json: true }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        });
    }
}