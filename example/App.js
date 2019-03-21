

'use strict';

const MsgController = require('./MsgController').MsgController;
const MenuManager = require('./MenuManager').MenuManager;
const ApiConfigKit = require('../index').ApiConfigKit;
const ApiConfig = require('../index').ApiConfig;
const TemplateData = require('../index').TemplateData;
const WeChat = require('../index').WeChat;
const TemplateApi = require('../index').TemplateApi;
const MenuApi = require('../index').MenuApi;
const AccessTokenApi = require('../index').AccessTokenApi;
const CustomServiceApi = require('../index').CustomServiceApi;
const MenuMsg = require('../index').MenuMsg;
const Article = require('../index').Article;
const QrcodeApi = require('../index').QrcodeApi;
const ShortUrlApi = require('../index').ShortUrlApi;
const TagApi = require('../index').TagApi;
const UserApi = require('../index').UserApi;

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