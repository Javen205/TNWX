# 授权登录

## 官方文档 

[身份认证官方文档](https://work.weixin.qq.com/api/doc/90000/90135/91020)

## 源码

[TNWX-QyOauthApi](https://gitee.com/javen205/TNWX/blob/master/packages/wxcp/src/QyOauthApi.ts)

## 示例

```TypeScript
// 构造网页授权链接
app.get('/qyToAuth', (req, res) => {
    let url = QyOauthApi.getAuthorizeUrl(QyApiConfigKit.getCorpId,'http://wx.frp.ek208.com/qyAuth','tnwx');
    console.log("授权URL:", url);
    res.redirect(url);
});
// 构造扫码登录链接
app.get('/getQrConnect', (req, res) => {
    let url = QyOauthApi.getQrConnect(QyApiConfigKit.getCorpId,QyApiConfigKit.getAppId,'http://wx.frp.ek208.com/qyAuth','tnwx');
    console.log("授权URL:", url);
    res.redirect(url);
});
// 根据code获取成员信息
app.get('/qyAuth', (req, res) => {
    let code = req.query.code;
    let state = req.query.state;
    console.log("code:", code, " state:", state);
    QyOauthApi.getUserInfo(code)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => console.log(error));
});
```