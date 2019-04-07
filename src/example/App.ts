import { ApiConfig } from '../entity/ApiConfig'
import { MsgController } from './MsgController'
import { AccessToken } from '../AccessToken'
import { TemplateData } from '../entity/template/TemplateData';
import { MenuManager } from './MenuManager';
import { AccessTokenApi } from '../AccessTokenApi';
import { ApiConfigKit } from '../ApiConfigKit';
import { WeChat } from '../WeChat';
import { TemplateApi } from '../api/TemplateApi';
import { MenuApi } from '../api/MenuApi';
import fs from 'fs';
import express from 'express';
import { AddressInfo } from 'net';
import { CustomServiceApi } from '../api/CustomServiceApi';
import { MenuMsg } from '../entity/msg/out/MenuMsg';
import { Article } from '../entity/msg/out/Article';
import { QrcodeApi } from '../api/QrcodeApi';
import { ShortUrlApi } from '../api/ShortUrlApi';
import { TagApi } from '../api/TagApi';
import { UserApi, BatchUserInfo } from '../api/UserApi';
import { AutoReplyInfoApi } from '../api/AutoReplyInfoApi';
import { SubscribeMsgApi } from '../api/SubscribeMsgApi';
import { SubscribeMsg, Data, Content } from '../entity/subscribe/SubscribeMsg';
import { SnsAccessTokenApi, ScopeEnum, Lang } from '../api/SnsAccessTokenApi';
import { SemanticApi } from '../api/SemanticApi';
import { MediaApi, MediaType, MediaArticles } from '../api/MediaApi';
import { MessageApi } from '../api/MessageApi';
import { CallbackApi } from '../api/CallbackApi';
import { DatacubeApi } from '../api/DatacubeApi';
import { PoiApi } from '../api/PoiApi';
import { JsTicketApi, JsApiType } from '../api/JsTicketApi';

const app = express();

// 被动消息回复控制器
const msgAdapter = new MsgController();

app.use(express.static('views'));

const msg = "TNW 极速开发微信公众号案例 <a href='https://javen.blog.csdn.net'>By Javen</a> <br/> " +
    "此案例使用的技术栈为: TypeScript+ Node.js + Express </br></br>" +
    "交流群：<a href='https://github.com/Javen205/shang.qq.com/wpa/qunwpa?idkey=a1e4fd8c71008961bd4fc8eeea224e726afd5e5eae7bf1d96d3c77897388bf24'>114196246</a><br/><br/>" +
    "开源推荐：<br/>" +
    "1、IJPay 让支付触手可及（聚合支付SDK）：<a href=\"https://gitee.com/javen205/IJPay\">https://gitee.com/javen205/IJPay</a><br/>" +
    "2、SpringBoot 微服务高效开发 mica 工具集：<a href=\"https://gitee.com/596392912/mica\">https://gitee.com/596392912/mica</a><br/>" +
    "3、pig 宇宙最强微服务（架构师必备）：<a href=\"https://gitee.com/log4j/pig\">https://gitee.com/log4j/pig</a><br/>" +
    "4、SpringBlade 完整的线上解决方案（企业开发必备）：<a href=\"https://gitee.com/smallc/SpringBlade\">https://gitee.com/smallc/SpringBlade</a><br/>" +
    "5、Avue 一款基于 vue 可配置化的神奇框架：<a href=\"https://gitee.com/smallweigit/avue\">https://gitee.com/smallweigit/avue</a> ";

app.get('/', (req: any, res: any) => {
    res.send(msg);
});

/**
 * 验证开发者入口 
 * 支持多公众号
 * http://域名/msg 或者 http://域名/msg?appId = xxxx
 */
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
    res.send(WeChat.checkSignature(signature, timestamp,
        nonce, echostr));
});

// 接收微信消息入口
app.post('/msg', function (req: any, res: any) {
    console.log('post...', req.query);

    let appId: string = req.query.appId;
    if (appId) {
        ApiConfigKit.setCurrentAppId(appId);
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
        // 接收消息并响应对应的回复
        WeChat.handleMsg(msgAdapter, msgXml,
            msgSignature, timestamp, nonce).then(data => {
                res.send(data);
            });
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
    })
});

