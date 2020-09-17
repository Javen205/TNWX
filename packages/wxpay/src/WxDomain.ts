/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信支付接口域名
 */
export enum WX_DOMAIN {
  /**
   *  中国国内
   */
  CHINA = 'https://api.mch.weixin.qq.com',
  /**
   *  中国国内(备用域名)
   */
  CHINA2 = 'https://api2.mch.weixin.qq.com',
  /**
   *  东南亚
   */
  HK = 'https://apihk.mch.weixin.qq.com',
  /**
   *  其它
   */
  US = 'https://apius.mch.weixin.qq.com',
  /**
   * 获取公钥
   */
  FRAUD = 'https://fraud.mch.weixin.qq.com',
  /**
   *  活动
   */
  ACTION = 'https://action.weixin.qq.com',
}
