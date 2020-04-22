import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.app.logger.debug('TNWX 交流群：114196246');
    await this.ctx.render('index', {
      title: 'TNWX 微信系开发脚手架',
    });
  }

  public async sayHi() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }

  public async send() {
    const { ctx } = this;
    await ctx.service.weather.send('Javen');
    ctx.body = '发送成功...';
  }
}
