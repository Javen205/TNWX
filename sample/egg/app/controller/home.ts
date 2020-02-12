import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    await this.ctx.render('index', {
      title: 'TNWX 微信系开发脚手架'
    })
  }

  public async npm() {
    const { ctx } = this

    const result = await ctx.curl('https://registry.npm.taobao.org/tnwx/latest', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000
    })

    ctx.body = {
      status: result.status,
      headers: result.headers,
      package: result.data
    }
  }
}
