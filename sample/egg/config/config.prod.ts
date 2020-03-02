import { EggAppConfig, PowerPartial } from 'egg'

export default () => {
  const config: PowerPartial<EggAppConfig> = {}
  const bizConfig = {
    // 微信支付配置
    WxPayConfig: {
      apiKey: 'api 密钥',
      domain: 'http://wx.frp.xxx.com',
      appId: '应用ID',
      mchId: '商户号',
      certPath: '证书路径',
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
    }
  }
  return {
    ...config,
    ...bizConfig
  }
}
