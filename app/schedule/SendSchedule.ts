import { Subscription } from 'egg';

export default class SendSchedule extends Subscription {
  /**
        *    *    *    *    *    *
        ┬    ┬    ┬    ┬    ┬    ┬
        │    │    │    │    │    |
        │    │    │    │    │    └ 星期 (0 - 7) (0或7都是星期日)
        │    │    │    │    └───── 月份 (1 - 12)
        │    │    │    └────────── 日期 (1 - 31)
        │    │    └─────────────── 小时 (0 - 23)
        │    └──────────────────── 分钟 (0 - 59)
        └───────────────────────── 秒 (0 - 59, optional)
   */
  static get schedule() {
    return {
      //   interval: '10s', // 每 10 秒执行一次
      cron: '0 0 7,8 * * *', // 每天 7/8点 执行一次
      // cron: '0 46,47 13 * * *',
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    await this.ctx.service.weather.send('Javen');
    this.ctx.logger.info('执行定时器');
  }
}
