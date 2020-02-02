# 开发者模式

## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 配置公众号参考

[请参考快速入门中的初始化与示例](../common/init)

## 公众号开启开发者模式 

 **TNWX** 中验证签名的关键接口如下：

```TypeScript
WeChat.checkSignature(signature, timestamp,nonce, echostr)
```

**Express** 示例如下：

```TypeScript
app.get('/msg', (req: any, res: any) => {
    console.log('get query...', req.query);

    let appId: string = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }

    let signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
        nonce = req.query.nonce,//随机数
        echostr = req.query.echostr;//随机字符串
    res.send(WeChat.checkSignature(signature, timestamp,nonce, echostr));
});
```

**Nest** 示例如下：

```typescript
@Get('/msg')
getMsg(@Req() request: Request, @Res() response: Response) {
  let appId: string = request.query.appId;
  if (appId) {
    ApiConfigKit.setCurrentAppId(appId);
  }

  let signature = request.query.signature,//微信加密签名
      timestamp = request.query.timestamp,//时间戳
      nonce = request.query.nonce,//随机数
      echostr = request.query.echostr;//随机字符串
  response.send(WeChat.checkSignature(signature, timestamp,nonce, echostr));
}
```

**特别说明：**

1. 开发者URL为：`http/https://域名/msg` 或者 `http/https://域名/msg?appId=xxxxx`
2. 测试号的加密模式必须设置为 `false`  （上文提到的 `ApiConfig` 第四个参数）
3. 正式号推荐开启加密模式并设置为 `安全模式` 



## 本地端口映射工具

推荐使用 [FRP](https://github.com/fatedier/frp) 目前Github Start 已超越 3.2w。如有更好的工具欢迎推荐 [issues](https://gitee.com/javen205/TNWX/issues)



## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>