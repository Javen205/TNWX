import * as crypto from 'crypto';
import * as urltil from 'url';
import * as https from 'https';
import * as util from 'util';
import { parseString } from 'xml2js';

import { ApiUrls } from './ApiUrls'
import { AccessToken } from './AccessToken'
import { Config } from './Config'
import { CryptoTools } from './CryptoTools';
import { Msg } from './Msg';

export class WeChat {
    private _config: Config;
    private _accessToken: AccessToken;

    constructor(config: Config, accessToken: AccessToken) {
        this._config = config;
        this._accessToken = accessToken;
    }

    public get config(): Config {
        return this._config;
    }

    public set config(config: Config) {
        this._config = config;
    }

    public get accessToken(): AccessToken {
        return this._accessToken;
    }

    public set accessToken(accessToken: AccessToken) {
        this._accessToken = accessToken;
    }

    checkSignature(request, response) {
        //微信服务器 get 请求的参数 signature、timestamp、nonce、echostr
        let signature = request.query.signature,//微信加密签名
            timestamp = request.query.timestamp,//时间戳
            nonce = request.query.nonce,//随机数
            echostr = request.query.echostr;//随机字符串

        //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
        let tempStr = [this._config.token, timestamp, nonce].sort().join('');
        //创建加密类型 
        const hashCode = crypto.createHash('sha1');
        //对传入的字符串进行加密
        let tempSignature = hashCode.update(tempStr, 'utf8').digest('hex');
        //校验签名
        if (tempSignature === signature) {
            response.send(echostr);
        } else {
            response.send("签名异常");
        }
    }
    getAccessToken() {
        let that = this;
        return new Promise(function (resolve, reject) {
            //获取当前时间 
            let currentTime = new Date().getTime();
            //格式化请求地址
            let url = util.format(ApiUrls.accessToken, ApiUrls.wxDomain, that.config.appId, that.config.appScrect);
            if (that._accessToken.accessToken === "" || that._accessToken.expiresTime < currentTime) {
                console.log('开始获取新的token...');

                that.get(url).then(function (data) {
                    let tempData = <string>data;
                    var result = JSON.parse(tempData);
                    if (tempData.indexOf("errcode") < 0) {
                        that._accessToken.accessToken = result.access_token;
                        that._accessToken.expiresTime = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                        //将获取后的 access_token 返回
                        resolve(that._accessToken.accessToken);
                    } else {
                        //将错误返回
                        resolve(result);
                    }
                });
            } else {
                //将本地存储的 access_token 返回
                resolve(that._accessToken.accessToken);
            }
        });
    }

    /**
    * 用于处理 https Get请求方法
    * @param {String} url 请求地址 
    */
    get(url: string) {
        return new Promise(function (resolve, reject) {
            https.get(url, function (res) {
                let buffer: Array<any> = [], result = "";
                //监听 data 事件
                res.on('data', function (data) {
                    buffer.push(data);
                });
                //监听 数据传输完成事件
                res.on('end', function () {
                    result = Buffer.concat(buffer).toString('utf-8');
                    //将最后结果返回
                    resolve(result);
                });
            }).on('error', function (err) {
                reject(err);
            });
        });
    }
    /**
     * 用于处理 https Post请求方法
     * @param {String} url  请求地址
     * @param {JSON} data 提交的数据
     */
    post(url: string, data: string) {
        return new Promise(function (resolve, reject) {
            //解析 url 地址
            let urlData = urltil.parse(url);
            //设置 https.request  options 传入的参数对象
            let options = {
                //目标主机地址
                hostname: urlData.hostname,
                //目标地址 
                path: urlData.path,
                //请求方法
                method: 'POST',
                //头部协议
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(data, 'utf-8')
                }
            };
            let req = https.request(options, function (res) {
                let buffer: Uint8Array[] = [], result = '';
                //用于监听 data 事件 接收数据
                res.on('data', function (data) {
                    buffer.push(data);
                });
                //用于监听 end 事件 完成数据的接收
                res.on('end', function () {
                    result = Buffer.concat(buffer).toString('utf-8');
                    resolve(result);
                })
            })
                //监听错误事件
                .on('error', function (err) {
                    console.log(err);
                    reject(err);
                });
            //传入数据
            req.write(data);
            req.end();
        });
    }

    handleMsg(request, response) {

        console.log('request.query', request.query);


        let that = this, buffer: Uint8Array[] = [];

        //实例微信消息加解密
        let cryptoTools = new CryptoTools(request, that._config);
        //监听 data 事件 用于接收数据
        request.on('data', function (data) {
            buffer.push(data);
        });

        request.on('end', function () {
            let msgXml = Buffer.concat(buffer).toString('utf-8');
            console.log('接收消息...', msgXml);
            parseString(msgXml, { explicitArray: false }, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }

                result = result.xml;
                console.log('result.xml', result);
                //判断消息加解密方式
                if (request.query.encrypt_type == 'aes') {
                    //对加密数据解密
                    result = cryptoTools.decryptMsg(result.Encrypt);
                }
                let toUser = result.ToUserName; //接收方微信
                let fromUser = result.FromUserName;//发送方微信
                let msgType = result.MsgType.toLowerCase();//消息类型
                let msgContent = result.Content;

                console.log('toUser', toUser, 'fromUser', fromUser, 'msgType', msgType, 'msgContent', msgContent);

                let responseMsg = ""; //回复消息的内容

                //判断消息类型
                if (msgType === "event") {
                    console.log('事件消息....');
                    //判断事件类型
                    switch (result.Event.toLowerCase()) {
                        case 'subscribe':
                            //回复消息
                            let content = "欢迎关注 By Javen";
                            responseMsg = Msg.txtMsg(fromUser, toUser, content);
                            break;
                        case 'click':
                            let articleMsg = [
                                {
                                    title: "IJPay 让支付触手可及",
                                    description: "聚合支付了解一下",
                                    picUrl: "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png",
                                    url: "https://gitee.com/javen205/IJPay"
                                },
                            ];
                            //回复图文消息
                            responseMsg = Msg.articleMsg(fromUser, toUser, articleMsg);
                            break;
                    }
                } else if (msgType === "text") {
                    console.log('文本消息....');

                    switch (msgContent) {
                        case '文章':
                            let articleMsg = [
                                {
                                    title: "IJPay 让支付触手可及",
                                    description: "聚合支付了解一下",
                                    picUrl: "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png",
                                    url: "https://gitee.com/javen205/IJPay"
                                },
                                {
                                    title: "极速开发微信公众号",
                                    description: "Node.js + TS 版本",
                                    picUrl: "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png",
                                    url: "https://gitee.com/javen205/weixin_guide"
                                }
                            ];
                            //回复图文消息
                            responseMsg = Msg.articleMsg(fromUser, toUser, articleMsg);
                            break;
                        default:
                            responseMsg = Msg.txtMsg(fromUser, toUser, 'IJPay 让支付触手可及...');
                            break;
                    }

                }

                //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
                responseMsg = request.query.encrypt_type == 'aes' ? cryptoTools.encryptMsg(responseMsg) : responseMsg;
                console.log('responseMsg', responseMsg);

                //返回给微信服务器
                response.send(responseMsg);
            });
        });
    }

}