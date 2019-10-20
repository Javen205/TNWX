import { Controller, Get, Req, Res, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import {
  WeChat,
  ApiConfigKit,
  SnsAccessTokenApi, ScopeEnum, Lang,
  SubscribeMsg, Data, Content, SubscribeMsgApi,
  TagApi, ShortUrlApi, QrcodeApi, Article, SemanticApi,
  TemplateApi, TemplateData, MenuApi, AccessTokenApi, AccessToken,
  CustomServiceApi, MenuMsg, UserApi, BatchUserInfo, AutoReplyInfoApi,
  WxPay, WX_API_TYPE, WX_DOMAIN
} from 'tnw';
import { MsgController } from './MsgController';
import { MenuManager } from './MenuManager';
import uuid = require('uuid');


@Controller()
export class AppController {

  private msgAdapter: MsgController;

  constructor(private readonly appService: AppService) {
    this.msgAdapter = new MsgController();
  }

  @Get('jssdk')
  @Render('jssdk.hbs')
  async jssdk(@Req() request: Request, @Res() response: Response) {
    let appId = ApiConfigKit.getApiConfig.getAppId;
    let timestamp = new Date().getTime() / 1000;
    let nonceStr = uuid.v1();
    let url = "http://xxxx/jssdk";//填写完整页面的URL
    let signature = await WeChat.jssdkSignature(nonceStr, String(timestamp), url);
    return {
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature
    };
  }

  @Get()
  @Render('index.hbs')
  getHello() {
    return {};
  }

  @Get("wxPay")
  wxPay(@Req() request: Request, @Res() response: Response) {
    WxPay.getSignKey("1444446802", "hebeiruiziwangluokejiyouxiangong")
      .then((data) => {
        response.send(data);
      }).catch((error) => console.log(error))
  }

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
    response.send(WeChat.checkSignature(signature, timestamp,
      nonce, echostr));
  }
  @Post("/msg")
  PostMsg(@Req() req: Request, @Res() res: Response) {
    let that = this;
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
      WeChat.handleMsg(that.msgAdapter, msgXml,
        msgSignature, timestamp, nonce).then(data => {
          res.send(data);
        });
    });
  }
  @Get('/toAuth')
  toAuth(@Req() req: Request, @Res() res: Response) {
    let url = SnsAccessTokenApi.getAuthorizeUrl("http://wx.frp.qianfanggaoneng.net/auth", ScopeEnum.SNSAPI_USERINFO, "IJPay");
    console.log("授权URL:", url);
    res.redirect(url);
  }
  // 授权回调
  @Get('/auth')
  auth(@Req() req: Request, @Res() res: Response) {
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
  };
  // 语义转换
  @Get('/semantic')
  semantic(@Req() req: Request, @Res() res: Response) {
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
  };

  // 一次性订阅消息
  @Get('/subscribe')
  subscribe(@Req() req: Request, @Res() res: Response) {
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

  };

  // 发送模板消息
  @Get('/sendTemplate')
  sendTemplate(@Req() req: Request, @Res() res: Response) {
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
  };

  // 动态创建自定义菜单
  @Get('/dynamicCreatMenu')
  dynamicCreatMenu(@Req() req: Request, @Res() res: Response) {
    MenuApi.create(JSON.stringify(MenuManager.getMenu())).then(data => {
      res.send(data);
    });
  };

  // 获取access_token
  @Get('/getAccessToken')
  getAccessToken(@Req() req: Request, @Res() res: Response) {
    AccessTokenApi.getAccessToken().then(data => {
      let accessToken = <AccessToken>data;
      res.send(accessToken);
    });
  };

  // 发送客服消息
  @Get('/sendCustomMsg')
  sendCustomMsg(@Req() req: Request, @Res() res: Response) {
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
  };
  //二维码
  @Get('/qrcode')
  qrcode(@Req() req: Request, @Res() res: Response) {
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
  };
  @Get('/shortUrl')
  shortUrl(@Req() req: Request, @Res() res: Response) {
    ShortUrlApi.longToShort("https://gitee.com/javen205/IJPay").then(data => {
      res.send(data);
    });
  };
  @Get('/tagApi')
  tagApi(@Req() req: Request, @Res() res: Response) {
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
  };
  @Get('/userApi')
  userApi(@Req() req: Request, @Res() res: Response) {
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
  };
}
