import { Context, Application, EggAppConfig } from 'egg'
import { QyApiConfigKit, QyWeChat, QyJsApiType } from 'tnwx'
import * as uuid from 'uuid'

/**
 * jssdk 拦截器
 * @param app
 * @param options
 */
export default function qyJsSdkMiddleWare(app: Application, options?: EggAppConfig['qyjssdk']): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      app.logger.info(`options:${JSON.stringify(options)}`)

      const req = ctx.request

      let appId = QyApiConfigKit.getApiConfig.getAppId
      let corpId = QyApiConfigKit.getApiConfig.getCorpId
      let timestamp = new Date().getTime().toString()
      let nonceStr = uuid.v1()

      let url: string = req.protocol
        .concat('://')
        .concat(req.host)
        .replace(':80', '')
        .concat(req.url)

      ctx.app.logger.info(url)

      let signature = await QyWeChat.jssdkSignature(nonceStr, timestamp, url, QyJsApiType.CORP)
      let qySignature = await QyWeChat.jssdkSignature(nonceStr, timestamp, url, QyJsApiType.AGENT)
      req.body = {
        appId: appId,
        corpId: corpId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        qySignature: qySignature
      }
      await next()
    } catch (error) {
      app.logger.error(error)
    }
  }
}
