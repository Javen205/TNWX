import { Kits, SIGN_TYPE } from "../kit/Kits";
import { HttpKit } from "../kit/HttpKit";

export class WxPay {
    // WxPay URL
    // 提交付款码支付
    public static MICROPAY_URL: string = 'https://api.mch.weixin.qq.com/pay/micropay';
    // 统一下单
    public static UNIFIEDORDER_URL: string = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
    // 查询订单
    public static ORDERQUERY_URL: string = 'https://api.mch.weixin.qq.com/pay/orderquery';
    // 撤销订单
    public static REVERSEORDER_URL: string = 'https://api.mch.weixin.qq.com/secapi/pay/reverse';
    // 关闭订单
    public static CLOSEORDER_URL: string = 'https://api.mch.weixin.qq.com/pay/closeorder';
    // 申请退款
    public static REFUND_URL: string = 'https://api.mch.weixin.qq.com/secapi/pay/refund';
    // 查询退款
    public static REFUNDQUERY_URL: string = 'https://api.mch.weixin.qq.com/pay/refundquery';
    // 下载对账单
    public static DOWNLOADBILL_URL: string = 'https://api.mch.weixin.qq.com/pay/downloadbill';
    // 下载资金账单
    public static DOWNLOADFUNDFLOW_URL: string = 'https://api.mch.weixin.qq.com/pay/downloadfundflow';
    // 交易保障
    public static REPORT_URL: string = 'https://api.mch.weixin.qq.com/payitil/report';
    // 转换短链接
    public static SHORTURL_URL: string = 'https://api.mch.weixin.qq.com/tools/shorturl';
    // 授权码查询openid
    public static AUTHCODETOOPENID_URL: string = 'https://api.mch.weixin.qq.com/tools/authcodetoopenid';
    // 拉取订单评价数据
    public static BATCHQUERYCOMMENT_URL: string = 'https://api.mch.weixin.qq.com/billcommentsp/batchquerycomment';

    // WxPay Sandbox URL
    public static SANDBOX_GETSIGNKEY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey';
    public static SANDBOX_MICROPAY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/micropay';
    public static SANDBOX_UNIFIEDORDER_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/unifiedorder';
    public static SANDBOX_ORDERQUERY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/orderquery';
    public static SANDBOX_REVERSE_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/reverse';
    public static SANDBOX_CLOSEORDER_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/closeorder';
    public static SANDBOX_REFUND_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/secapi/pay/refund';
    public static SANDBOX_REFUNDQUERY_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/refundquery';
    public static SANDBOX_DOWNLOADBILL_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/pay/downloadbill';
    public static SANDBOX_REPORT_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/payitil/report';
    public static SANDBOX_SHORTURL_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/tools/shorturl';
    public static SANDBOX_AUTHCODETOOPENID_URL: string = 'https://api.mch.weixin.qq.com/sandboxnew/tools/authcodetoopenid';

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
