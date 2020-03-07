# 微信支付 V3 版本

## v2 与 v3 区别

相较于微信支付API-v2，主要区别是：

- 遵循统一的Restful的设计风格
- 使用JSON作为数据交互的格式，不再使用XML
- 使用基于非对称密钥的SHA256-RSA的数字签名算法，不再使用MD5或HMAC-SHA256
- 不再要求HTTPS客户端证书
- 使用AES-256-GCM，对回调中的关键信息进行加密保护

更多证书和签名的详细内容请参官方文档 [WeChatPay-API-v3](https://wechatpay-api.gitbook.io/wechatpay-api-v3/)

## API密钥设置

API密钥的详细内容请参见：[API证书及密钥](https://kf.qq.com/faq/180830E36vyQ180830AZFZvu.html)

## 下载API证书

请在商户平台下载证书。具体操作请参见：[如何获取API证书](https://kf.qq.com/faq/161222NneAJf161222U7fARv.html)

## 构建 Authorization

```TypeScript
PayKit.buildAuthorization(method: RequestMethod, urlSuffix: string, mchId: string, serialNo: string, keyPath: string, body: string)
```

参数说明

- method    请求方法 RequestMethod
- urlSuffix 可通过 WxApiType 来获取，URL挂载参数需要自行拼接
- mchId     商户Id
- serialNo  商户 API 证书序列号
- keyPath   key.pem 证书路径
- body      接口请求参数


## 验证签名

```TypeScript
let verifySignature: boolean = PayKit.verifySignature(signature, data, nonce, timestamp, wxCertPath)
// 或者
let verifySignature: boolean = PayKit.verifySign(headers, data, wxCertPath)
console.log(`verifySignature:${verifySignature}`)
```

## 调用 v3 接口

获取平台证书列表为例

```TypeScript{12,34}
try {
    let result = await PayKit.exeGet(
        WX_DOMAIN.CHINA, //
        WX_API_TYPE.GET_CERTIFICATES,
        config.mchId,
        serialNo,
        config.keyPath
    )
    console.log(`result.data:${result.data}`)

    // 应答报文主体
    let data = JSON.stringify(result.data)
    // 应答状态码
    console.log(`status:${result.status}`)
    console.log(`data:${data}`)
    // http 请求头
    let headers = result.headers
    // 证书序列号
    let serial = headers['wechatpay-serial']
    // 应答时间戳
    let timestamp = headers['wechatpay-timestamp']
    // 应答随机串
    let nonce = headers['wechatpay-nonce']
    // 应答签名
    let signature = headers['wechatpay-signature']

    console.log(`serial:\n${serial}`)
    console.log(`timestamp:\n${timestamp}`)
    console.log(`nonce:\n${nonce}`)
    console.log(`signature:\n${signature}`)

    // 根据序列号查证书  验证签名
    // let verifySignature: boolean = PayKit.verifySignature(signature, data, nonce, timestamp, ctx.app.config.WxPayConfig.wxCertPath)
    let verifySignature: boolean = PayKit.verifySign(headers, data, ctx.app.config.WxPayConfig.wxCertPath)
    console.log(`verifySignature:${verifySignature}`)

    ctx.body = data
} catch (error) {
    console.log(error)
}
```

## 证书和回调报文解密

证书报文解密为例

```TypeScript{5,12}
// 证书和回调报文解密
let certPath = '/Users/Javen/cert/platform_cert.pem'
try {
    // 解密
    let decrypt = PayKit.aes256gcmDecrypt(
        config.apiKey3,
        ctx.app.config.AEAD_AES_256_GCM.nonce,
        ctx.app.config.AEAD_AES_256_GCM.associated_data,
        ctx.app.config.AEAD_AES_256_GCM.ciphertext
    )
    // 保存证书
    fs.writeFileSync(certPath, decrypt)
    ctx.body = decrypt
} catch (error) {
    console.log(error)
}

```


## 更多示例

微信支付-[Egg 示例](https://gitee.com/javen205/TNWX/blob/master/sample/egg/app/controller/wxpay.ts)
