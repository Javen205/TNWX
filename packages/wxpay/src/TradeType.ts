/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信支付交易类型
 */
export enum WX_TRADE_TYPE {
  /**
   * 微信公众号支付或者小程序支付
   */
  JSAPI = 'JSAPI',
  /**
   * 微信扫码支付
   */
  NATIVE = 'NATIVE',
  /**
   * 微信APP支付
   */
  APP = 'APP',
  /**
   * 付款码支付
   */
  MICROPAY = 'MICROPAY',
  /**
   * H5支付
   */
  MWEB = 'MWEB'
}
