import { Controller } from 'egg'
import { MenuManager } from '../MenuManager'
import { QyAgentApi, QyApiConfigKit, QyAppChatApi, QyTextMsg, QyText, QyGroupRobotApi, QyNewsMsg, QyNews, QyArticles } from 'tnwx'

export default class QyApiController extends Controller {
  // 创建菜单
  public async creatMenu() {
    const { ctx } = this
    let data = await QyAgentApi.createMenu(QyApiConfigKit.getApiConfig.getAppId, JSON.stringify(MenuManager.getMenu()))
    ctx.app.logger.info(data)
    ctx.body = data
  }

  // 群聊
  public async appChat() {
    const { ctx } = this
    let type: number = parseInt(ctx.query.type)
    let data: string = '默认数据...'
    let chatId: string = 'wrFLarCgAA8g-8QQvJm5DQ_lEHqVwwUg'
    let webHook: string = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d4626616-30f7-43e5-a5e0-2ee840f72374'

    ctx.app.logger.info(`type:${type}`)

    switch (type) {
      case 1:
        // 创建群聊 只允许企业自建应用调用，且应用的可见范围必须是根部门；
        data = await QyAppChatApi.create(['Javen', '123', 'ZhengYan'], 'Javen', '测试群')
        break
      case 2:
        // 修改群聊会话
        data = await QyAppChatApi.update(chatId, undefined, undefined, undefined, 'TNWX 测试群')
        break
      case 3:
        // 获取群聊会话
        data = await QyAppChatApi.get(chatId)
        break
      case 4:
        // 机器人发送文本消息
        let text: QyTextMsg = new QyTextMsg(new QyText('IJPay 让支付触手可及'))
        text.chatId = chatId
        data = await QyAppChatApi.sendTextMessage(text)
        break
      case 5:
        // 机器人发送文本消息 带有@
        let robotText: QyTextMsg = new QyTextMsg(new QyText('测试机器人发送消息', ['Javen']))
        data = await QyGroupRobotApi.sendTextMsg(webHook, robotText)
        break
      case 6:
        // 机器人发送图文消息
        let news = new QyNews(
          '机器人图文消息',
          '点击查看详情',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581699452999&di=a188c31500e15344e832994ce6c7e7a2&imgtype=0&src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage-641-w1%2Fmapi%2Fmedia%2F2020%2F02%2F07%2F2ae9c1cb77dc4c96a2a627481ea099ca.jpeg',
          'https://gitee.com/javen205/TNWX'
        )
        let robotNews: QyNewsMsg = new QyNewsMsg(new QyArticles([news]))
        data = await QyGroupRobotApi.sendNewsMsg(webHook, robotNews)
        break
      default:
        break
    }
    ctx.app.logger.info(data)
    ctx.body = data
  }
}