app.get('/semantic', function (req: any, res: any) {
    let type: string = req.query.type;
    let jsonStr;
    switch (parseInt(type)) {
        case 0:
            jsonStr = JSON.stringify({
                "query": "查一下明天从北京到上海的南航机票",
                "city": "北京",
                "category": "flight,hotel",
                "appid": "wx614c453e0d1dcd12",
                "uid": "ofkJSuGtXgB8n23e-y0kqDjJLXxk"
            });
            break;
        case 1:
            jsonStr = JSON.stringify({
                "query": "查一下明天深圳的天气",
                "city": "深圳",
                "category": "weather",
                "appid": "wx614c453e0d1dcd12",
                "uid": "ofkJSuGtXgB8n23e-y0kqDjJLXxk"
            });
            break;
        default:
            break;
    }
    SemanticApi.search(jsonStr).then(data => {
        res.send(data);
    })
});


app.get('/subscribe', function (req: any, res: any) {
    let type: string = req.query.type;
    console.log('type', type);
    let templateId = "模板Id";
    let redirectUrl = "授权回调地址";
    let scene = 666;
    let reserved = "reserved";
    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            res.send(SubscribeMsgApi.getAuthorizeURL(scene, templateId, redirectUrl, reserved));
            break;
        case 1:
            SubscribeMsgApi.send(new SubscribeMsg(openId, templateId, scene,
                "订阅消息", new Data(new Content("IJPay 让支付触手可及", "#000000")))).then(data => {
                    res.send(data);
                })
            break;
        default:
            break;
    }

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
    TemplateApi.send(templateJson).then(data => {
        res.send(data);
    });
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
        // res.send(fileData)
        MenuApi.create(fileData).then(data => {
            res.send(data);
        });
    });
});

// 动态创建自定义菜单
app.get('/dynamicCreatMenu', (req: any, res: any) => {
    MenuApi.create(JSON.stringify(MenuManager.getMenu())).then(data => {
        res.send(data);
    });
});

// 获取access_token
app.get('/getAccessToken', (req: any, res: any) => {
    AccessTokenApi.getAccessToken().then(data => {
        let accessToken = <AccessToken>data;
        res.send(accessToken);
    });
});

