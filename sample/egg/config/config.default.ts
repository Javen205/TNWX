import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // 关闭 csrf
  config.security = {
    csrf: {
      enable: false
    }
  }
  // 渲染html模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks'
    }
  }

  config.logger = {
    level: 'DEBUG'
  }

  // config.static = {
  //   // 静态化访问前缀,如：`http://127.0.0.1:8888/static/images/coffee.jpeg`
  //   // 验证域名的时候可以去掉 默认为 '/public'
  //   prefix: ''
  // }

  config.middleware = ['jssdk', 'qyjssdk']

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581321107407_6273'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
