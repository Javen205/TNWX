# 授权获取用户信息

## 简介

**TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业号/企业微信。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)**

## 什么是 OAuth2.0

## 微信公众平台OAuth2.0授权详细步骤

## 配置授权回调页面域名

请参考之前写的文章 [微信公众号开发之授权获取用户信息-Java版](https://www.jianshu.com/p/01b04bdf9645)  此篇文章已有 2.6 w+ 的阅读量



## 授权用户信息的一些说明

**关于网页授权的两种scope的区别说明**

1、以 **snsapi_base** 为 scope 发起的网页授权，是用来获取进入页面的用户的 openid 的，并且是静默授权并自动跳转到回调页的。用户感知的就是直接进入了回调页（往往是业务页面）

2、以 **snsapi_userinfo** 为 scope 发起的网页授权，是用来获取用户的基本信息的。但这种授权需要用户手动同意，并且由于用户同意过，所以无须关注，就可在授权后获取该用户的基本信息。

3、`用户管理` 类接口中的 `获取用户基本信息接口`，是在用户和公众号产生消息交互或关注后事件推送后，才能根据用户 openid 来获取用户基本信息。这个接口，包括其他微信接口，都是需要该用户（即openid）关注了公众号后，才能调用成功的。


**关于特殊场景下的静默授权**

1、上面已经提到，对于以snsapi_base为scope的网页授权，就静默授权的，用户无感知；

2、对于已关注公众号的用户，如果用户从公众号的会话或者自定义菜单进入本公众号的网页授权页，即使是scope为snsapi_userinfo，也是静默授权，用户无感知。

**具体而言，网页授权流程分为四步：**

1、引导用户进入授权页面同意授权，获取code

2、通过 code 换取网页授权 access_token（与基础支持中的access_token不同）

3、如果需要，开发者可以刷新网页授权 access_token，避免过期

4、通过网页授权 access_token 和 openid 获取用户基本信息（支持UnionID机制）



## 用户同意授权，获取code

引导关注者打开如下授权的页面URL：

https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect

若提示“该链接无法访问”，请检查参数是否填写错误，是否拥有scope参数对应的授权作用域权限。

尤其注意：

1. 由于授权操作安全等级较高，所以在发起授权请求时，微信会对授权链接做正则强匹配校验，如果链接的参数顺序不对，授权页面将无法正常访问
2. 跳转回调redirect_uri，应当使用https链接来确保授权code的安全性且必须有在MP配置回调页面的域名。

## 用户同意授权后



如果用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE。

**特别注意 ： code作为换取 access_token 的票据，每次用户授权带上的 code 将不一样，code 只能使用一次，5分钟未被使用自动过期。**



**通过code换取网页授权access_token**

**刷新access_token（如果需要）**

**拉取用户信息(需scope为 snsapi_userinfo)**

**检验授权凭证（access_token）是否有效**



##  TNWX 实现方案

```typescript
export class SnsAccessTokenApi {

    private static authorizeUrl: string = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s";
    private static accessTokenUrl: string = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code"
    private static refreshTokenUrl: string = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s"
    private static userInfoUrl: string = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=%s";
    private static checkTokenUrl: string = "https://api.weixin.qq.com/sns/auth?access_token=%s&openid=%s";

    /**
     * 获取授权链接
     * @param redirectUri 回调地址
     * @param scope 
     * @param state 
     */
    public static getAuthorizeUrl(redirectUri: string, scope: ScopeEnum, state?: string): string {
        let url = util.format(this.authorizeUrl, ApiConfigKit.getApiConfig.getAppId, urlencode(redirectUri), scope);
        if (state) {
            url = url + "&state=" + state;
        }
        return url + "#wechat_redirect";
    }
    /**
     * 通过code换取网页授权access_token
     * @param code 
     */
    public static async getSnsAccessToken(code: string) {
        let url = util.format(this.accessTokenUrl, ApiConfigKit.getApiConfig.getAppId,
            ApiConfigKit.getApiConfig.getAppScrect, code);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 刷新access_token
     * @param refreshToken 
     */
    public static async refreshAccessToken(refreshToken: string) {
        let url = util.format(this.refreshTokenUrl, ApiConfigKit.getApiConfig.getAppId, refreshToken);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 检验授权凭证（access_token）是否有效
     * @param accessToken 通过code换取的access_token
     * @param openId 
     */
    public static async checkAccessToken(accessToken: string, openId: string) {
        let url = util.format(this.checkTokenUrl, accessToken, openId);
        return HttpKit.getHttpDelegate.httpGet(url);
    }
    /**
     * 拉取用户信息(需scope为 snsapi_userinfo)
     * @param accessToken 
     * @param openId 
     * @param lang 
     */
    public static async getUserInfo(accessToken: string, openId: string, lang: Lang) {
        let url = util.format(this.userInfoUrl, accessToken, openId, lang);
        return HttpKit.getHttpDelegate.httpGet(url);
    }

}

export enum ScopeEnum {
    SNSAPI_BASE = "snsapi_base",
    SNSAPI_USERINFO = "snsapi_userinfo"
}

export enum Lang {
    ZH_CN = "zh_CN",
    ZH_TW = "zh_TW",
    EN = "en"
}
```



## TNWX 示例 

访问：http/https://域名/toAuth

回调：http/https://域名/auth



```typescript
app.get('/toAuth', (req, res) => {
    let url = SnsAccessTokenApi.getAuthorizeUrl("http://xxx/auth", ScopeEnum.SNSAPI_USERINFO, "IJPay");
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
            // 获取用户信息
            SnsAccessTokenApi.getUserInfo(access_token, openid, Lang.ZH_CN).then(data => {
                res.send(data);
            });
        } else {
            res.send(temp);
        }
    })
});
```

## 常见错误

1、请在微信客户端中打开

授权获取用户信息必须在微信客户端中打开或者使用微信提供的 `微信开发者工具`

2、redirect_url 参数错误 


请检查appId对应的公众平台中设置的授权域名是否与你项目中配置的域名保持一致

3、测试号测试时提示未关注测试号

测试号测试授权是必须先关注的测试的号，官方这做是为了安全。正式环境微信认证的服务号是不用关注就可以获取用户的信息。



## 开源推荐

- `TNWX` 微信公众号开发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>