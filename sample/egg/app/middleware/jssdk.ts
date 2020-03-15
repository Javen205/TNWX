import { Context, Application, EggAppConfig } from 'egg'
import { ApiConfigKit, WeChat } from 'tnwx'
import * as uuid from 'uuid'

/**
 * jssdk 拦截器
 * @param app
 * @param options
 */
export default function jssdkMiddleWare(app: Application, options?: EggAppConfig['jssdk']): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      app.logger.info(`options:${JSON.stringify(options)}`)

      const req = ctx.request

      let appId = ApiConfigKit.getApiConfig.getAppId
      let timestamp = new Date().getTime()
      let nonceStr = uuid.v1()

      let url: string = req.protocol
        .concat('://')
        .concat(req.host)
        .replace(':80', '')
        .concat(req.url)

      ctx.app.logger.info(`url:${url}`)

      let signature = await WeChat.jssdkSignature(nonceStr, String(timestamp), url)

      req.body = {
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature
      }
      await next()
    } catch (error) {
      console.log(error)
    }
  }
}
