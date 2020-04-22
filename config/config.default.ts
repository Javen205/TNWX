import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // 关闭 csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 渲染html模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.logger = {
    level: 'DEBUG',
  };

  // config.static = {
  //   // 静态化访问前缀,如：`http://127.0.0.1:7001/public/images/coffee.jpeg`
  //   // 验证域名的时候可以去掉 默认为 '/public'
  //   prefix: ''
  // }

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587537023952_2794';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: 'https://gitee.com/javen205/TNWX',
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
