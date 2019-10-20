'use strict';

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
const SnsAccessTokenApi = require("tnw").SnsAccessTokenApi;
const ScopeEnum = require("tnw").ScopeEnum;
const Lang = require("tnw").Lang;
const SubscribeMsgApi = require("tnw").SubscribeMsgApi;
const SubscribeMsg = require("tnw").SubscribeMsg;
const Data = require("tnw").Data;
const Content = require("tnw").Content;
const MsgController = require('./MsgController').MsgController;
const MenuManager = require('./MenuManager').MenuManager;

const express = require('express');
const fs = require('fs');

const app = express();
// 被动消息回复控制器
const msgAdapter = new MsgController();

app.use(express.static('views'));

app.get('/', (req, res) => {
    res.send("TNW 极速开发微信公众号案例 <a href='https://javen.blog.csdn.net'>By Javen</a> <br/> " +
        "此案例使用的技术栈为: TypeScript+ Node.js + Express </br></br>" +
        "交流群：<a href='https://github.com/Javen205/shang.qq.com/wpa/qunwpa?idkey=a1e4fd8c71008961bd4fc8eeea224e726afd5e5eae7bf1d96d3c77897388bf24'>114196246</a><br/><br/>" +
        "开源推荐：<br/>" +
        "1、IJPay 让支付触手可及（聚合支付SDK）：<a href=\"https://gitee.com/javen205/IJPay\">https://gitee.com/javen205/IJPay</a><br/>" +
        "2、SpringBoot 微服务高效开发 mica 工具集：<a href=\"https://gitee.com/596392912/mica\">https://gitee.com/596392912/mica</a><br/>" +
        "3、pig 宇宙最强微服务（架构师必备）：<a href=\"https://gitee.com/log4j/pig\">https://gitee.com/log4j/pig</a><br/>" +
        "4、SpringBlade 完整的线上解决方案（企业开发必备）：<a href=\"https://gitee.com/smallc/SpringBlade\">https://gitee.com/smallc/SpringBlade</a><br/>" +
        "5、Avue 一款基于 vue 可配置化的神奇框架：<a href=\"https://gitee.com/smallweigit/avue\">https://gitee.com/smallweigit/avue</a> ");
});


/**
 * 验证开发者入口 
 * 支持多公众号
 * http://域名/msg 或者 http://域名/msg?appId = xxxx
 */
app.get('/msg', (req, res) => {
    console.log('get query...', req.query);
    let appId = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    let signature = req.query.signature, //微信加密签名
        timestamp = req.query.timestamp, //时间戳
        nonce = req.query.nonce, //随机数
        echostr = req.query.echostr; //随机字符串
    res.send(WeChat.checkSignature(signature, timestamp, nonce, echostr));
});

// 接收微信消息入口
app.post('/msg', function (req, res) {
    console.log('post...', req.query);
    let appId = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
    }
    let msgSignature = req.query.msg_signature,
        timestamp = req.query.timestamp,
        nonce = req.query.nonce;
    //监听 data 事件 用于接收数据
    let buffer = [];
    req.on('data', function (data) {
        buffer.push(data);
    });
    req.on('end', function () {
        let msgXml = Buffer.concat(buffer).toString('utf-8');
        // 接收消息并响应对应的回复
        WeChat.handleMsg(msgAdapter, msgXml, msgSignature, timestamp, nonce).then(data => {
            res.send(data);
        });
    });
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
app.get('/toAuth', (req, res) => {
    let url = SnsAccessTokenApi.getAuthorizeUrl("http://wx.frp.qianfanggaoneng.net/auth", ScopeEnum.SNSAPI_USERINFO, "IJPay");
    console.log("授权URL:", url);
    res.redirect(url);
});
// 授权回调
app.get('/auth', (req, res) => {
    let code = req.query.code;
    let state = req.query.state;
    console.log("code:", code, " state:", state);
    SnsAccessTokenApi.getSnsAccessToken(code).then(data => {
        let temp = JSON.parse(data.toString());
        // 判断 access_token 是否获取成功
        if (temp.errcode) {
            // access_token 获取失败
            res.send(temp);
            return;
        }
        let access_token = temp.access_token;
        let openid = temp.openid;
        let scope = temp.scope;
        if (scope == ScopeEnum.SNSAPI_USERINFO) {
            SnsAccessTokenApi.getUserInfo(access_token, openid, Lang.ZH_CN).then(data => {
                res.send(data);
            });
        } else {
            res.send(temp);
        }
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

app.get('/subscribe', function (req, res) {
    let type = req.query.type;
    console.log('type', type);
    let templateId = "模板Id";
    let redirectUrl = "授权回调地址";
    let scene = 666;
    let reserved = "reserved";
    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            res.send(SubscribeMsgApi.getAuthorizeURL(scene, templateId,
                redirectUrl, reserved));
            break;
        case 1:
            SubscribeMsgApi.send(new SubscribeMsg(openId, templateId, scene, "订阅消息",
                new Data(new Content("IJPay 让支付触手可及", "#000000")))).then(data => {
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