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

  config.middleware = ['jssdk', 'qyjssdk', 'openjssdk']

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581321107407_6273'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    // 微信开放平台配置
    openMpConfig: {
      appId: 'appId',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      domain: 'http://wx.frp.ijpay.com',
      authAppId: ''
    },
    // 微信支付配置
    WxPayConfig: {
      apiKey: 'apiKey',
      apiKey3: 'apiKey3',
      domain: 'http://wx.frp.xxx.com',
      appId: '应用ID',
      mchId: '商户号',
      certP12Path: 'cert.p12',
      keyPath: 'key.pem',
      certPath: 'cert.pem',
      wxCertPath: '微信平台证书',
      providerAppId: '服务商appId',
      provideMchId: '服务商商户号'
    },
    // 微信公众号开发环境配置
    devApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect',
      token: 'Javen'
    },
    // 小程序配置
    miniApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect'
    },
    // 企业应用配置
    qyApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      corpId: '企业ID'
    },
    // 企业小程序应用配置
    qyMiniApiConfig: {
      appId: '应用ID',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      corpId: '企业ID'
    },
    // 企业微信开放平台配置
    openCpConfig: {
      appId: '企业ID',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      corpId: '企业ID'
    },
    // 企业微信开放平台应用配置
    openSuiteConfig: {
      appId: '第三方应用ID',
      appScrect: 'appScrect',
      token: 'Javen',
      encryptMessage: true,
      encodingAesKey: 'encodingAesKey',
      corpId: '服务商的企业ID'
    },
    AEAD_AES_256_GCM: {
      nonce: 'nonce',
      associated_data: 'associated_data',
      ciphertext: 'ciphertext'
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'test'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  }
}
