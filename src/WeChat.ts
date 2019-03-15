import * as crypto from 'crypto';
import { parseString } from 'xml2js';
import { CryptoTools } from './CryptoTools';
import { Msg } from './Msg';
import { ApiConfigKit } from './ApiConfigKit';

export class WeChat {

    public static checkSignature(request: any, response: any) {
        //微信服务器 get 请求的参数 signature、timestamp、nonce、echostr
        let signature = request.query.signature,//微信加密签名
            timestamp = request.query.timestamp,//时间戳
            nonce = request.query.nonce,//随机数
            echostr = request.query.echostr;//随机字符串

        //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
        let tempStr = [ApiConfigKit.getApiConfig(ApiConfigKit.appId).token, timestamp, nonce].sort().join('');
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

    public static handleMsg(request: any, response: any) {

        console.log('request.query', request.query);

        let that = this, buffer: Uint8Array[] = [];

        //实例微信消息加解密
        let cryptoTools = new CryptoTools(request, ApiConfigKit.apiConfig);
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