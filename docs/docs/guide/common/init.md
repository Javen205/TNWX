# 快速入门

## 添加依赖

### 开发版

```bash
$ git clone https://gitee.com/javen205/TNWX.git
$ cd TNWX
$ yarn bootstrap
$ yarn tsc
```

### 稳定版

**二者任选其一**

```bash
$ npm i tnwx 
$ yarn add tnwx
```

## 导入相关模块 

```typescript
import {
	WeChat,
    ApiConfigKit,
    QyApiConfigKit,
    AccessToken,
    QyAccessTokenApi,
    Kits,
    HttpKit,
    ApiConfig,
    ...
} from 'tnwx';
```

## 初始化

:::warning 提示
调用任何接口之前都必须做应用的初始化
:::

```
new ApiConfig(appId: string, appScrect: string, token?: string, encryptMessage?: boolean, encodingAesKey?: string, corpId?: string);
```

:::tip ApiConfig 参数说明

   第一个参数：appId。 **企业微信时 appId 对应的值为 agentId**

   第二个参数：appScrect

   第三个参数：令牌 Token 可以任意填写

   第四个参数：是否开启加密 encryptMessage  默认值为 false。**测试号必须为 false， 企业号必须为 true**

   第五个参数：消息加解密密钥 encodingAesKey 非必须。 **encryptMessage 为 true 时必须**

   第六个参数：企业ID 非必须。 **企业微信时必须**

:::

## 示例

```TypeScript
  let devApiConfig = new ApiConfig('wx614c453e0d1dcd12', '19a02e4927d346484fc70327970457f9','Javen');

  // 微信公众号、微信小程序、微信小游戏 支持多应用
  ApiConfigKit.putApiConfig(apiConfig);
  // 开启开发模式,方便调试
  ApiConfigKit.devMode = true;
  // 设置当前应用
  ApiConfigKit.setCurrentAppId(devApiConfig.getAppId);
  
  // 企业微信 支持多企业微信多应用
  let qyApiConfig = new ApiConfig('1000004', 'fs-wmeFEr4PCMY7WGYyv1rDKGwaPLTvWFFX3UL396QI','Javen',true,'GFLxP8ppqcgQbI0yivtMkY4pkOAOiapHhQsCOgYUnYK','wxdbc631b5210be89f');

  QyApiConfigKit.putApiConfig(qyMiniApiConfig);

  // 开启开发模式,方便调试
  QyApiConfigKit.devMode = true;
  // 设置当前应用
  QyApiConfigKit.setCurrentAppId(qyApiConfig.getAppId, qyApiConfig.getCorpId);

  // 默认配置
  // HttpKit.setHttpDelegate = new AxiosHttpKit();
  // ApiConfigKit.setCache = new DefaultCache();

```


## 更多

[开启开发者模式](../wxmp/callback)

[获取 AccessToken](./accesstoken)
