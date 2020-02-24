# 获取 accesstoken

## 原理介绍

### 概述

`access_token` 是公众号的全局唯一接口调用凭据，公众号调用接口时都需使用 `access_token`。开发者需要进行妥善保存。`access_token` 的存储至少要**保留 512 个字符空间**。`access_token` 的有效期目前为2个小时，需定时刷新，重复获取将导致上次获取的 `access_token` 失效。

公众平台的API调用所需的 `access_token` 的使用及生成方式说明：

1、建议公众号开发者使用中控服务器统一获取和刷新 `access_token`，其他业务逻辑服务器所使用的`access_token` 均来自于该中控服务器，不应该各自去刷新，否则容易造成冲突，导致 `access_token` 覆盖而影响业务；

2、目前 `access_token` 的有效期通过返回的 `expire_in` 来传达，目前是 **7200 秒**之内的值。中控服务器需要根据这个有效时间提前去刷新新 `access_token`。在刷新过程中，中控服务器可对外继续输出的老 `access_token`，此时公众平台后台会保证在**5分钟内**，新老 `access_token`都可用，这保证了第三方业务的平滑过渡；

3、`access_token` 的有效时间可能会在未来有调整，所以中控服务器不仅需要内部定时主动刷新，还需要提供被动刷新 `access_token` 的接口，这样便于业务服务器在API调用获知 `access_token` 已超时的情况下，可以触发`access_token` 的刷新流程。

公众号和小程序均可以使用 AppId 和 AppSecret 调用本接口来获取 `access_token`。AppId 和 AppSecret 可在“微信公众平台-开发-基本配置”页中获得（需要已经成为开发者，且帐号没有异常状态）。**调用接口时，请登录“微信公众平台-开发-基本配置”提前将服务器 IP 地址添加到 IP 白名单中，否则将无法调用成功。** 小程序无需配置IP白名单。



以上内容来自 [官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277) 



:::warning 划重点
- 调用 access_token 接口需要在微信公众平台配置 IP 白名单
- access_token 有效期为 7200 秒
- 可以提前刷新 access_token ，此时公众平台后台会保证在5分钟内新老  `access_token` 都可用
- 以上策略同时适用于微信公众号、企业微信、微信小程序、微信小游戏
:::

## TNWX 中实现方案