// 客服消息
app.get('/sendCustomMsg', (req: any, res: any) => {
    let type: string = req.query.type;
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
            let list: MenuMsg[] = [];
            list.push(new MenuMsg("101", "非常满意"));
            list.push(new MenuMsg("102", "满意"));
            // list.push(new MenuMsg("103", "有待提高"));
            CustomServiceApi.sendMenu(openId, "您对本次服务是否满意呢?", list, "欢迎再次光临").then(data => {
                res.send(data);
            });
            break;
        case 3:
            let articles: Article[] = [];
            articles.push(new Article("聚合支付了解一下", "IJPay 让支付触手可及", "https://gitee.com/javen205/IJPay",
                "https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png"));
            CustomServiceApi.sendNews(openId, articles).then(data => {
                res.send(data);
            });
            break;
        case 4:
            CustomServiceApi.sendImage(openId, "EUIf6vWuKACnuc92ZEIrF8oOnTOIWID8jiJnZKp5xJC0e8lNbMNv48IdFA8z8tnM").then(data => {
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
// 生成带参数的二维码
app.get('/qrcode', (req: any, res: any) => {
    let type: string = req.query.type;
    let ticket: string = req.query.ticket;
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
// 短链接
app.get('/shortUrl', (req: any, res: any) => {
    ShortUrlApi.longToShort("https://gitee.com/javen205/IJPay").then(data => {
        res.send(data);
    });
});
// 用户标签管理
app.get('/tagApi', (req: any, res: any) => {
    let type: string = req.query.type;
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
// 用户管理
app.get('/userApi', (req: any, res: any) => {
    let type: string = req.query.type;
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
            let userList: BatchUserInfo[] = [];
            userList.push(new BatchUserInfo(openId, "zh_CN"));
            UserApi.batchGetUserInfo(userList).then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;
        case 3:
            UserApi.getBlackList().then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;
        case 4:
            UserApi.batchBlackList([openId]).then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;
        case 5:
            UserApi.batchUnBlackList([openId]).then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;
        case 6:
            AutoReplyInfoApi.getCurrent().then(data => {
                res.send(data);
            }).catch(reason => {
                res.send(reason);
            });
            break;

        default:
            break;
    }
});
// 素材管理
app.get('/mediaApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            MediaApi.uploadMedia("/Users/Javen/Downloads/test.jpg", MediaType.IMAGE).then(data => {
                res.send("临时素材<br/><br/>" + JSON.stringify(data));
                // wi-phzLx7HrrLuH-FYx6gKMuuP2A5dTIZ5zQQjCWPlJztk_KCDNU-vkpGqJx_SVh
            });
            break;
        case 1:
            MediaApi.addMaterial("/Users/Javen/Downloads/pic/IJPay.png", MediaType.IMAGE).then(data => {
                res.send("永久素材<br/><br/>" + JSON.stringify(data));
                // ZR8Ec1ZsIFzGh8OZsAGILz5NRlMxnFd65FqU-6jM8mI
            });
            break;
        case 2:
            MediaApi.addMaterial("/Users/Javen/Downloads/pic/IJPay.png", MediaType.THUMB).then(data => {
                res.send("永久素材<br/><br/>" + JSON.stringify(data));
                // ZR8Ec1ZsIFzGh8OZsAGIL8gNf9ulydmdb_Qo-KJs8vI
            });
            break;
        case 3:
            let mediaArticles: MediaArticles[] = [];
            mediaArticles.push(new MediaArticles("优秀开源推荐", "ZR8Ec1ZsIFzGh8OZsAGILz5NRlMxnFd65FqU-6jM8mI",
                false, msg, "https://gitee.com/javen205/IJPay", "Javen", "加入如梦技术一起见证成长", 1, 0));
            mediaArticles.push(new MediaArticles("聚合支付了解一下", "ZR8Ec1ZsIFzGh8OZsAGILz5NRlMxnFd65FqU-6jM8mI",
                true, "IJPay 让支付触手可及", "https://gitee.com/javen205/IJPay", "Javen", "微信、支付宝、银联支付", 0));
            MediaApi.uploadNews(mediaArticles).then(data => {
                res.send(data);
            });
            break;
        case 4:
            MediaApi.getMedia("wi-phzLx7HrrLuH-FYx6gKMuuP2A5dTIZ5zQQjCWPlJztk_KCDNU-vkpGqJx_SVh").then(data => {
                res.send(data);
            });
            break;
        case 5:
            MediaApi.getMaterial("ZR8Ec1ZsIFzGh8OZsAGILztgs0yKao2eUe_pVr9MHp0").then(data => {
                res.send(data);
            });
            break;
        case 6:
            let articles = new MediaArticles("聚合支付了解一下", "ZR8Ec1ZsIFzGh8OZsAGILz5NRlMxnFd65FqU-6jM8mI",
                true, "IJPay 让支付触手可及 By Javen", "https://gitee.com/javen205/IJPay", "Javen", "微信、支付宝、银联支付", 1, 0);
            MediaApi.updateNews("ZR8Ec1ZsIFzGh8OZsAGILxBn7u_-vuJYcY64T2MQnl0", 1, articles).then(data => {
                res.send(data);
            });
        case 7:
            MediaApi.delMaterial("ZR8Ec1ZsIFzGh8OZsAGILztgs0yKao2eUe_pVr9MHp0").then(data => {
                res.send(data);
            });
            break;
        case 8:
            MediaApi.getMaterialCount().then(data => {
                res.send(data);
            });
            break;
        case 9:
            MediaApi.batchGetMaterial(MediaType.IMAGE, 0, 20).then(data => {
                res.send(data);
            });
            break;
        case 10:
            MediaApi.batchGetMaterial(MediaType.NEWS, 0, 20).then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});

// 群发消息
app.get('/messageApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    let openId = "ofkJSuGtXgB8n23e-y0kqDjJLXxk";
    switch (parseInt(type)) {
        case 0:
            MessageApi.preview(JSON.stringify({
                "touser": openId,
                "mpnews": {
                    "media_id": "ZR8Ec1ZsIFzGh8OZsAGILxBn7u_-vuJYcY64T2MQnl0"
                },
                "msgtype": "mpnews"
            })).then(data => {
                res.send(data);
            });
            break;
        case 1:
            MessageApi.getSpeed().then(data => {
                res.send(data);
            });
            break;
        case 2:
            MessageApi.setSpeed(4).then(data => {
                res.send(data);
            });
            break;
        case 3:
            // 测试号没有权限
            MessageApi.sendAll(JSON.stringify({
                "filter": {
                    "is_to_all": true,
                },
                "mpnews": {
                    "media_id": "ZR8Ec1ZsIFzGh8OZsAGILxBn7u_-vuJYcY64T2MQnl0"
                },
                "msgtype": "mpnews",
                "send_ignore_reprint": 0
            })).then(data => {
                res.send(data);
            });
            break;
        case 4:
            MessageApi.sendAll(JSON.stringify({
                "filter": {
                    "is_to_all": false,
                    "tag_id": 101
                },
                "text": {
                    "content": "IJPay https://gitee.com/javen205/IJPay"
                },
                "msgtype": "text"
            })).then(data => {
                res.send(data);
            });
            break;
        case 5:
            MessageApi.sendAll(JSON.stringify({
                "filter": {
                    "is_to_all": false,
                    "tag_id": 2
                },
                "image": {
                    "media_id": "ZR8Ec1ZsIFzGh8OZsAGILz5NRlMxnFd65FqU-6jM8mI"
                },
                "msgtype": "image"
            })).then(data => {
                res.send(data);
            });
            break;
        case 6:
            MessageApi.get("1000000002").then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});

// 微信服务器
app.get('/callbackApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            CallbackApi.getCallbackIp().then(data => {
                res.send(data);
            });
            break;
        case 1:
            CallbackApi.check().then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});
// 数据统计
app.get('/DatacubeApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            DatacubeApi.getUserSummary("2019-04-01", "2019-04-02").then(data => {
                res.send(data);
            });
            break;
        case 1:
            DatacubeApi.getUserCumulate("2019-04-01", "2019-04-02").then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});
