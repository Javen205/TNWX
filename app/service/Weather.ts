import { Service } from 'egg';
import { QySendMsgApi, QyApiConfigKit, QyTextCardMsg, QyTextCard } from 'tnwx';

/**
 * Weather Service
 */
export default class Weather extends Service {
  private url = 'http://apis.juhe.cn/simpleWeather/query?city=%E6%AD%A6%E6%B1%89&key=a124c93c256f8da50dc7a90e759b586a';

  /**
   * 调用天气接口并发送天气预报
   * @param toUser    发送给谁
   * @param errToUser 异常时发送谁
   */
  public async send(toUser = '@all', errToUser = 'Javen') {
    const agentId = QyApiConfigKit.getApiConfig.getAppId;

    const res = await this.ctx.curl(this.url);

    const data = JSON.parse(res.data);

    this.ctx.logger.info(`天气预报 data:${data}`);
    let textcard: QyTextCardMsg;

    if (data.error_code === 0) {
      const realtime = data.result.realtime;
      // const wid = parseInt(realtime.wid);
      const info = realtime.info;
      const temperature = realtime.temperature;
      const humidity = realtime.humidity;
      const direct = realtime.direct;
      const power = realtime.power;
      const aqi = realtime.aqi;
      this.ctx.logger.info(
        `info:${info} temperature:${temperature} humidity:${humidity} direct:${direct} power:${power} aqi:${aqi}`,
      );
      const description = `天气：${info}<br>温度：${temperature} ℃<br>湿度：${humidity}%<br>风向：${direct}<br>风力：${power}<br>空气质量指数：${aqi}<br><br>点击查看更多天气`;
      // 文本卡片消息
      textcard = new QyTextCardMsg(
        new QyTextCard('武汉天气', description, 'https://m.tianqi.com', '了解更多'),
        agentId,
        toUser,
      );
    } else {
      this.ctx.logger.error('天气预报接口异常');
      textcard = new QyTextCardMsg(
        new QyTextCard(
          '天气预报接口异常',
          '错误码：' + data.error_code,
          'https://www.juhe.cn/docs/api/id/73',
          '了解更多',
        ),
        agentId,
        errToUser,
      );
    }
    this.sendQyMsg(textcard);
  }

  /**
   * 发送企业卡片消息
   * @param msg QyTextCardMsg
   */
  public async sendQyMsg(msg: QyTextCardMsg) {
    const sendResult = await QySendMsgApi.sendTextCardMessage(msg);
    this.ctx.logger.info(`sendResult: ${sendResult}`);
  }
}
