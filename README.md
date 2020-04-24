# TNWX 微信系开发脚手架

TNWX: TypeScript + Node.js + WeiXin 微信系开发脚手架，支持微信公众号、微信支付、微信小游戏、微信小程序、企业微信/企业号。最最最重要的是能快速的集成至任何 Node.js 框架(Express、Nest、Egg、Koa 等)

[TNWX 官方文档](https://javen205.gitee.io/tnwx)

## QuickStart

### Config

修改 `config` 中 `env`，默认为 `dev`，在 `config` 中新建名为 `config.dev.ts` 的文件，复制以下配置并修改 `devApiConfig` 以及 `qyApiConfig`

```TypeScript
import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别。
  // 默认只会输出 INFO 及以上（WARN 和 ERROR）的日志到文件中。
  // config.logger = {
  //   level: 'DEBUG',
  //   consoleLevel: 'DEBUG',
  // };

  const bizConfig = {
    // 公众号配置
    devApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect',
      token: 'Javen',
    },
    // 企业微信配置
    qyApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      corpId: '企业ID',
    },
    weatherConfig: {
      key: 'api key',// https://www.juhe.cn/docs/api/id/73
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
```

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
