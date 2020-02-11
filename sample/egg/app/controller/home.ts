import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    await this.ctx.render('index', {
      title: 'TNWX 微信系开发脚手架'
    })
  }
}
