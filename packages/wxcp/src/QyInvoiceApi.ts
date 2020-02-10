import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, QyAccessTokenApi } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 电子发票相关接口
 */
export class QyInvoiceApi {
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/getinvoiceinfo?access_token=%s'

  /**
   * 查询电子发票
   * @param cardId 发票id
   * @param encryptCode 加密code
   */
  public static async get(cardId: string, encryptCode: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.getUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        encrypt_code: encryptCode
      })
    )
  }

  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/updateinvoicestatus?access_token=%s'

  /**
   * 更新发票状态
   * @param cardId 发票id
   * @param encryptCode 加密code
   * @param reimburseStatus 发报销状态 INVOICE_REIMBURSE_INIT:发票初始状态，未锁定; INVOICE_REIMBURSE_LOCK:发票已锁定，无法重复提交报销;INVOICE_REIMBURSE_CLOSURE:发票已核销，从用户卡包中移除
   */
  public static async update(cardId: string, encryptCode: string, reimburseStatus: string) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        encrypt_code: encryptCode,
        reimburse_status: reimburseStatus
      })
    )
  }

  private static batchUpdateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/updatestatusbatch?access_token=%s'

  /**
   * 批量更新发票状态
   * @param openId 用户 openId
   * @param reimburseStatus 发报销状态 INVOICE_REIMBURSE_INIT:发票初始状态，未锁定; INVOICE_REIMBURSE_LOCK:发票已锁定，无法重复提交报销;INVOICE_REIMBURSE_CLOSURE:发票已核销，从用户卡包中移除
   * @param invoiceList 发票列表
   */
  public static async batchUpdate(openId: string, reimburseStatus: string, invoiceList: Array<QyInvoice>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.batchUpdateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        openid: openId,
        reimburse_status: reimburseStatus,
        invoice_list: invoiceList
      })
    )
  }

  private static batchGetUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/getinvoiceinfobatch?access_token=%s'

  /**
   * 批量查询电子发票
   * @param itemList 发票列表
   */
  public static async batchGet(itemList: Array<QyInvoice>) {
    let accessToken: AccessToken = await QyAccessTokenApi.getAccessToken()
    let url = util.format(this.batchGetUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        item_list: itemList
      })
    )
  }
}

export class QyInvoice {
  private card_id: string
  private encrypt_code: string

  constructor(cardId: string, encryptCode: string) {
    this.card_id = cardId
    this.encrypt_code = encryptCode
  }

  public set cardId(cardId: string) {
    this.card_id = cardId
  }

  public get cardId(): string {
    return this.card_id
  }

  public set encryptCode(encryptCode: string) {
    this.encrypt_code = encryptCode
  }

  public get encryptCode(): string {
    return this.encrypt_code
  }
}
