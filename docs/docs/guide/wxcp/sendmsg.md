# 发送应用消息

## 效果图

|  <img :src="$withBase('/2.jpeg')"/>    |   <img :src="$withBase('/3.jpeg')"/>   |   <img :src="$withBase('/5.jpeg')"/>   |
| ---- | ---- | ---- |
|   <img :src="$withBase('/4.jpeg')"/>   |  <img :src="$withBase('/1.jpeg')"/>    |      |


## 示例 


```TypeScript
app.get('/sendMsg', (req, res) => {
    let type: string = req.query.type;
    let agentId = QyApiConfigKit.getApiConfig.getAppId
    let toUser = 'Javen'
    switch (parseInt(type)) {
        case 0:
            // 发送文本消息
            let text = new QyTextMsg(
                new QyText('TNWX 微信系开发脚手架 \n https://gitee.com/javen205/TNWX'),
                agentId,
                toUser
            )
            QySendMsgApi.sendTextMessage(text)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 1:
            // 图片消息
            let image = new QyImageMsg(
                new QyMediaId('1X7ARFWFBZBnOgNEtpRbmSR46LdLuX1aDtoxbJgpBzRqT34EmnQtXxiPk9DfBXzSa'),
                agentId,
                toUser
            )
            QySendMsgApi.sendImageMessage(image)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 2:
            // 语音消息
            let voice = new QyVoiceMsg(
                new QyMediaId('1mxRvPy6x2UkcxFZ22z1CssutVW-Ybez3Oj18N2FfUAY'),
                agentId,
                toUser
            )
            QySendMsgApi.sendVoiceMessage(voice)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 3:
            // 视频消息
            let video = new QyVideoMsg(
                new QyVideo(
                    '1EWVjcD-veu9ZMOduIEFVwh3IAraTa5JZi6XvCQ6Z4zJZup-2YrnHt4ZhEqjyvbtG',
                    'TNWX 视频消息',
                    'TNWX 微信系开发脚手架'
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendVideoMessage(video)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 4:
            // 文件消息
            let file = new QyFileMsg(
                new QyMediaId(
                    '1X7ARFWFBZBnOgNEtpRbmSR46LdLuX1aDtoxbJgpBzRqT34EmnQtXxiPk9DfBXzSa',
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendFileMessage(file)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 5:
            // 文本卡片消息
            let textcard = new QyTextCardMsg(
                new QyTextCard(
                    'TNWX 微信系开发脚手架',
                    'TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业微信/企业号。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)',
                    'https://gitee.com/javen205/TNWX',
                    '了解更多'
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendTextCardMessage(textcard)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 6:
            // 图文消息
            let news = new QyNewsMsg(
                new QyArticles(
                    [
                        new QyNews(
                            'TNWX 微信系开发脚手架',
                            'TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业微信/企业号。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)',
                            'https://s2.ax1x.com/2020/02/01/1J9I9P.jpg',
                            'https://gitee.com/javen205/TNWX',    
                        ),
                        new QyNews(
                            'IJPay 聚合支付SDK',
                            '聚合支付，IJPay 让支付触手可及，封装了微信支付、QQ支付、支付宝支付、京东支付、银联支付常用的支付方式以及各种常用的接口。不依赖任何第三方 mvc 框架，仅仅作为工具使用简单快速完成支付模块的开发，可轻松嵌入到任何系统里。',
                            'https://gitee.com/javen205/IJPay/raw/master/assets/img/logo.png',
                            'https://javen205.gitee.io/ijpay',    
                        ),
                    ]
                    
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendNewsMessage(news)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 7:
            // 多图文消息
            let mpnews = new QyMpNewsMsg(
                new QyMpNewsArticles([
                    new QyMpNews(
                        'TNWX 微信系开发脚手架',
                        '1X7ARFWFBZBnOgNEtpRbmSR46LdLuX1aDtoxbJgpBzRqT34EmnQtXxiPk9DfBXzSa',
                        'TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业微信/企业号。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)',
                        'Javen',
                        'https://gitee.com/javen205/TNWX',
                        '了解一下'
                    )
                ]),
                agentId,
                toUser
            )
            QySendMsgApi.sendMpNewsMessage(mpnews)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 8:
            // markdown 消息
            let markDown = new QyMarkDownMsg(
                new QyText(
                    "Javen 开源项目列表:\n"+
                    "[TNWX 微信系开发脚手架](https://gitee.com/javen205/TNWX)\n" +
                    "[IJPay 让支付触手可及](https://gitee.com/javen205/IJPay)\n" +
                    "[JPay 简易而不简单的支付 SDK](https://gitee.com/javen205/IJPay)\n"
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendMarkDownMessage(markDown)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 9:
            // 小程序通知消息
            let miniprogram = new QyMiniProgramNoticeMsg(
                new QyMiniprogram(
                    'wxf30d9b9b316d5de4',
                    '老铁开源项目了解一下',
                    [
                        new QyKv('项目名称', 'TNWX'),
                        new QyKv('参与人员', '所有开发者'),
                    ],
                    'pages/index',
                    '2月2日 14:00',
                    true
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendMiniprogramNoticeMessage(miniprogram)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 10:
            // 任务卡片消息
            let taskCard = new QyTaskCardMsg(
                new QyTaskCard(
                    '123456789',
                    '邀请参加TNWX线下活动',
                    '抽奖时间：15:00<br>礼品：TNWX 周边礼物',
                    [
                        new QyTaskCardBtn('receive', '同意', '已同意', 'red', true),
                        new QyTaskCardBtn('cancel', '取消', '已取消'),
                    ],
                    'https://gitee.com/javen205/TNWX'
                ),
                agentId,
                toUser
            )
            QySendMsgApi.sendTaskCardMessage(taskCard)
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        case 11:
            // 更新任务卡片消息状态
            QyWxApi.updateTaskCard('Javen',agentId,'123456789','receive')
                .then(data => {
                    res.send(data);
                })
                .catch(error =>console.log(error))
            break;
        default:
            break;
    }
});
```