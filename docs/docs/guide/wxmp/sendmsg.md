# 微信公众号各种消息交互


## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 测试号申请

[测试时请自己的测试号](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421137522)  

## 开启开发者模式

这里说的各种消息交互是指的 `开发者模式下的消息交互` [如何开启开发者模式](./callback)

在 TNWX 中实现微信公众号各种消息交互非常简单，步骤如下：

1. 接收各种消息
2. 调用 `WeChat.handleMsg(...)` 方法处理分发消息
3. 实现 `MsgAdapter` 接口，实现业务逻辑以及各种消息回复


## 接收各种消息

**开发者 URL 的 POST 方法下接收各种消息** 具体实现代码如下

## Express 示例

```javascript
// 接收微信消息入口
app.post('/msg', function (req: any, res: any) {
    console.log('post...', req.query);
		// 支持多公众号
    let appId: string = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
		// 获取签名相关的参数用于消息解密(测试号以及明文模式无此参数)
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
        // 处理消息并响应对应的回复
        // ....
    });
});
```



## Nest 示例

```typescript
@Post("/msg")
  PostMsg(@Req() req: Request, @Res() res: Response) {
    let that = this;
    console.log('post...', req.query);
		// 支持多公众号
    let appId: string = req.query.appId;
    if (appId) {
      ApiConfigKit.setCurrentAppId(appId);
    }
		// 获取签名相关的参数用于消息解密(测试号以及明文模式无此参数)
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
      // 处理消息并响应对应的回复
      // ...
    });
  }
```

## 处理并分发消息

```javascript
WeChat.handleMsg(msgAdapter: MsgAdapter, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string)
```

`handleMsg` 中包含了消息的解密、各种消息分发、消息加密、各种消息回复。这里就不贴源码了，感兴趣的可以看看源码，源码也有详细的注释。

