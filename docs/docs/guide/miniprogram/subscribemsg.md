# 订阅消息

## 官方文档

[小程序订阅消息 API](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)

[小程序服务端接口](https://developers.weixin.qq.com/miniprogram/dev/api-backend/)

## 示例

小程序中授权模板消息

```javascript
wx.requestSubscribeMessage({
    tmplIds: ['vXVOFkL6n63UMIEM5aCa1gMCbnwMMYUO06S6IGf7J8c'],
    success:res=>{
    console.log(res)
    }
})
```

通过接口操作模板消息

```typescript
app.get('/MiniSubscribeMsgApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            // 获取小程序账号的类目
            MiniSubscribeMsgApi.getCategory().then(data => {
                res.send(data);
            });
            break;
        case 1:
            // 获取当前帐号下的个人模板列表
            MiniSubscribeMsgApi.getTemplate().then(data => {
                res.send(data);
            });
            break;
        case 2:
            // 获取帐号所属类目下的公共模板标题
            MiniSubscribeMsgApi.getPubTemplateTitles([616,612,298]).then(data => {
                res.send(data);
            });
            break;
        case 3:
            // 获取模板标题下的关键词列表
            MiniSubscribeMsgApi.getPubTemplateKeyWords("99").then(data => {
                res.send(data);
            });
            break;
        case 4:
            // 添加模板
            MiniSubscribeMsgApi.addTemplate("99",[1,2,3,4,5],"TNWX").then(data => {
                res.send(data);
            });
            break;
        case 5:
            // 删除模板
            MiniSubscribeMsgApi.delTemplate("vXVOFkL6n63UMIEM5aCa1gMCbnwMMYUO06S6IGf7J8c").then(data => {
                res.send(data);
            });
            break;
        case 6:
            // 发送订阅消息
            MiniSubscribeMsgApi.sendSubMessage(
                "oUikW0Tmx9FYrSDc7SGMYqWJMClo",
                "vXVOFkL6n63UMIEM5aCa1gMCbnwMMYUO06S6IGf7J8c",
                "tmwx?author=Javen", {"phrase3":{"value":"允许参与"},"thing4":{"value":"TNWX 线下聚会"},"date5":{"value":"2020-02-02 14:30"},"thing6":{"value":"深圳"}}).then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});
```