# 各种消息交互

## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**
 

## 开启开发者模式

[如何开启开发者模式](./callback)


## 接收各种消息

在 TNWX 中实现企业微信各种消息交互非常简单，步骤如下：

1. 接收各种消息
2. 调用 `QyWeChat.handleMsg(...)` 方法处理分发消息
3. 实现 `MsgAdapter` 接口，实现业务逻辑以及各种消息回复

**开发者 URL 的 POST 方法下接收各种消息** 具体实现代码如下

## Express 示例

```typescript
// 接收微信消息入口
app.post('/qymsg', function (req: any, res: any) {
    console.log('post...', req.query);

    let appId: string = req.query.appId;
    let corpId: string = req.query.corpId;
    if (appId && corpId) {
        QyApiConfigKit.setCurrentAppId(appId,corpId);
    }
    let msgSignature = req.query.msg_signature,
        timestamp = req.query.timestamp,
        nonce = req.query.nonce;

    //监听 data 事件 用于接收数据
    let buffer: Uint8Array[] = [];
    req.on('data', function (data: any) {
        buffer.push(data);
    });

    req.on('end', function () {
        let msgXml = Buffer.concat(buffer).toString('utf-8');
        console.log(`接收到的消息msgXml：${msgXml}`)

        QyWeChat.handleMsg(msgAdapter, msgXml, msgSignature, timestamp, nonce)
            .then(data => {
                res.send(data);
            })
            .catch((error) => console.log(error));
    });

});
```

## 处理响应消息以及事件

与微信公众号相关 请参考 [微信公众号各种消息交互](../wxmp/sendmsg)

## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>