[Gitee-TNWX-WeChat](https://gitee.com/javen205/TNWX/blob/master/packages/wxmp/src/WeChat.ts)

[GitHub-TNWX-WeChat](https://github.com/javen205/TNWX/blob/master/packages/wxmp/src/WeChat.ts)

其中 `msgXml` 、`msgSignature`、`timestamp` 、`nonce` 已在上面的 `接收各种消息中` 获得，就差 `MsgAdapter` 了。



## MsgAdapter 介绍

`MsgAdapter ` 接口中定义的方法如下：

```typescript
export interface MsgAdapter {
    // 处理文本消息
    processInTextMsg(inTextMsg: InTextMsg): OutMsg;
    // 处理图片消息
    processInImageMsg(inImageMsg: InImageMsg): OutMsg;
    // 处理声音消息
    processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg;
    // 处理视频消息
    processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg;
    // 处理小视频消息
    processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg;
    // 处理地理位置消息
    processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg;
    // 处理链接消息
    processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg;
    // 处理语音识别结果
    processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg;
    // 处理未定义的消息(其他消息...小哥该扩展了)
    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg;

    // 处理关注、取消关注事件
    processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg;
    // 处理扫码事件
    processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg;
    // 处理地理位置事件
    processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg;
    // 处理地理位置事件
    processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg;
    // 处理模板消息事件
    processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg;
    // 处理摇一摇周边事件
    processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): OutMsg;
}
```



`InXxxxMsg` 统一继承自 `InMsg` ，`InXxxxEvent` 统一继承自 `EventInMsg`  而  `EventInMsg`  又继承自  `InMsg` ，所以在任何的 `inXxxxx` 中都很容易获取到 `toUserName(开发者微信号即appId)`、 `fromUserName(发送方帐号openId)` 。 **TNW 支持多公众，后面会使用到此 appId 来实现不同公众号回复不同的消息**



## 响应对应的回复  

代码实现比较简单就不过多介绍了，请看源码

**提醒：回复消息时可以对不同的公众号做特殊的处理**



```typescript
export class MsgController implements MsgAdapter {

    processInTextMsg(inTextMsg: InTextMsg): OutMsg {
        let outMsg: any;
        let content: string = "IJPay 让支付触手可及 \n\nhttps://gitee.com/javen205/IJPay";
        if ("极速开发微信公众号" == inTextMsg.getContent) {
            // 多公众号支持 分别给不同的公众号发送不同的消息
            if (ApiConfigKit.getApiConfig.getAppId == 'wx614c453e0d1dcd12') {
                content = "极速开发微信公众号 \n\nhttps://github.com/javen205/weixin_guide"
                outMsg = new OutTextMsg(inTextMsg);
                outMsg.setContent(content);
            } else {
                content = "极速开发微信公众号 \n\nhttps://github.com/javen205/TNW"
                outMsg = new OutTextMsg(inTextMsg);
                outMsg.setContent(content);
            }

        } else if ("聚合支付" == inTextMsg.getContent) {
          	// 最新规则：开发者只能回复1条图文消息；其余场景最多可回复8条图文消息
            outMsg = new OutNewsMsg(inTextMsg);
            outMsg.addArticle("聚合支付了解下", "IJPay 让支付触手可及",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/javen205/IJPay")
            outMsg.addArticle("jfinal-weixin", "极速开发微信公众号",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png", "https://gitee.com/JFinal/jfinal-weixin")
        } else {
            // outMsg = new OutTextMsg(inTextMsg);
            // outMsg.setContent(content);
            // 转发给多客服PC客户端
            outMsg = new OutCustomMsg(inTextMsg);
            console.log("转发给多客服PC客户端");

        }
        return outMsg;
    }

    processInImageMsg(inImageMsg: InImageMsg): OutMsg {
        let outMsg = new OutImageMsg(inImageMsg);
        outMsg.setMediaId = inImageMsg.getMediaId;
        return outMsg;
    }
    processInVoiceMsg(inVoiceMsg: InVoiceMsg): OutMsg {
        let outMsg = new OutVoiceMsg(inVoiceMsg);
        outMsg.setMediaId = inVoiceMsg.getMediaId;
        return outMsg;
    }
    processInVideoMsg(inVideoMsg: InVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inVideoMsg);
        outMsg.setMediaId = inVideoMsg.getMediaId;
        outMsg.setDescription = "IJPay 让支付触手可及";
        outMsg.setTitle = "视频消息";
        return outMsg;
    }
    processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): OutMsg {
        let outMsg = new OutVideoMsg(inShortVideoMsg);
        outMsg.setMediaId = inShortVideoMsg.getMediaId;
        outMsg.setDescription = "TypeScript + Node.js 开发微信公众号";
        outMsg.setTitle = "短视频消息";
        return outMsg;
    }
    processInLocationMsg(inLocationMsg: InLocationMsg): OutMsg {
        return this.renderOutTextMsg(inLocationMsg,
            "位置消息... \n\nX:" + inLocationMsg.getLocation_X + " Y:" + inLocationMsg.getLocation_Y + "\n\n" + inLocationMsg.getLabel);
    }
    processInLinkMsg(inLinkMsg: InLinkMsg): OutMsg {
        let text = new OutTextMsg(inLinkMsg);
        text.setContent("链接频消息..." + inLinkMsg.getUrl);
        return text;
    }
    processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): OutMsg {
        let text = new OutTextMsg(inSpeechRecognitionResults);
        text.setContent("语音识别消息..." + inSpeechRecognitionResults.getRecognition);
        return text;
    }

    processInFollowEvent(inFollowEvent: InFollowEvent): OutMsg {

        if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
            return this.renderOutTextMsg(inFollowEvent,
                "感谢你的关注 么么哒 \n\n交流群：114196246");
        }
        else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
            console.error("取消关注：" + inFollowEvent.getFromUserName);
            return this.renderOutTextMsg(inFollowEvent);
        } else {
            return this.renderOutTextMsg(inFollowEvent);
        }
    }

    processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): OutMsg {
        if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
            console.debug("扫码未关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent,
                "感谢您的关注，二维码内容：" + inQrCodeEvent.getEventKey);
        }
        else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
            console.debug("扫码已关注：" + inQrCodeEvent.getFromUserName);
            return this.renderOutTextMsg(inQrCodeEvent);
        } else {
            return this.renderOutTextMsg(inQrCodeEvent);
        }
    }
    processInLocationEvent(inLocationEvent: InLocationEvent): OutMsg {
        console.debug("发送地理位置事件：" + inLocationEvent.getFromUserName);

        return this.renderOutTextMsg(inLocationEvent,
            "地理位置是：" + inLocationEvent.getLatitude);
    }
    processInMenuEvent(inMenuEvent: InMenuEvent): OutMsg {
        console.debug("菜单事件：" + inMenuEvent.getFromUserName);

        return this.renderOutTextMsg(inMenuEvent,
            "菜单事件内容是：" + inMenuEvent.getEventKey);
    }
    processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): OutMsg {
        console.debug("模板消息事件：" + inTemplateMsgEvent.getFromUserName + " " + inTemplateMsgEvent.getStatus);
        return this.renderOutTextMsg(inTemplateMsgEvent,
            "消息发送状态：" + inTemplateMsgEvent.getStatus);
    }

    processInShakearoundUserShakeEvent(inShakearoundUserShakeEvent: InShakearoundUserShakeEvent): OutMsg {
        console.debug("摇一摇事件：" + inShakearoundUserShakeEvent.getFromUserName + " " + inShakearoundUserShakeEvent.getUuid);
        return this.renderOutTextMsg(inShakearoundUserShakeEvent,
            "uuid：" + inShakearoundUserShakeEvent.getUuid);
    }

    processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): OutMsg {
        return this.renderOutTextMsg(inNotDefinedMsg,
            "未知消息");
    }

    renderOutTextMsg(inMsg: InMsg, content?: string): OutTextMsg {
        let outMsg = new OutTextMsg(inMsg);
        outMsg.setContent(content ? content : " ");
        return outMsg;
    }
}
```

## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>




