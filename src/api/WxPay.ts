import { Kits, SIGN_TYPE } from "../kit/Kits";
import { HttpKit } from "../kit/HttpKit";

export class WxPay {
    // URL
    private static MICROPAY_URL: string = 'https://api.mch.weixin.qq.com/pay/micropay';
    private static UNIFIEDORDER_URL: string = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    private static ORDERQUERY_URL: string = 'https://api.mch.weixin.qq.com/pay/orderquery';
    private static REVERSE_URL: string = 'https://api.mch.weixin.qq.com/secapi/pay/reverse';
    private static CLOSEORDER_URL: string = 'https://api.mch.weixin.qq.com/pay/closeorder';
    private static REFUND_URL: string = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
    private static REFUNDQUERY_URL: string = 'https://api.mch.weixin.qq.com/pay/refundquery';
    private static DOWNLOADBILL_URL: string = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    private static REPORT_URL: string = 'https://api.mch.weixin.qq.com/payitil/report';
    private static SHORTURL_URL: string = 'https://api.mch.weixin.qq.com/tools/shorturl';
    private static AUTHCODETOOPENID_URL: string = 'https://api.mch.weixin.qq.com/tools/authcodetoopenid';

    // Sandbox URL
    private static SANDBOX_GETSIGNKEY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey';
    private static SANDBOX_MICROPAY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/micropay';
    private static SANDBOX_UNIFIEDORDER_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/unifiedorder';
    private static SANDBOX_ORDERQUERY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/orderquery';
    private static SANDBOX_REVERSE_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/reverse';
    private static SANDBOX_CLOSEORDER_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/closeorder';
    private static SANDBOX_REFUND_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/refund';
    private static SANDBOX_REFUNDQUERY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/refundquery';
    private static SANDBOX_DOWNLOADBILL_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/downloadbill';
    private static SANDBOX_REPORT_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/payitil/report';
    private static SANDBOX_SHORTURL_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/tools/shorturl';
    private static SANDBOX_AUTHCODETOOPENID_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/tools/authcodetoopenid';

    public static getSignKey(mchId: string, key: string) {
        let that = this;
        return new Promise(function (resolve, reject) {
            let reqObj = {
                mch_id: mchId,
                nonce_str: Kits.generateStr(),//生成随机字符串
            }
            // 生成签名
            let sign: string = Kits.generateSignature(reqObj, key, SIGN_TYPE.SIGN_TYPE_MD5);
            reqObj['sign'] = sign;
            // obj 对象转化为 xml
            Kits.obj2xml(reqObj).then((xml) => {
                HttpKit.getHttpDelegate.httpPost(that.SANDBOX_GETSIGNKEY_URL, xml.toString())
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        reject(error);
                    })
            }).catch((error) => {
                reject(error);
            })
        })
    }

    /**
     * 判断异步通知中的 sign 是否有效
     * @param notifyData 
     * @param key api key
     */
    public static notifySignatureValid(notifyData: object, key: string) {
        let signType: SIGN_TYPE;
        let signTypeInData = notifyData[Kits.FIELD_SIGN_TYPE];
        if (!signTypeInData) {
            signType = SIGN_TYPE.SIGN_TYPE_MD5;
        } else {
            signTypeInData = (String(signTypeInData)).trim();
            if (signTypeInData.length === 0) {
                signType = SIGN_TYPE.SIGN_TYPE_MD5;
            } else if (signTypeInData === SIGN_TYPE.SIGN_TYPE_MD5) {
                signType = SIGN_TYPE.SIGN_TYPE_MD5;
            } else if (signTypeInData === SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
                signType = SIGN_TYPE.SIGN_TYPE_HMACSHA256;
            } else {
                throw new Error('Invalid sign_type: ' + signTypeInData + ' in pay result notify');
            }
        }
        return this.isSignatureValid(notifyData, key, signType);
    }
    /**
     * 验证签名
     * @param data 
     * @param key 
     * @param signTypeParam 
     */
    public static isSignatureValid(data: object, key: string, signTypeParam: SIGN_TYPE) {
        let signType = signTypeParam || SIGN_TYPE.SIGN_TYPE_MD5;
        if (data === null || typeof data !== 'object') {
            return false;
        } else if (!data[Kits.FIELD_SIGN]) {
            return false;
        } else {
            return data[Kits.FIELD_SIGN] === Kits.generateSignature(data, key, signType);
        }
    }
}