[TNWX AccessToken 模块源码](https://gitee.com/javen205/TNWX/blob/master/packages/accesstoken/src/)

```typescript
export class AccessTokenApi {
    private static url: string = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
    /**
     * 获取 acces_token 
     * 1、先从缓存中获取，如果可用就直接返回
     * 2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token 
     */
    public static async getAccessToken() {
        let ac: ApiConfig = ApiConfigKit.getApiConfig;
        let accessToken: AccessToken | undefined = this.getAvailableAccessToken(ac);
        if (accessToken) {
            if(ApiConfigKit.isDevMode) console.log("缓存中的 accesstoken");
            return accessToken;
        }
        if(ApiConfigKit.isDevMode) console.log("刷新 accesstoken");
        return await this.refreshAccessToken(ac);;
    }

    /**
     * 通过 appId 从缓存中获取 acces_token
     * @param apiConfig 
     */
    private static getAvailableAccessToken(apiConfig: ApiConfig): AccessToken | undefined {
        let result: AccessToken | undefined;
        let accessTokenCache: ICache = ApiConfigKit.getAccessTokenCache;
        let accessTokenJson: string = accessTokenCache.get(apiConfig.getAppId);
        if (accessTokenJson) {
            result = new AccessToken(accessTokenJson);
        }
        if (result && result.isAvailable()) {
            return result;
        } else {
            return undefined;
        }
    }

    /**
     * 获取新的 acces_token 并设置缓存
     * @param apiConfig 
     */
    public static async refreshAccessToken(apiConfig: ApiConfig) {
        let url = util.format(this.url, apiConfig.getAppId, apiConfig.getAppScrect);
        let data = await HttpKit.getHttpDelegate.httpGet(url);
        if (data) {
            let accessToken: AccessToken = new AccessToken(data)
            let accessTokenCache: ICache = ApiConfigKit.getAccessTokenCache;
            accessTokenCache.set(apiConfig.getAppId, accessToken.getCacheJson);
            return accessToken;
        } else {
            new Error("获取accessToken异常");
        }
    }
}
```


::: tip 总结
默认 access_token 缓存在内存中，但这有一个缺点，当应用关闭后又得重新获取。所以 TNWX 中提供了设置缓存的扩展。
:::


## 缓存扩展

access_token 缓存接口 `ICache`

```typescript
export interface ICache {
    get(key: string): string;
    set(key: string, jsonValue: string): void;
    remove(key: string): void;
}
```

默认实现 `DefaultCache` 

```typescript
export class DefaultCache implements ICache {

    private map: Map<string, string> = new Map<string, string>();

    get(key: string): string {
        return this.map.get(key) || '';
    }

    set(key: string, jsonValue: string) {
        this.map.set(key, jsonValue);
    }

    remove(key: string) {
        this.map.delete(key);
    }
}
```

## 如何使用？

```typescript 
// 获取access_token
app.get('/getAccessToken', (req: any, res: any) => {
    AccessTokenApi.getAccessToken()
        .then(data => {
            let accessToken = <AccessToken>data;
            res.send(accessToken);
        });
});
```

## 如何刷新？

```typescript
  AccessTokenApi.refreshAccessToken(ApiConfigKit.getApiConfig);
```

## 替换默认缓存策略

`DefaultCache`  替换为你的实现类即可 比如：缓存至文件、Redis 等

```typescript
ApiConfigKit.setCache = new DefaultCache();
```


## 企业微信

实现原理与微信公众号相同

```typescript
app.get('/getQyAccessToken', (req: any, res: any) => {
    QyAccessTokenApi.getAccessToken()
        .then(data => {
            let accessToken = <AccessToken>data;
            res.send(accessToken);
        })
        .catch((error) => console.log(error));
});
```

```TypeScript
QyAccessTokenApi.refreshAccessToken(QyApiConfigKit.getApiConfig);
```

## 企业微信开发平台

### 获取服务商凭证 

获取服务商凭证  provider_access_token

```TypeScript
OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
```

### 获取第三方应用凭证

获取第三方应用凭证 suite_access_token

```TypeScript
OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
```

:::tip 说明
**获取第三方应用凭证之前需要先获取 suite_ticket，获取 suite_ticket有两种方式**

 - 在 HandMsgAdapter 的 processInSuiteTicket 中有回调 10 分钟回调一次 [参考示例](https://gitee.com/javen205/TNWX/blob/master/sample/egg/app/handMsgAdapter.ts#L187)

- 在开放平台 https://open.work.weixin.qq.com/  应用中手动刷新
:::

### 获取授权企业凭证

```TypeScript
OpenCorpAccessTokenApi.getAccessToken(authCorpid, permanentCode)
```

:::tip 说明
- authCorpid、permanentCode 需要通过 OpenCpApi.getPermanentCode(authCode) 来获取
- authCode 为安装应用返回的临时授权码。在 HandMsgAdapter 的 processInAuthEvent 中有回调
:::

## 开源推荐

- `TNWX` 微信系开发发脚手架：<https://gitee.com/javen205/TNWX>
- `IJPay` 让支付触手可及：<https://gitee.com/javen205/IJPay>
- SpringBoot 微服务高效开发 `mica` 工具集：<https://gitee.com/596392912/mica>
- `Avue` 一款基于 vue 可配置化的神奇框架：<https://gitee.com/smallweigit/avue>
- `pig` 宇宙最强微服务（架构师必备）：<https://gitee.com/log4j/pig>
- `SpringBlade` 完整的线上解决方案（企业开发必备）：<https://gitee.com/smallc/SpringBlade>

 


