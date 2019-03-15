import * as crypto from 'crypto';
import * as xml2js from 'xml2js';
import { ApiConfig } from "./ApiConfig";

export class CryptoTools {
    //用于构建 xml 结构
    static xmlParser = new xml2js.Builder({
        rootName: 'xml',
        cdata: true,
        headless: true,
        renderOpts: {
            pretty: true,
            indent: ' '
        }
    });
    aesModel: string;
    token: string;
    appId: string;
    encodingAesKey: Buffer;
    iv: Buffer;
    msgSignature: string;
    timestamp: string;
    nonce: string;

    constructor(request, config: ApiConfig) {
        this.aesModel = 'aes-256-cbc';
        this.token = config.token;
        this.appId = config.appId;
        this.encodingAesKey = new Buffer(config.encodingAesKey + '=', 'base64');
        this.iv = this.encodingAesKey.slice(0, 16);
        this.msgSignature = request.query.msg_signature;
        this.timestamp = request.query.timestamp;
        this.nonce = request.query.nonce;
    }
    getMsgSignature(encryptedMsg: string): string {
        //将token、timestamp、nonce、cryptedMsg 四个参数进行字典序排序，并拼接成一个字符串
        let tempStr = [this.token, this.timestamp, this.nonce, encryptedMsg].sort().join('');
        //创建加密类型 
        const hashCode = crypto.createHash('sha1');
        //对传入的字符串进行加密
        let tempSignature = hashCode.update(tempStr, 'utf8').digest('hex');
        //将 sha1 加密的签名字符串返回
        return tempSignature;
    }
    /**
     * 微信消息解密
     * @param {String} encryptMsg 加密字符串
     * @return {JSON} 解密后的JSON对象
     */
    decryptMsg(xmlMsg): string {
        //声明 16位的随机字符串
        let random = crypto.randomBytes(8).toString('hex');
        let text = new Buffer(xmlMsg);
        let buf = new Buffer(4);
        buf.writeUInt32BE(text.length, 0);
        //进行PKCS7补位
        let pack = this.KCS7Encoder(20 + text.length + this.appId.length);
        //拼接要加密的字符串
        let content = random + buf.toString('binary') + text.toString('binary') + this.appId + pack;
        //实例 AES 加密对象
        let cipheriv = crypto.createCipheriv(this.aesModel, this.encodingAesKey, this.iv);
        //设置自定填充数据为 false
        cipheriv.setAutoPadding(false);
        //对明文加密
        let encryptedMsg = Buffer.concat([cipheriv.update(content, 'binary'), cipheriv.final()]).toString('base64');
        //获取认证签名
        let msgSignature = this.getMsgSignature(encryptedMsg);
        //返回XML结果
        return CryptoTools.xmlParser.buildObject({
            Encrypt: encryptedMsg,
            MsgSignature: msgSignature,
            TimeStamp: this.timestamp,
            Nonce: this.nonce
        });
    }

    /**
     * 微信消息加密
     * @param xmlMsg 
     */
    encryptMsg(xmlMsg): string {
        //声明 16位的随机字符串
        let random = crypto.randomBytes(8).toString('hex');
        let text = new Buffer(xmlMsg);
        let buf = new Buffer(4);
        buf.writeUInt32BE(text.length, 0);
        //进行PKCS7补位
        let pack = this.KCS7Encoder(20 + text.length + this.appId.length);
        //拼接要加密的字符串
        let content = random + buf.toString('binary') + text.toString('binary') + this.appId + pack;
        //实例 AES 加密对象
        let cipheriv = crypto.createCipheriv(this.aesModel, this.encodingAesKey, this.iv);
        //设置自定填充数据为 false
        cipheriv.setAutoPadding(false);
        //对明文加密
        let encryptedMsg = Buffer.concat([cipheriv.update(content, 'binary'), cipheriv.final()]).toString('base64');
        //获取认证签名
        let msgSignature = this.getMsgSignature(encryptedMsg);
        //返回XML结果
        return CryptoTools.xmlParser.buildObject({
            Encrypt: encryptedMsg,
            MsgSignature: msgSignature,
            TimeStamp: this.timestamp,
            Nonce: this.nonce
        });
    }

    KCS7Encoder(textLength): string {
        let blockSize = 32
        // 计算需要填充的位数
        let amountToPad = blockSize - (textLength % blockSize);
        if (amountToPad === 0) {
            amountToPad = blockSize;
        }
        // 获得补位所用的字符
        let pad = String.fromCharCode(amountToPad), s: string[] = [];
        for (let i = 0; i < amountToPad; i++) s.push(pad);
        return s.join('');
    }
}