import { Controller } from 'egg'
import { OpenCpAccessTokenApi, AccessTokenType } from 'tnwx'

export default class OpenCpApiController extends Controller {
  public async index() {
    const { ctx } = this
    let type: number = parseInt(ctx.query.type)
    let data: string = '企业微信开放平台...'

    ctx.app.logger.info(`type:${type}`)

    switch (type) {
      case 1:
        data = JSON.stringify(await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN))
        break
      case 2:
        data = JSON.stringify(await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN))
        break
      default:
        break
    }
    ctx.app.logger.info(data)
    ctx.body = data
  }
}
