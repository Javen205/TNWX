import { Service } from 'egg'
import { QySendMsgApi, QyApiConfigKit, QyTextCardMsg, QyTextCard } from 'tnwx'

/**
 * Weather Service
 */
export default class Weather extends Service {
  private url: string = 'http://apis.juhe.cn/simpleWeather/query?city=%E6%AD%A6%E6%B1%89&key=a124c93c256f8da50dc7a90e759b586a'

  public async send() {
    let agentId = QyApiConfigKit.getApiConfig.getAppId
    let toAll = '@all'
    let toJaven = 'Javen'

    const res = await this.ctx.curl(this.url)

    const data = JSON.parse(res.data)

    this.ctx.logger.info(`天气预报 data:${data}`)
    let textcard: QyTextCardMsg

    if (data.error_code === 0) {
      let realtime = data.result.realtime
      let wid = parseInt(realtime.wid)
      console.log(wid)
      let info = realtime.info
      let temperature = realtime.temperature
      let humidity = realtime.humidity
      let direct = realtime.direct
      let power = realtime.power
      let aqi = realtime.aqi
      console.log(`info:${info},temperature:${temperature},humidity:${humidity},direct:${direct},power:${power},aqi:${aqi}`)
      // 文本卡片消息
      textcard = new QyTextCardMsg(
        new QyTextCard(
          '武汉天气',
          '天气：' +
            info +
            (wid > 2 ? '  糟糕会下雨雨' : '  心情美美哒') +
            '<br>温度：' +
            temperature +
            ' ℃<br>' +
            '湿度：' +
            humidity +
            '%<br>' +
            '风向：' +
            direct +
            '<br>' +
            '风力：' +
            power +
            '<br>' +
            '空气质量指数：' +
            aqi +
            '%<br><br>点击查看更多天气',
          'https://m.tianqi.com',
          '了解更多'
        ),
        agentId,
        toAll
      )
    } else {
      this.ctx.logger.error('天气预报接口异常')
      textcard = new QyTextCardMsg(new QyTextCard('天气预报接口异常', '错误码：' + data.error_code, 'https://www.juhe.cn/docs/api/id/73', '了解更多'), agentId, toJaven)
    }

    let sendResult = await QySendMsgApi.sendTextCardMessage(textcard)
    this.ctx.logger.info(`sendResult:${sendResult}`)
  }
}
