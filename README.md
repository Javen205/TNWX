# 微信公众号开发


TNW: TypeScript(The) + Node.js(Next) + WeChat

极速开发微信公众号但不止于微信公众号 By Javen

本项目算是我研究 TypeScript + Node.js 的一个小阶段的总结，为什么以公众号为载体呢？ 因为我对 [微信支付](https://gitee.com/javen205/IJPay)、[公众号](https://mp.weixin.qq.com/wiki)、[小程序/小游戏](https://developers.weixin.qq.com/miniprogram/dev/index.html) 有一定的研究，之前也参与过 [jfinal-weixin](https://gitee.com/jfinal/jfinal-weixin) 的开发，所以以微信系为载体再好不过了。后面在条件允许的情况下会扩展对支付、小程序甚至小游戏相关接口的支持。感谢您的关注:)



## 安装与运行

### 源码方式

1、安装 typescript 编译器

```bash
npm install -g typescript
```

2、安装 supervisor 模块

```bash
npm install -g supervisor
```

3、下载项目并安装依赖

```bash
git clone https://github.com/Javen205/TNW.git
cd TNW
npm install 
```

4、编译并运行

```bash
npm run build & npm run dev
```

5、example

完整示例 [请点击这里](https://github.com/Javen205/TNW/tree/master/src/example) 

### NPM 依赖方式

1、下载

```bash 
npm i tnw
```

2、example

以下是部分示例,完整示例 [请点击这里](https://github.com/Javen205/TNW/tree/master/example) 

```JavaScript
// App.js
'use strict';

const MsgController = require('./MsgController').MsgController;
const MenuManager = require('./MenuManager').MenuManager;
const ApiConfigKit = require('tnw').ApiConfigKit;
const ApiConfig = require('tnw').ApiConfig;
const TemplateData = require('tnw').TemplateData;
const WeChat = require('tnw').WeChat;
const TemplateApi = require('tnw').TemplateApi;
const MenuApi = require('tnw').MenuApi;
const AccessTokenApi = require('tnw').AccessTokenApi;
const CustomServiceApi = require('tnw').CustomServiceApi;
const MenuMsg = require('tnw').MenuMsg;
const Article = require('tnw').Article;
const QrcodeApi = require('tnw').QrcodeApi;
const ShortUrlApi = require('tnw').ShortUrlApi;
const TagApi = require('tnw').TagApi;
const UserApi = require('tnw').UserApi;

const express = require('express');
const fs = require('fs');

const app = express();


app.use(express.static('views'));

app.get('/', (req, res) => {
    res.send("TypeScript + Node.js + Express 极速开发微信公众号 By Javen <br/><br/> 交流群：114196246");
});


/**
 * 验证开发者入口 
 * 支持多公众号
 * http://域名/msg 或者 http://域名/msg?appId = xxxx
 */
app.get('/msg', (req, res) => {
    let appId = req.query.appId;
    console.log('get....appId', appId);

    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    WeChat.checkSignature(req, res);
});

// 接收微信消息入口
app.post('/msg', function (req, res) {
    console.log('post...', req.query);

    let appId = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    // 接收消息并响应对应的回复
    WeChat.handleMsg(req, res, new MsgController());
});

// 发送模板消息
app.get('/sendTemplate', (req, res) => {
    let templateJson = new TemplateData().New().
    setToUser("ofkJSuGtXgB8n23e-y0kqDjJLXxk").
    setTemplateId("BzC8RvHu1ICOQfO4N7kp6EWz9VAbISJjV2fO5t7MiXE").
    setTemplateUrl("https://gitee.com/javen205/IJPay").
    add("first", "恭喜你购买成功！", "#743A3A").
    add("keyword1", "IJPay 让支付触手可及", "#0000FF").
    add("keyword1", "聚合支付公开课", "#0000FF").
    add("keyword2", "免费", "#0000FF").
    add("keyword3", "Javen205", "#0000FF").
    add("keyword4", "2019-03-12 13:14", "#0000FF").
    add("remark", "请点击详情直接看课程直播，祝生活愉快", "#008000").
    build();
    console.log("templateJson", templateJson);
    TemplateApi.send(templateJson).then(data => {
        res.send(data);
    });
});


// 读取配置文件来创建自定义菜单
app.get('/creatMenu', (req, res) => {
    fs.readFile("./config/menu.json", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let fileData = data.toString();
        console.log(fileData);
        // res.send(fileData)
        MenuApi.create(fileData).then(data => {
            res.send(data);
        });
    });
});

// 动态创建自定义菜单
app.get('/dynamicCreatMenu', (req, res) => {
    MenuApi.create(JSON.stringify(MenuManager.getMenu())).then(data => {
        res.send(data);
    });
});

// 获取access_token
app.get('/getAccessToken', (req, res) => {
    AccessTokenApi.getAccessToken().then(data => {
        res.send(data);
    });
});


app.get('/sendCustomMsg', (req, res) => {
    let type = req.query.type;
    console.log('type', type);

    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            CustomServiceApi.sendTyping(openId, "Typing").then(data => {
                res.send(data);
            });
            break;
        case 1:
            CustomServiceApi.sendText(openId, "客服消息---IJPay 让支付触手可及", "javen@gh_8746b7fa293e").then(data => {
                res.send(data);
            });
            break;
        case 2:
            // {errcode: 40200,errmsg: "invalid account type hint: [WDtfla05023942]"}
            let list = [];
            list.push(new MenuMsg("101", "非常满意"));
            list.push(new MenuMsg("102", "满意"));
            // list.push(new MenuMsg("103", "有待提高"));
            CustomServiceApi.sendMenu(openId, "您对本次服务是否满意呢?", list, "欢迎再次光临").then(data => {
                res.send(data);
            });
            break;
        case 3:
            let articles = [];
            articles.push(new Article("聚合支付了解一下", "IJPay 让支付触手可及", "https://gitee.com/javen205/IJPay",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png"));
            CustomServiceApi.sendNews(openId, articles).then(data => {
                res.send(data);
            });
            break;
        case 4:
            CustomServiceApi.sendImage(openId, "wqX8pTWl1KIr-8jZHYt4qK3USIzQNztrhmEQDx1BHaJtZrTdCN5KypVeuQ2z5skY").then(data => {
                res.send(data);
            });
            break;
        case 5:
            CustomServiceApi.sendVoice(openId, "a_6HXIgnXkOXXFYY-S6clAfGEXyArfEens4_MBkFqqwnQ9-Qi9Ii7VRL67rmtsW6").then(data => {
                res.send(data);
            });
            break;
        case 6:
            // 需要通过接口上传视频
            CustomServiceApi.sendVideo(openId, "uTSuRGeUYpWlpyLyXdwYXqndfgbh4aRKOGwg4-wsgADANwhLYbM--faOAVurxp6G",
                "客服消息发送视频", "一个有趣的视频").then(data => {
                res.send(data);
            });
            break;
        case 7:
            CustomServiceApi.addKfAccount("javen@gh_8746b7fa293e", "Javen", "123456").then(data => {
                res.send(data);
            });
            CustomServiceApi.addKfAccount("javen205@gh_8746b7fa293e", "Javen205", "123456").then(data => {
                res.send(data);
            });
            break;
        case 8:
            CustomServiceApi.getKfList(res).then(data => {
                res.send(data);
            });
            break;
        case 9:
            CustomServiceApi.delKfAccount("javen@gh_8746b7fa293e").then(data => {
                res.send(data);
            });
            break;
        case 10:
            CustomServiceApi.updateKfAccount("javen205@gh_8746b7fa293e", "Javen", "123456").then(data => {
                res.send(data);
            });
            break;
        case 11:
            CustomServiceApi.uploadKfAccountHeadImg("javen205@gh_8746b7fa293e", "/Users/Javen/Downloads/test.jpg").then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});

app.get('/qrcode', (req, res) => {
    let type = req.query.type;
    let ticket = req.query.ticket;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            res.send(QrcodeApi.getShowQrcodeUrl(ticket));
            break;
        case 1:
            QrcodeApi.createTemporary(10, 1).then(data => {
                res.send(data);
            });
            break;
        case 2:
            QrcodeApi.createTemporaryByStr(10, "IJPay").then(data => {
                res.send(data);
            });
            break;
        case 3:
            QrcodeApi.createPermanent(666).then(data => {
                res.send(data);
            });
            break;
        case 4:
            QrcodeApi.createPermanentByStr("IJPay").then(data => {
                res.send(data);
            });
            break;

        default:
            break;
    }
});

app.get('/shortUrl', (req, res) => {
    ShortUrlApi.longToShort("https://gitee.com/javen205/IJPay").then(data => {
        res.send(data);
    });
});

app.get('/tagApi', (req, res) => {
    let type = req.query.type;
    console.log('type', type);

    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            TagApi.get().then(data => {
                res.send(data);
            });
            break;
        case 1:
            TagApi.create("会员").then(data => {
                res.send(data);
            });
            TagApi.create("普通会员").then(data => {
                res.send(data);
            });
            break;
        case 2:
            TagApi.update(101, "超级会员").then(data => {
                res.send(data);
            });
            break;
        case 3:
            TagApi.delete(100).then(data => {
                res.send(data);
            });
            break;
        case 4:
            TagApi.getUser(101).then(data => {
                res.send(data);
            });
            break;
        case 5:
            TagApi.batchAddTag(101, [openId]).then(data => {
                res.send(data);
            });
            break;
        case 6:
            TagApi.batchDelTag(101, [openId]).then(data => {
                res.send(data);
            });
            break;
        case 7:
            TagApi.getUserTag(openId).then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }


});

app.get('/userApi', (req, res) => {
    let type = req.query.type;
    console.log('type', type);

    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            UserApi.getUserInfo(openId).then(data => {
                res.send(data);
            });
            break;
        case 1:
            UserApi.getFollowers().then(data => {
                res.send(data);
            });
            break;
        case 2:
            let userList = [];
            userList.push(new BatchUserInfo(openId, "zh_CN"));
            UserApi.batchGetUserInfo(userList).then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;

        default:
            break;
    }
});

const server = app.listen(8888, "localhost", () => {
    let addressInfo = server.address();
    if (addressInfo) {
        let host = addressInfo.address;
        let port = addressInfo.port;
        // 亦可以读取配置文件
        let apiConfig = new ApiConfig("Javen", "wx614c453e0d1dcd12", "19a02e4927d346484fc70327970457f9", false, "xxxx");
        // 支持多公众号
        ApiConfigKit.putApiConfig(apiConfig);
        ApiConfigKit.setCurrentAppId();
        // 开启开发模式,方便调试
        ApiConfigKit.devMode = true;
        if (ApiConfigKit.devMode) {
            console.log("服务器已启动, 地址是：http://%s:%s", host, port);
        }
    }
});
```

## 交流群

群号:[ 114196246](https:shang.qq.com/wpa/qunwpa?idkey=a1e4fd8c71008961bd4fc8eeea224e726afd5e5eae7bf1d96d3c77897388bf24)

## 开源推荐

- `IJPay` 让支付触手可及：https://gitee.com/javen205/IJPay
- SpringBoot 微服务高效开发 `mica` 工具集：https://gitee.com/596392912/mica
- `Avue` 一款基于 vue 可配置化的神奇框架：https://gitee.com/smallweigit/avue
- `pig` 宇宙最强微服务（架构师必备）：https://gitee.com/log4j/pig
- `SpringBlade` 完整的线上解决方案（企业开发必备）：https://gitee.com/smallc/SpringBlade

## 参考资料

- [Node.js & Express 教程](http://www.runoob.com/nodejs/nodejs-tutorial.html)
- [Java 版 jfinal-weixin](https://gitee.com/jfinal/jfinal-weixin)
- [JavaScript + Node.js 版](https://github.com/SilenceHVK/wechatByNode)
- [wechat-dev-with-nodejs](https://github.com/i5ting/wechat-dev-with-nodejs/blob/master/stuq.md)

