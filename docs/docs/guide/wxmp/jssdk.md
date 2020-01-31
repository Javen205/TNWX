# 如何使用JSSDK



## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 接口权限以及文档

[公众号接口权限说明](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433401084)

[微信 JS-SDK 说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)


## JSSDK使用步骤

### 步骤一：绑定域名

正式号：登录微信公众平台进入 `公众号设置` 的 `功能设置` 里填写 `JS接口安全域名`

测试号：[进入微信公众帐号测试号申请系统](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login) 找到 ` JS接口安全域名` 点击 `修改`


### 步骤二：引入JS文件

在需要调用JS接口的页面引入如下JS文件：<http://res2.wx.qq.com/open/js/jweixin-1.4.0.js> （支持https）


### 步骤三：通过config接口注入权限验证配置

```javascript
wx.config({
        debug: true,
        appId: '{{ appId }}',
        timestamp: '{{ timestamp }}',
        nonceStr: '{{ nonceStr }}',
        signature: '{{ signature }}',
        jsApiList: [
            'checkJsApi',
            '...省略其他'
        ]
    });
```

### TNWX 中签名实现

签名算法见 [官方文档附录1](https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115&t=0.3879417711074764#62)



**特别注意：** url 必须为页面完整的URL包括参数

```typescript
  @Get('jssdk')
  @Render('jssdk.hbs')
  async jssdk(@Req() request: Request, @Res() response: Response) {
    let appId = ApiConfigKit.getApiConfig.getAppId;
    let timestamp = new Date().getTime() / 1000;
    let nonceStr = uuid.v1();
    let url = "http://xxxx/jssdk?....";//填写完整页面的URL包括参数
    // 生成签名
    let signature = await WeChat.jssdkSignature(nonceStr, timestamp, url);
    return {
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature
    };
  }
```

### 步骤四：通过ready接口处理成功验证

```javascript
wx.ready(function(){
// config 信息验证后会执行 ready 方法，所有接口调用都必须在 config 接口获得结果之后，config 是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在 ready 函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在 ready 函数中。
});
```

### 步骤五：通过error接口处理失败验证

```javascript
wx.error(function(res){
// config 信息验证失败会执行 error 函数，如签名过期导致验证失败，具体错误信息可以打开 config 的 debug 模式查看，也可以在返回的 res 参数中查看，对于 SPA 可以在这里更新签名。
});
```

## JSSDK 示例 

所有JS接口列表见 [官方文档附录2](https://mp.weixin.qq.com/wiki?action=doc&id=mp1421141115&t=0.3879417711074764#63)


**特别注意：**

1. 原有的 wx.onMenuShareTimeline、wx.onMenuShareAppMessage、wx.onMenuShareQQ、wx.onMenuShareQZone 接口，**即将废弃**。请尽快迁移使用客户端 6.7.2 及 JSSDK 1.4.0 以上版本支持的 wx.updateAppMessageShareData、updateTimelineShareData 接口。
2. 分享接口中的 `link` 链接必须 JS 接口安全域名下的链接
3. 公众号微信支付后面再详细介绍


```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>TNWX 微信公众号开发脚手架</title>
    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="tnwx,nodejs,微信公众号开发">
    <meta http-equiv="description" content="tnwx 微信公众号开发脚手架,可集成到任何 Node.js MVC后端框架中">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="https://www.weixinsxy.com/jssdk/css/style.css">

</head>

<body>
    <div class="wxapi_container">
        <div class="wxapi_index_container">
            <ul class="label_box lbox_close wxapi_index_list">
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-basic">基础接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-share">分享接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-image">图像接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-voice">音频接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-smart">智能接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-device">设备信息接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-location">地理位置接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-webview">界面操作接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-scan">微信扫一扫接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-shopping">微信小店接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-card">微信卡券接口</a></li>
                <li class="label_item wxapi_index_item"><a class="label_inner" href="#menu-pay">微信支付接口</a></li>
            </ul>
        </div>
        <div class="lbox_close wxapi_form">
            <h3 id="menu-basic">基础接口</h3>
            <span class="desc">判断当前客户端是否支持指定JS接口</span>
            <button class="btn btn_primary" id="checkJsApi">checkJsApi</button>

            <h3 id="menu-share">分享接口</h3>
            <span class="desc">“分享给朋友”及“分享到QQ”</span>
            <button class="btn btn_primary" id="updateAppMessageShareData">updateAppMessageShareData</button>
            <span class="desc">“分享到朋友圈”及“分享到QQ空间”</span>
            <button class="btn btn_primary" id="updateTimelineShareData">updateTimelineShareData</button>
            <span class="desc">分享到腾讯微博</span>
            <button class="btn btn_primary" id="onMenuShareWeibo">onMenuShareWeibo</button>

            <h3 id="menu-image">图像接口</h3>
            <span class="desc">拍照或从手机相册中选图接口</span>
            <button class="btn btn_primary" id="chooseImage">chooseImage</button>
            <span class="desc">预览图片接口</span>
            <button class="btn btn_primary" id="previewImage">previewImage</button>
            <span class="desc">上传图片接口</span>
            <button class="btn btn_primary" id="uploadImage">uploadImage</button>
            <span class="desc">下载图片接口</span>
            <button class="btn btn_primary" id="downloadImage">downloadImage</button>

            <h3 id="menu-voice">音频接口</h3>
            <span class="desc">开始录音接口</span>
            <button class="btn btn_primary" id="startRecord">startRecord</button>
            <span class="desc">停止录音接口</span>
            <button class="btn btn_primary" id="stopRecord">stopRecord</button>
            <span class="desc">播放语音接口</span>
            <button class="btn btn_primary" id="playVoice">playVoice</button>
            <span class="desc">暂停播放接口</span>
            <button class="btn btn_primary" id="pauseVoice">pauseVoice</button>
            <span class="desc">停止播放接口</span>
            <button class="btn btn_primary" id="stopVoice">stopVoice</button>
            <span class="desc">上传语音接口</span>
            <button class="btn btn_primary" id="uploadVoice">uploadVoice</button>
            <span class="desc">下载语音接口</span>
            <button class="btn btn_primary" id="downloadVoice">downloadVoice</button>

            <h3 id="menu-smart">智能接口</h3>
            <span class="desc">识别音频并返回识别结果接口</span>
            <button class="btn btn_primary" id="translateVoice">translateVoice</button>

            <h3 id="menu-device">设备信息接口</h3>
            <span class="desc">获取网络状态接口</span>
            <button class="btn btn_primary" id="getNetworkType">getNetworkType</button>

            <h3 id="menu-location">地理位置接口</h3>
            <span class="desc">使用微信内置地图查看位置接口</span>
            <button class="btn btn_primary" id="openLocation">openLocation</button>
            <span class="desc">获取地理位置接口</span>
            <button class="btn btn_primary" id="getLocation">getLocation</button>

            <h3 id="menu-webview">界面操作接口</h3>
            <span class="desc">隐藏右上角菜单接口</span>
            <button class="btn btn_primary" id="hideOptionMenu">hideOptionMenu</button>
            <span class="desc">显示右上角菜单接口</span>
            <button class="btn btn_primary" id="showOptionMenu">showOptionMenu</button>
            <span class="desc">关闭当前网页窗口接口</span>
            <button class="btn btn_primary" id="closeWindow">closeWindow</button>
            <span class="desc">批量隐藏功能按钮接口</span>
            <button class="btn btn_primary" id="hideMenuItems">hideMenuItems</button>
            <span class="desc">批量显示功能按钮接口</span>
            <button class="btn btn_primary" id="showMenuItems">showMenuItems</button>
            <span class="desc">隐藏所有非基础按钮接口</span>
            <button class="btn btn_primary" id="hideAllNonBaseMenuItem">hideAllNonBaseMenuItem</button>
            <span class="desc">显示所有功能按钮接口</span>
            <button class="btn btn_primary" id="showAllNonBaseMenuItem">showAllNonBaseMenuItem</button>

            <h3 id="menu-scan">微信扫一扫</h3>
            <span class="desc">调起微信扫一扫接口</span>
            <button class="btn btn_primary" id="scanQRCode0">scanQRCode(微信处理结果)</button>
            <button class="btn btn_primary" id="scanQRCode1">scanQRCode(直接返回结果)</button>
        </div>
    </div>
</body>
<script type="text/javascript" src="http://res2.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script type="text/javascript">
    wx.config({
        debug: true,//开启debug模式 正式环境设置为 false
        appId: '{{ appId }}',
        timestamp: '{{ timestamp }}',
        nonceStr: '{{ nonceStr }}',
        signature: '{{ signature }}',
        jsApiList: [
            'checkJsApi',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareWeibo',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
        ]
    });
    wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        document.querySelector('#checkJsApi').onclick = function () {
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                ],
                success: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 2. 分享接口
        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        document.querySelector('#updateAppMessageShareData').onclick = function () {
            wx.updateAppMessageShareData({
                title: 'TNWX 微信系开发脚手架',
                desc: '支持任何 Node.js 的 MVC 服务端框架',
                link: 'https://gitee.com/javen205/IJPay(此链接必须JS接口安全域名下的链接)',
                imgUrl: 'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png',
                trigger: function (res) {
                    alert('用户点击发送给朋友');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“发送给朋友”状态事件');
        };

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        document.querySelector('#updateTimelineShareData').onclick = function () {
            wx.updateTimelineShareData({
                title: 'TNWX 微信系开发脚手架',
                desc: '支持任何基于 Node.js 的框架',
                link: 'https://gitee.com/javen205/TNWX(此链接必须JS接口安全域名下的链接)',
                imgUrl: 'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png',
                trigger: function (res) {
                    alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到朋友圈”状态事件');
        };
        // 2.3 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareWeibo').onclick = function () {
            wx.onMenuShareWeibo({
                title: 'TNWX 微信系开发脚手架',
                desc: '支持任何基于 Node.js 的框架',
                link: 'https://gitee.com/javen205/TNWX(此链接必须JS接口安全域名下的链接)',
                imgUrl: 'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png',
                trigger: function (res) {
                    alert('用户点击分享到微博');
                },
                complete: function (res) {
                    alert(JSON.stringify(res));
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到微博”状态事件');
        };

        // 3 智能接口
        var voice = {
            localId: '',
            serverId: ''
        };
        // 3.1 识别音频并返回识别结果
        document.querySelector('#translateVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.translateVoice({
                localId: voice.localId,
                complete: function (res) {
                    if (res.hasOwnProperty('translateResult')) {
                        alert('识别结果：' + res.translateResult);
                    } else {
                        alert('无法识别');
                    }
                }
            });
        };

        // 4 音频接口
        // 4.2 开始录音
        document.querySelector('#startRecord').onclick = function () {
            wx.startRecord({
                cancel: function () {
                    alert('用户拒绝授权录音');
                }
            });
        };

        // 4.3 停止录音
        document.querySelector('#stopRecord').onclick = function () {
            wx.stopRecord({
                success: function (res) {
                    voice.localId = res.localId;
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 4.4 监听录音自动停止
        wx.onVoiceRecordEnd({
            complete: function (res) {
                voice.localId = res.localId;
                alert('录音时间已超过一分钟');
            }
        });

        // 4.5 播放音频
        document.querySelector('#playVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.playVoice({
                localId: voice.localId
            });
        };

        // 4.6 暂停播放音频
        document.querySelector('#pauseVoice').onclick = function () {
            wx.pauseVoice({
                localId: voice.localId
            });
        };

        // 4.7 停止播放音频
        document.querySelector('#stopVoice').onclick = function () {
            wx.stopVoice({
                localId: voice.localId
            });
        };

        // 4.8 监听录音播放停止
        wx.onVoicePlayEnd({
            complete: function (res) {
                alert('录音（' + res.localId + '）播放结束');
            }
        });

        // 4.8 上传语音
        document.querySelector('#uploadVoice').onclick = function () {
            if (voice.localId == '') {
                alert('请先使用 startRecord 接口录制一段声音');
                return;
            }
            wx.uploadVoice({
                localId: voice.localId,
                success: function (res) {
                    alert('上传语音成功，serverId 为' + res.serverId);
                    voice.serverId = res.serverId;
                }
            });
        };

        // 4.9 下载语音
        document.querySelector('#downloadVoice').onclick = function () {
            if (voice.serverId == '') {
                alert('请先使用 uploadVoice 上传声音');
                return;
            }
            wx.downloadVoice({
                serverId: voice.serverId,
                success: function (res) {
                    alert('下载语音成功，localId 为' + res.localId);
                    voice.localId = res.localId;
                }
            });
        };

        // 5 图片接口
        // 5.1 拍照、本地选图
        var images = {
            localId: [],
            serverId: []
        };
        document.querySelector('#chooseImage').onclick = function () {
            wx.chooseImage({
                success: function (res) {
                    images.localId = res.localIds;
                    alert('已选择 ' + res.localIds.length + ' 张图片');
                }
            });
        };

        // 5.2 图片预览
        document.querySelector('#previewImage').onclick = function () {
            wx.previewImage({
                current: 'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png',
                urls: [
                    'https://gitee.com/javen205/IJPay/raw/master/assets/img/IJPay-t.png',
                    'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png'
                ]
            });
        };

        // 5.3 上传图片
        document.querySelector('#uploadImage').onclick = function () {
            if (images.localId.length == 0) {
                alert('请先使用 chooseImage 接口选择图片');
                return;
            }
            var i = 0, length = images.localId.length;
            images.serverId = [];
            function upload() {
                wx.uploadImage({
                    localId: images.localId[i],
                    success: function (res) {
                        alert(JSON.stringify(res));
                        i++;
                        alert('已上传：' + i + '/' + length);
                        images.serverId.push(res.serverId);
                        if (i < length) {
                            upload();
                        }
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            }
            upload();
        };

        // 5.4 下载图片
        document.querySelector('#downloadImage').onclick = function () {
            if (images.serverId.length === 0) {
                alert('请先使用 uploadImage 上传图片');
                return;
            }
            var i = 0, length = images.serverId.length;
            images.localId = [];
            function download() {
                wx.downloadImage({
                    serverId: images.serverId[i],
                    success: function (res) {
                        alert(JSON.stringify(res));
                        i++;
                        alert('已下载：' + i + '/' + length);
                        images.localId.push(res.localId);
                        if (i < length) {
                            download();
                        }
                    }
                });
            }
            download();
        };

        // 6 设备信息接口
        // 6.1 获取当前网络状态
        document.querySelector('#getNetworkType').onclick = function () {
            wx.getNetworkType({
                success: function (res) {
                    alert(res.networkType);
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 7 地理位置接口
        // 7.1 查看地理位置
        document.querySelector('#openLocation').onclick = function () {
            wx.openLocation({
                latitude: 23.099994,
                longitude: 113.324520,
                name: 'TIT 创意园',
                address: '广州市海珠区新港中路 397 号',
                scale: 14,
                infoUrl: 'http://weixin.qq.com'
            });
        };

        // 7.2 获取当前地理位置
        document.querySelector('#getLocation').onclick = function () {
            wx.getLocation({
                success: function (res) {
                    alert(JSON.stringify(res));
                },
                cancel: function (res) {
                    alert('用户拒绝授权获取地理位置');
                }
            });
        };

        // 8 界面操作接口
        // 8.1 隐藏右上角菜单
        document.querySelector('#hideOptionMenu').onclick = function () {
            wx.hideOptionMenu();
        };

        // 8.2 显示右上角菜单
        document.querySelector('#showOptionMenu').onclick = function () {
            wx.showOptionMenu();
        };

        // 8.3 批量隐藏菜单项
        document.querySelector('#hideMenuItems').onclick = function () {
            wx.hideMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    'menuItem:share:timeline', // 分享到朋友圈
                    'menuItem:copyUrl' // 复制链接
                ],
                success: function (res) {
                    alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 8.4 批量显示菜单项
        document.querySelector('#showMenuItems').onclick = function () {
            wx.showMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    'menuItem:share:timeline', // 分享到朋友圈
                    'menuItem:copyUrl' // 复制链接
                ],
                success: function (res) {
                    alert('已显示“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };

        // 8.5 隐藏所有非基本菜单项
        document.querySelector('#hideAllNonBaseMenuItem').onclick = function () {
            wx.hideAllNonBaseMenuItem({
                success: function () {
                    alert('已隐藏所有非基本菜单项');
                }
            });
        };

        // 8.6 显示所有被隐藏的非基本菜单项
        document.querySelector('#showAllNonBaseMenuItem').onclick = function () {
            wx.showAllNonBaseMenuItem({
                success: function () {
                    alert('已显示所有非基本菜单项');
                }
            });
        };

        // 8.7 关闭当前窗口
        document.querySelector('#closeWindow').onclick = function () {
            wx.closeWindow();
        };

        // 9 微信原生接口
        // 9.1.1 扫描二维码并返回结果
        document.querySelector('#scanQRCode0').onclick = function () {
            wx.scanQRCode({
                desc: 'scanQRCode desc'
            });
        };
        // 9.1.2 扫描二维码并返回结果
        document.querySelector('#scanQRCode1').onclick = function () {
            wx.scanQRCode({
                needResult: 1,
                desc: 'scanQRCode desc',
                success: function (res) {

                    alert(JSON.stringify(res));
                }
            });
        };

        var shareData = typeof (shareData) === 'undefined' ? {
            title: 'TNWX 微信系开发脚手架',
            desc: '支持任何基于 Node.js 的框架',
            link: 'https://gitee.com/javen205/TNWX',
            imgUrl: 'https://gitee.com/javen205/TNWX/raw/master/assets/img/logo.png',
        } : shareData;

        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
    });

    wx.error(function (res) {
        alert(res.errMsg);
    });
</script>

</html>
```



## Java 版本

[微信公众号开发之如何使用JSSDK](https://www.jianshu.com/p/bb88f7520b9e)


## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>