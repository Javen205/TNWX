# 微信支付 V2 版本


[微信支付官方开发文档](https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/pages/api.shtml)

## 初始化配置

```TypeScript
let wxPayConfig = new WxPayApiConfig('appId','apiKey','apiKey 3', '域名','mchId', 'certPath', 'certP12Path','keyPath','providerAppId','provideMchId')
// 添加配置，支持多商户平台
WxPayApiConifgKit.putConfig(wxPayConfig)
// 设置当前应用
WxPayApiConifgKit.setCurrentAppId(appId)
WxPayApiConifgKit.devMode = true
```
:::tip
Api v2 版本接口只需要参数 
- 公众号、小程序或者App的 appId
- 商户平台API 密钥 apiKey
- 商户号 mchId
- 证书绝对路径 certP12Path`
:::

## 获取配置

```TypeScript
// 获取当前应用的支付配置
let config: WxPayApiConfig = WxPayApiConifgKit.getConfig
// 通过应用ID来获取支付配置
let config: WxPayApiConfig = WxPayApiConifgKit.getConfigByAppId('appId')
```

:::warning
初始化配置、获取配置都是非必须的，这样做的目的只是统一管理支付时需要的常量
:::


## 构建请求参数

```TypeScript
try {
    let reqObj = {
        appid: config.appId,
        mch_id: config.mchId,
        nonce_str: Kits.generateStr(), //生成随机字符串
        body: 'IJPay 让支付触手可及',
        attach: 'TNWX 微信系开发脚手架',
        out_trade_no: Kits.generateStr(),
        total_fee: 666,
        spbill_create_ip: ip,
        notify_url: 'https://gitee.com/Javen205/TNWX',
        trade_type: WX_TRADE_TYPE.JSAPI,
        sign_type: SIGN_TYPE.SIGN_TYPE_HMACSHA256
    }
    let xml = await Kits.generateSignedXml(reqObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_HMACSHA256)

    let data = await HttpKit.getHttpDelegate.httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.UNIFIED_ORDER), xml)
    ctx.body = await Kits.xml2obj(data)
} catch (error) {
    console.log(error)
}

```

## 执行请求

统一下单为例:

```TypeScript
await HttpKit.getHttpDelegate.httpPost(WX_DOMAIN.CHINA.concat(WX_API_TYPE.UNIFIED_ORDER), xml)
```

- WX_DOMAIN 微信支付域名 [微信支付商户系统跨城冗灾升级指引](https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=23_6&index=4)
- WX_API_TYPE 微信支付接口(统一下单、查询订单等)

## 双向证书请求

退款为例:

```TypeScript
try {
    let refundObj = {
        appid: config.appId,
        mch_id: config.mchId,
        nonce_str: Kits.generateStr(), //生成随机字符串
        out_trade_no: Kits.generateStr(),
        out_refund_no: Kits.generateStr(),
        total_fee: 666,
        refund_fee: 100
    }

    let xml = await Kits.generateSignedXml(refundObj, config.apiKey, SIGN_TYPE.SIGN_TYPE_MD5)
    let pfx: Buffer = fs.readFileSync(config.certP12Path)
    let data = await HttpKit.getHttpDelegate.httpPostWithCert(WX_DOMAIN.CHINA.concat(WX_API_TYPE.REFUND), xml, pfx, config.mchId)
    ctx.body = await Kits.xml2obj(data)
} catch (error) {
    console.log(error)
}

```