// 微信门店接口 测试号没有权限
app.get('/poiApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            PoiApi.getWxCategory().then(data => {
                res.send(data);
            });
            break;
        case 1:
            PoiApi.addPoi(JSON.stringify({
                "business": {
                    "base_info": {
                        "sid": "123456789",
                        "business_name": "TNW 微信公众号开发脚手架",
                        "branch_name": "IJPay 聚合支付",
                        "province": "广东",
                        "city": "深圳",
                        "district": "Javen",
                        "address": "福田体育公园",
                        "telephone": "123456789012",
                        "categories": [
                            "美食,小吃快餐"
                        ],
                        "offset_type": 1,
                        "longitude": 115.32375,
                        "latitude": 25.097486,
                        "photo_list": [
                            {
                                "photo_url": "http://mmbiz.qpic.cn/mmbiz_png/bA46Xts9ibwyxicFANHAnA2iaonNed1oTIoAfjNrDicVLVia8fWpSuNx7UsiboektD0fd6IoUsO7o24m6ClWnAefKWPA/0?wx_fmt=png"
                            },
                            {
                                "photo_url": "http://mmbiz.qpic.cn/mmbiz_png/bA46Xts9ibwyxicFANHAnA2iaonNed1oTIoAfjNrDicVLVia8fWpSuNx7UsiboektD0fd6IoUsO7o24m6ClWnAefKWPA/0?wx_fmt=png"
                            }
                        ],
                        "recommend": "不超过200字。麦辣鸡腿堡套餐，麦乐鸡，全家桶",
                        "special": "不超过200字。免费wifi，外卖服务",
                        "introduction": "不超过300字。麦当劳是全球大型跨国连锁餐厅,1940 年创立于美国，在世界上大约拥有3 万间分店。主要售卖汉堡包，以及薯条、炸鸡、汽水、冰品、沙拉、 水果等快餐食品",
                        "open_time": "8:00-20:00",
                        "avg_price": 35
                    }
                }
            })).then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});

app.get('/jsTicketApi', (req: any, res: any) => {
    let type: string = req.query.type;
    console.log('type', type);
    switch (parseInt(type)) {
        case 0:
            JsTicketApi.getTicket(JsApiType.JSAPI).then(data => {
                res.send(data);
            });
            break;
        case 1:
            WeChat.jssdkSignature("1111", "1111", "https://gitee.com/javen205/TNW").then(data => {
                res.send(data);
            });
            break;
        default:
            break;
    }
});


const server = app.listen(8888, "localhost", () => {
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