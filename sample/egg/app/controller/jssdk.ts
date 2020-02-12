import { Controller } from 'egg'
/**
 * 微信公众号 JSSDK 示例
 */
export default class JsSdkController extends Controller {
  public async index() {
    let { ctx } = this
    await ctx.render('jssdk', ctx.request.body)
  }
}
