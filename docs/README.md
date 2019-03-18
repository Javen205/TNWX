# 微信公众号开发


TNW: TypeScript(The) + Node.js(Next) + WeChat

极速开发微信公众号但不止于微信公众号 By Javen

本项目算是我研究 TypeScript + Node.js 的一个小阶段的总结，为什么以公众号为载体呢？ 因为我对 [微信支付](https://gitee.com/javen205/IJPay)、[公众号](https://mp.weixin.qq.com/wiki)、[小程序/小游戏](https://developers.weixin.qq.com/miniprogram/dev/index.html) 有一定的研究，之前也参与过 [jfinal-weixin](https://gitee.com/jfinal/jfinal-weixin) 的开发，所以以微信系为载体再好不过了。后面在条件允许的情况下会扩展对支付、小程序甚至小游戏相关接口的支持。感谢您的关注:)



## 安装与运行

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

## 示例 

```TypeScript
import { ApiConfig } from './ApiConfig'
import { MsgController } from './MsgController'
import { AccessToken } from './AccessToken'
import { TemplateData } from './template/TemplateData';
import { MenuManager } from './menu/MenuManager';
import { AccessTokenApi } from './AccessTokenApi';
import { ApiConfigKit } from './ApiConfigKit';
import { WeChat } from './WeChat';
import { TemplateApi } from './api/TemplateApi';
import { MenuApi } from './api/MenuApi';
import fs from 'fs';
import express from 'express';
import { AddressInfo } from 'net';
const app = express();

// 被动消息回复控制器
const msgAdapter = new MsgController();


app.get('/', (req: any, res: any) => {
    res.send("TypeScript + Node.js + Express 极速开发微信公众号 By Javen");
});

/**
 * 验证开发者入口 
 * 支持多公众号
 * http://域名/msg 或者 http://域名/msg?appId = xxxx
 */
app.get('/msg', (req: any, res: any) => {
    let appId: string = req.query.appId;
    console.log('get....appId', appId);

    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    WeChat.checkSignature(req, res);
});

// 接收微信消息入口
app.post('/msg', function (req: any, res: any) {
    console.log('post...', req.query);

    let appId: string = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    // 接收消息并响应对应的回复
    WeChat.handleMsg(req, res, msgAdapter)
});

// 发送模板消息
app.get('/sendTemplate', (req: any, res: any) => {
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
    TemplateApi.send(res, templateJson);
});

// 读取配置文件来创建自定义菜单
app.get('/creatMenu', (req: any, res: any) => {
    fs.readFile("./config/menu.json", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let fileData = data.toString();
        console.log(fileData);
        MenuApi.create(res, fileData);
    });
});

// 动态创建自定义菜单
app.get('/dynamicCreatMenu', (req: any, res: any) => {
    MenuApi.create(res, JSON.stringify(MenuManager.getMenu()));
});

// 获取access_token
app.get('/getAccessToken', (req: any, res: any) => {
    AccessTokenApi.getAccessToken().then(data => {
        let accessToken = <AccessToken>data;
        res.send(accessToken);
    });
});

const server = app.listen(6666, "localhost", () => {
    let addressInfo: AddressInfo = <AddressInfo>server.address();
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


## 推荐与参考资料

- [Node.js & Express 教程](http://www.runoob.com/nodejs/nodejs-tutorial.html)
- [Java 版 jfinal-weixin](https://gitee.com/jfinal/jfinal-weixin)
- [JavaScript + Node.js 版](https://github.com/SilenceHVK/wechatByNode)
- [wechat-dev-with-nodejs](https://github.com/i5ting/wechat-dev-with-nodejs/blob/master/stuq.md)

