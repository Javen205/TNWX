import { Controller } from 'egg'
/**
 * 企业微信 JSSDK 示例
 */
export default class QyJsSdkController extends Controller {
  public async index() {
    let { ctx } = this
    await ctx.render('qyjssdk', ctx.request.body)
  }
}
