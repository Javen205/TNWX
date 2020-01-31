# 模板消息


## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 概述

微信公众号模板消息的使用权限、设置所属行业、规则、申请、添加、删除以及大家问得比较多的问题可以参考之前写的一篇文章，此文章到目前为止(2019.4.28) 已有 **8w+的阅读量 90+的评论**   [微信公众号开发之模板消息](https://www.jianshu.com/p/eb0e9c4dcdfe)

同时也可以参考官方模板消息接口文档  [点击这里](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277)



`access_token` 是公众号的全局唯一接口调用凭据，公众号调用各接口时都需使用 `access_token`

[如何获取 access_token ？](./accesstoken.md) 



##  TNWX 实现方案

```typescript
export class TemplateApi {
    public static sendTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=%s'
    private static setIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=%s';
    private static getIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=%s';
    private static getTemplateIdUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=%s';
    private static delTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/del_private_template?access_token=%s';
    private static getAllTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=%s';

    /**
     * 发送模板消息
     * @param tempJson 
     */
    public static async send(tempJson: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.sendTemplateUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, tempJson);
    }
    /**
     * 设置所属行业
     * @param industry_id1 公众号模板消息所属行业编号
     * @param industry_id2 公众号模板消息所属行业编号
     */
    public static async setIndustry(industry_id1: string, industry_id2: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.setIndustryUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "industry_id1": industry_id1,
            "industry_id2": industry_id2
        }));
    }
    /**
     * 获取设置的行业信息
     */
    public static async getIndustry() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getIndustryUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 获取模板列表
     * @param templateIdShort 模板库中模板的编号
     */
    public static async getTemplateId(templateIdShort: string) {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getTemplateIdUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify({
            "template_id_short": templateIdShort
        }));
    }
    /**
     * 删除模板
     */
    public static async delTemplate() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.delTemplateUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 获取模板列表
     */
    public static async getAllTemplate() {
        let accessToken = await AccessTokenApi.getAccessToken();
        let url = util.format(this.getAllTemplateUrl, (<AccessToken>accessToken).getAccessToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
```



## 发送模板消息

## Express 示例

```typescript
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
```

## Nest 示例

```typescript
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
```



上面是通过封装的实体类来构建发送模板消息需要的 JSON 数据，当然你也可从配置文件、数据库…...中读取 JSON 数据。

默认 nest.js 底层也是使用的 express ，当然也可以替换成其他框架，nest.js 更多介绍请参考官方文档。



## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>

 