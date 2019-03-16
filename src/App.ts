import * as util from 'util';
import * as fs from 'fs';
import { ApiKit } from './ApiKit'
import { ApiConfig } from './ApiConfig'
import { MsgController } from './MsgController'
import { AccessToken } from './AccessToken'
import { TemplateData } from './template/TemplateData';
import { MenuManager } from './menu/MenuManager';
import { HttpKit } from './HttpKit';
import { AccessTokenApi } from './AccessTokenApi';
import { ApiConfigKit } from './ApiConfigKit';
import { WeChat } from './WeChat';
import { response } from 'express';

const express = require('express');
const app = express();
const msgAdapter = new MsgController();

app.get('/', (req, res) => {
    res.send("TypeScript + Node.js + Express 极速开发微信公众号 By Javen");
});

app.get('/msg', (req, res) => {
    console.log('get....');
    WeChat.checkSignature(req, res);
});

app.post('/msg', function (req, res) {
    console.log('post...');
    WeChat.handleMsg(req, res, msgAdapter)
});

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
    ApiKit.sendTemplate(res, templateJson);
});

// 读取配置文件创建菜单
app.get('/creatMenu', (req, res) => {
    fs.readFile("./config/menu.json", function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let fileData = data.toString();
        console.log(fileData);
        ApiKit.createMenu(res, fileData);
    });
});

// 动态创建菜单
app.get('/dynamicCreatMenu', (req, res) => {
    ApiKit.createMenu(res, JSON.stringify(MenuManager.getMenu()));
});

app.get('/getAccessToken', (req, res) => {
    AccessTokenApi.getAccessToken().then(data => {
        let accessToken = <AccessToken>data;
        res.send(accessToken);
    });
});

const server = app.listen(6666, "localhost", () => {
    let host = server.address().address;
    let port = server.address().port;
    // 亦可以读取配置文件
    let apiConfig = new ApiConfig("Javen", "wx614c453e0d1dcd12", "19a02e4927d346484fc70327970457f9", false, "10");
    // 支持多公众号
    ApiConfigKit.putApiConfig(apiConfig);
    ApiConfigKit.setCurrentAppId();
    // 开启开发模式,方便调试
    ApiConfigKit.devMode = true;
    console.log("服务器已启动, 地址是：http://%s:%s", host, port);
});


