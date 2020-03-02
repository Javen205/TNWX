## QuickStart

### Development

默认加载 dev 配置，此文件 git 上并没有上传，请复制 config.prod.ts 并命名为 config.dev.ts
如果需修改环境，修改 config/env 即可。 [官方文档-运行环境](https://eggjs.org/zh-cn/basics/env.html)

```bash
$ npm i
$ npm run dev
$ open http://localhost:8888/
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
