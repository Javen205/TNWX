import * as crypto from 'crypto';
import { parseString } from 'xml2js';
import { CryptoTools } from './CryptoTools';
import { ApiConfigKit } from './ApiConfigKit';
import { InMsgParser } from './msg/InMsgParser';
import { InMsg } from './msg/in/InMsg';
import { InTextMsg } from './msg/in/InTextMsg';
import { OutMsg } from './msg/out/OutMsg';
import { InNotDefinedMsg } from './msg/in/InNotDefinedMsg';
import { MsgAdapter } from './MsgAdapter';
import { OutTextMsg } from './msg/out/OutTextMsg';
import { InImageMsg } from './msg/in/InImageMsg';
import { InLinkMsg } from './msg/in/InLinkMsg';
import { InLocationMsg } from './msg/in/InLocationMsg';
import { InShortVideoMsg } from './msg/in/InShortVideoMsg';
import { InVideoMsg } from './msg/in/InVideoMsg';
import { InVoiceMsg } from './msg/in/InVoiceMsg';
import { InSpeechRecognitionResults } from './msg/in/InSpeechRecognitionResults';
import { OutImageMsg } from './msg/out/OutImageMsg';
import { OutMusicMsg } from './msg/out/OutMusicMsg';
import { OutNewsMsg } from './msg/out/OutNewsMsg';
import { OutVideoMsg } from './msg/out/OutVideoMsg';
import { OutVoiceMsg } from './msg/out/OutVoiceMsg';
import { InFollowEvent } from './msg/in/event/InFollowEvent';
import { InLocationEvent } from './msg/in/event/InLocationEvent';
import { InMenuEvent } from './msg/in/event/InMenuEvent';
import { InQrCodeEvent } from './msg/in/event/InQrCodeEvent';
import { InTemplateMsgEvent } from './msg/in/event/InTemplateMsgEvent';

export class WeChat {

    public static checkSignature(request: any, response: any) {
        //微信服务器 get 请求的参数 signature、timestamp、nonce、echostr
        let signature = request.query.signature,//微信加密签名
            timestamp = request.query.timestamp,//时间戳
            nonce = request.query.nonce,//随机数
            echostr = request.query.echostr;//随机字符串

        //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
        let tempStr = [ApiConfigKit.getToken, timestamp, nonce].sort().join('');
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

    public static handleMsg(request: any, response: any, msgAdapter: MsgAdapter) {
        let buffer: Uint8Array[] = [];
        //实例微信消息加解密
        let cryptoTools: CryptoTools;

        //监听 data 事件 用于接收数据
        request.on('data', function (data) {
            buffer.push(data);
        });

        request.on('end', function () {
            let msgXml = Buffer.concat(buffer).toString('utf-8');
            parseString(msgXml, { explicitArray: false }, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                result = result.xml;
                let isEncryptMessage: boolean = false;
                //判断消息加解密方式
                if (request.query.encrypt_type == 'aes') {
                    isEncryptMessage = true;
                    cryptoTools = new CryptoTools(request, ApiConfigKit.getApiConfig);
                    //对加密数据解密
                    result = cryptoTools.decryptMsg(result.Encrypt);
                }

                if (ApiConfigKit.isDevMode()) {
                    console.log('接收消息');
                    console.log(result);
                    console.log('------------------------\n');
                }

                let inMsg: InMsg = InMsgParser.parse(result);
                let responseMsg!: string;
                let outMsg!: OutMsg;

                // 处理接收的消息
                if (inMsg instanceof InTextMsg) {
                    outMsg = msgAdapter.processInTextMsg(<InTextMsg>inMsg);
                } else if (inMsg instanceof InImageMsg) {
                    outMsg = msgAdapter.processInImageMsg(<InImageMsg>inMsg);
                } else if (inMsg instanceof InLinkMsg) {
                    outMsg = msgAdapter.processInLinkMsg(<InLinkMsg>inMsg);
                } else if (inMsg instanceof InLocationMsg) {
                    outMsg = msgAdapter.processInLocationMsg(<InLocationMsg>inMsg);
                } else if (inMsg instanceof InShortVideoMsg) {
                    outMsg = msgAdapter.processInShortVideoMsg(<InShortVideoMsg>inMsg);
                } else if (inMsg instanceof InVideoMsg) {
                    outMsg = msgAdapter.processInVideoMsg(<InVideoMsg>inMsg);
                } else if (inMsg instanceof InVoiceMsg) {
                    outMsg = msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg);
                } else if (inMsg instanceof InVoiceMsg) {
                    outMsg = msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg);
                } else if (inMsg instanceof InSpeechRecognitionResults) {
                    outMsg = msgAdapter.processInSpeechRecognitionResults(<InSpeechRecognitionResults>inMsg);
                } else if (inMsg instanceof InFollowEvent) {
                    outMsg = msgAdapter.processInFollowEvent(<InFollowEvent>inMsg);
                } else if (inMsg instanceof InLocationEvent) {
                    outMsg = msgAdapter.processInLocationEvent(<InLocationEvent>inMsg);
                } else if (inMsg instanceof InMenuEvent) {
                    outMsg = msgAdapter.processInMenuEvent(<InMenuEvent>inMsg);
                } else if (inMsg instanceof InQrCodeEvent) {
                    outMsg = msgAdapter.processInQrCodeEvent(<InQrCodeEvent>inMsg);
                } else if (inMsg instanceof InTemplateMsgEvent) {
                    outMsg = msgAdapter.processInTemplateMsgEvent(<InTemplateMsgEvent>inMsg);
                }
                else if (inMsg instanceof InNotDefinedMsg) {
                    if (ApiConfigKit.isDevMode()) {
                        console.error("未能识别的消息类型。 消息 xml 内容为：\n");
                        console.error(result);
                    }
                    outMsg = msgAdapter.processIsNotDefinedMsg(<InNotDefinedMsg>inMsg);
                }

                // 处理发送的消息
                if (outMsg instanceof OutTextMsg) {
                    responseMsg = (<OutTextMsg>outMsg).toXml();
                } else if (outMsg instanceof OutImageMsg) {
                    responseMsg = (<OutImageMsg>outMsg).toXml();
                } else if (outMsg instanceof OutMusicMsg) {
                    responseMsg = (<OutMusicMsg>outMsg).toXml();
                } else if (outMsg instanceof OutNewsMsg) {
                    responseMsg = (<OutNewsMsg>outMsg).toXml();
                } else if (outMsg instanceof OutVideoMsg) {
                    responseMsg = (<OutVideoMsg>outMsg).toXml();
                } else if (outMsg instanceof OutVoiceMsg) {
                    responseMsg = (<OutVoiceMsg>outMsg).toXml();
                }
                //判断消息加解密方式，如果未加密则使用明文，对明文消息进行加密
                responseMsg = isEncryptMessage ? cryptoTools.encryptMsg(responseMsg) : responseMsg;
                if (ApiConfigKit.isDevMode()) {
                    console.log('发送消息');
                    console.log(responseMsg);
                    console.log('--------------------------------------------------------\n');
                }
                //返回给微信服务器
                response.send(responseMsg);
            });
        });
    }
}