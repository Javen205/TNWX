// import * as express from 'express';

import * as util from 'util';
import * as fs from 'fs';
import { ApiUrls } from './ApiUrls'
import { ApiConfig } from './ApiConfig'
import { WeChat } from './WeChat'
import { AccessToken } from './AccessToken'
import { TemplateData } from './template/TemplateData';
import { MenuManager } from './menu/MenuManager';
import { HttpTools } from './HttpTools';
import { AccessTokenApi } from './AccessTokenApi';
import { ApiConfigKit } from './ApiConfigKit';

const express = require('express');
const app = express();

// let accessToken = new AccessToken('', 0);

app.get('/', (req, res) => {
    res.send("Hello Express By Javen");
});

app.get('/sendTemplate', (req, res) => {

    AccessTokenApi.getAccessToken().then(function (data) {
        let accessToken = <AccessToken>data;
        console.log("获取到的accessToken", accessToken);

        //格式化请求连接
        let url = util.format(ApiUrls.sendTemplate, ApiUrls.wxDomain, accessToken.accessToken);
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
        // res.send(templateJson);

        HttpTools.httPost(url, templateJson).then(function (data) {
            res.send(data);
        });
    });



});

// 读取配置文件创建菜单
app.get('/creatMenu', (req, res) => {
    AccessTokenApi.getAccessToken().then(function (data) {
        let accessToken = <AccessToken>data;
        console.log("获取到的accessToken", accessToken);
        //格式化请求连接
        let url = util.format(ApiUrls.createMenu, ApiUrls.wxDomain, accessToken.accessToken);
        fs.readFile("./config/menu.json", function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            let fileData = data.toString();
            console.log(fileData);
            //使用 Post 请求创建微信菜单
            HttpTools.httPost(url, fileData).then(function (data) {
                res.send(data);
            });
        });
    });
});

// 动态创建菜单
app.get('/creatMenu2', (req, res) => {
    AccessTokenApi.getAccessToken().then(function (data) {
        let accessToken = <AccessToken>data;
        console.log("获取到的accessToken", accessToken);
        //格式化请求连接
        let url = util.format(ApiUrls.createMenu, ApiUrls.wxDomain, accessToken.accessToken);
        let menu = MenuManager.getMenu();
        // 使用 Post 请求创建微信菜单
        HttpTools.httPost(url, JSON.stringify(menu)).then(function (data) {
            res.send(data);
        });
    });
});

app.get('/getAccessToken', (req, res) => {
    AccessTokenApi.getAccessToken().then(data => {
        let accessToken = <AccessToken>data;
        console.log("获取到的accessToken", accessToken);
        res.send(accessToken);
    });
});

app.get('/msg', (req, res) => {
    WeChat.checkSignature(req, res);
});

app.post('/msg', function (req, res) {
    console.log('post...');
    WeChat.handleMsg(req, res)
});


const server = app.listen(8000, "localhost", () => {
    let host = server.address().address;
    let port = server.address().port;
    let apiConfig = new ApiConfig("Javen", "wx614c453e0d1dcd12", "19a02e4927d346484fc70327970457f9", false, "10");

    ApiConfigKit.putApiConfig(apiConfig);
    console.log("服务器已启动, 地址是：http://%s:%s", host, port);
});