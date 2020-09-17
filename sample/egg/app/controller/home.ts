import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    await this.ctx.render('index', {
      title: 'TNWX 微信系开发脚手架'
    })
  }

  public async pay() {
    await this.ctx.render('pay')
  }

  public async mysql() {
    const { ctx } = this
    let queryRes = await ctx.app.mysql.query('select * from users where name=?', ['Javen'])
    console.log(queryRes)

    const user = await ctx.app.mysql.get('users', { id: 1 })
    console.log(user)

    const insertRes = await this.app.mysql.insert('users', { name: 'TNWX' })
    console.log(insertRes)

    const deleteRes = await this.app.mysql.delete('users', { id: 12 })
    console.log(deleteRes)

    ctx.body = 'MySql 测试...'
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
