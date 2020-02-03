# 开发者模式

## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 配置初始化

[请参考快速入门中的初始化与示例](../common/init)

## 开发者模式 

 **TNWX** 中验证签名的关键接口如下：

```TypeScript
QyWeChat.checkSignature(signature, timestamp,nonce, echostr)
```

**Express** 示例如下：

```TypeScript
app.get('/qymsg', (req: any, res: any) => {
    console.log('get query...', req.query);

    let appId: string = req.query.appId;
    let corpId: string = req.query.corpId;
    if (appId && corpId) {
        QyApiConfigKit.setCurrentAppId(appId,corpId);
    }

    let signature = urlencode.decode(req.query.msg_signature)//微信加密签名
    let timestamp = urlencode.decode(req.query.timestamp)//时间戳
    let nonce = urlencode.decode(req.query.nonce)//随机数
    let echostr = urlencode.decode(req.query.echostr)//随机字符串

    res.send(QyWeChat.checkSignature(signature, timestamp,nonce, echostr));
});

```

**特别说明：**

1. 开发者URL为：`http/https://域名/qymsg?appId=xxxxx&corpId=xxxx`
2. 加密模式必须设置为 `true`（`ApiConfig` 第四个参数）


## 本地端口映射工具

推荐使用 [FRP](https://github.com/fatedier/frp) 目前Github Start 已超越 3.2w。如有更好的工具欢迎推荐 [issues](https://gitee.com/javen205/TNWX/issues)


## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>