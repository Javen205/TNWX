import { Application, IBoot } from 'egg'
import { ApiConfig, ApiConfigKit, QyApiConfigKit } from 'tnwx'

export default class FooBoot implements IBoot {
  private readonly app: Application

  constructor(app: Application) {
    this.app = app
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
    this.app.logger.info('configDidLoad...')
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    this.app.logger.info('didLoad...')
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
    this.app.logger.info('willReady...')
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    this.app.logger.info('didReady...')
  }

  async serverDidReady() {
    // Server is listening.
    this.app.logger.info('serverDidReady...')
    // 亦可以读取配置文件
    let devApiConfig = new ApiConfig('wx614c453e0d1dcd12', '19a02e4927d346484fc70327970457f9', 'Javen')
    let miniApiConfig = new ApiConfig('wxf30d9b9b316d5de4', 'bf0f1a06ba7cc16be643a250ca40213b')
    let qyApiConfig = new ApiConfig('1000004', 'fs-wmeFEr4PCMY7WGYyv1rDKGwaPLTvWFFX3UL396QI', 'Javen', true, 'GFLxP8ppqcgQbI0yivtMkY4pkOAOiapHhQsCOgYUnYK', 'wxdbc631b5210be89f')
    let qyMiniApiConfig = new ApiConfig(
      '1000006',
      'I9aenO-_rgAqrT_NGub-43_5bUCJvDL7YBTTcUb9nIg',
      'Javen',
      true,
      'GFLxP8ppqcgQbI0yivtMkY4pkOAOiapHhQsCOgYUnYK',
      'wxdbc631b5210be89f'
    )

    // 支持多公众号
    ApiConfigKit.putApiConfig(devApiConfig)
    ApiConfigKit.putApiConfig(miniApiConfig)
    ApiConfigKit.setCurrentAppId(devApiConfig.getAppId)
    QyApiConfigKit.putApiConfig(qyApiConfig)
    QyApiConfigKit.putApiConfig(qyMiniApiConfig)
    QyApiConfigKit.setCurrentAppId(qyApiConfig.getAppId, qyApiConfig.getCorpId)
    // QyApiConfigKit.setCurrentAppId(qyMiniApiConfig.getAppId, qyMiniApiConfig.getCorpId);
    // 开启开发模式,方便调试
    ApiConfigKit.devMode = true
    QyApiConfigKit.devMode = true

    // HttpKit.setHttpDelegate = new AxiosHttpKit();
    // ApiConfigKit.setAccessTokenCache = new DefaultAccessTokenCache();
  }

  async beforeClose() {
    // Do some thing before app close.
    this.app.logger.info('beforeClose...')
  }
}
