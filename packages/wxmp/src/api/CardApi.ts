import * as util from 'util'
import { AccessToken, AccessTokenApi } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 微信卡券相关接口
 */
export class CardApi {
  private static cardCreateUrl: string = 'https://api.weixin.qq.com/card/create?access_token=%s'

  /**
   * 创建会员卡接口
   * @param jsonStr
   * @param accessToken
   */
  public static async create(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.cardCreateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  private static setPayCellUrl: string = 'https://api.weixin.qq.com/card/paycell/set?access_token=%s'

  /**
   * 设置买单接口
   * @param cardId
   * @param isOpen
   * @param accessToken
   */
  public static async setPayCell(cardId: string, isOpen: boolean, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.setPayCellUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        is_open: isOpen
      })
    )
  }

  private static setSelfConsumeCellUrl: string = 'https://api.weixin.qq.com/card/selfconsumecell/set?access_token=%s'
  /**
   * 设置自助核销接口
   * @param cardId  卡券ID
   * @param isOpen  是否开启自助核销功能，填true/false，默认为false
   * @param needVerifyCod 用户核销时是否需要输入验证码， 填true/false， 默认为false
   * @param needRemarkAmount 用户核销时是否需要备注核销金额， 填true/false， 默认为false
   * @param accessToken
   */
  public static async setSelfConsumeCell(cardId: string, isOpen: boolean = false, needVerifyCod: boolean = false, needRemarkAmount: boolean = false, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.setSelfConsumeCellUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        is_open: isOpen,
        need_verify_cod: needVerifyCod,
        need_remark_amount: needRemarkAmount
      })
    )
  }

  private static createQrcodeCardUrl: string = 'https://api.weixin.qq.com/card/qrcode/create?access_token=%s'
  /**
   * 创建二维码接口
   * @param jsonStr
   * @param accessToken
   */
  public static async createQrcodeCard(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createQrcodeCardUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  private static createLandingPageCardUrl: string = 'https://api.weixin.qq.com/card/landingpage/create?access_token=%s'
  /**
   * 创建货架接口
   * @param jsonStr
   * @param accessToken
   */
  public static async createLandingPageCard(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.createLandingPageCardUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  private static getHtmlMpNewsUrl: string = 'https://api.weixin.qq.com/card/mpnews/gethtml?access_token=%s'
  /**
   * 图文消息群发卡券
   * @param cardId
   * @param accessToken
   */
  public static async getHtmlMpNews(cardId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getHtmlMpNewsUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId
      })
    )
  }

  private static setTestWhiteListUrl: string = 'https://api.weixin.qq.com/card/testwhitelist/set?access_token=%s'
  /**
   * 设置测试白名单
   * @param jsonStr
   * @param accessToken
   */
  public static async setTestWhiteList(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.setTestWhiteListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  private static getCodeUrl: string = 'https://api.weixin.qq.com/card/code/get?access_token=%s'
  /**
   * 查询Code接口
   * @param code 单张卡券的唯一标准
   * @param cardId 卡券ID代表一类卡券。自定义code卡券必填。
   * @param checkConsume 是否校验code核销状态
   * @param accessToken
   */
  public static async getCode(code: string, cardId?: string, checkConsume?: boolean, accessToken?: AccessToken) {
    let map = new Map()
    map.set('code', code)
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (checkConsume) {
      map.set('check_consume', checkConsume)
    }
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  private static consumeCodeUrl: string = 'https://api.weixin.qq.com/card/code/consume?access_token=%s'
  /**
   * 核销Code接口
   * @param code 需核销的Code码
   * @param cardId 卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写。
   * @param accessToken
   */
  public static async consume(code: string, cardId?: string, accessToken?: AccessToken) {
    let map = new Map()
    map.set('code', code)
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.consumeCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  /**
   * 线上核销Code接口
   * @param code 需核销的Code码
   * @param openid 当前卡券使用者的openid，通常通过网页授权登录或自定义url跳转参数获得。
   * @param accessToken
   */
  public static async consumeOnline(code: string, openid: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.consumeCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        code: code,
        openid: openid
      })
    )
  }

  private static decryptCodeUrl: string = 'https://api.weixin.qq.com/card/code/decrypt?access_token=%s'
  /**
   * Code解码接口
   * @param encryptCode 经过加密的Code码
   * @param accessToken
   */
  public static async decryptCode(encryptCode: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.decryptCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        encrypt_code: encryptCode
      })
    )
  }

  private static setDepositUrl: string = 'http://api.weixin.qq.com/card/code/deposit?access_token=%s'
  /**
   * 导入自定义code
   * @param cardId  需要进行导入code的卡券ID
   * @param codeList 需导入微信卡券后台的自定义code，上限为100个。
   * @param accessToken
   */
  public static async setDeposit(cardId: string, codeList: [], accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.setDepositUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        code: codeList
      })
    )
  }

  private static getDepositCountUrl: string = 'http://api.weixin.qq.com/card/code/getdepositcount?access_token=%s'
  /**
   * 查询导入code数目接口
   * @param cardId
   * @param accessToken
   */
  public static async getDepositCount(cardId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getDepositCountUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId
      })
    )
  }

  private static checkCodeUrl: string = 'http://api.weixin.qq.com/card/code/checkcode?access_token=%s'
  /**
   * 核查code接口
   * @param cardId 进行导入code的卡券ID
   * @param codeList 已经微信卡券后台的自定义code，上限为100个
   * @param accessToken
   */
  public static async checkCode(cardId: string, codeList: [], accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.checkCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        code: codeList
      })
    )
  }

  private static getUserCardListUrl: string = 'https://api.weixin.qq.com/card/user/getcardlist?access_token=%s'
  /**
   * 获取用户已领取卡券接口
   * @param openid 需要查询的用户openid
   * @param cardId 卡券ID 不填写时默认查询当前appid下的卡券
   * @param accessToken
   */
  public static async getUserCardList(openid: string, cardId?: string, accessToken?: AccessToken) {
    let map = new Map()
    map.set('openid', openid)
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getUserCardListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  private static getCardUrl: string = 'https://api.weixin.qq.com/card/get?access_token=%s'
  /**
   * 查看卡券详情
   * @param cardId 卡券ID
   * @param accessToken
   */
  public static async getCard(cardId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getCardUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId
      })
    )
  }

  private static getBatchUrl: string = 'https://api.weixin.qq.com/card/batchget?access_token=%s'
  /**
   * 批量查询卡券列表
   * @param offset 查询卡列表的起始偏移量，从0开始，即offset: 5是指从从列表里的第六个开始读取
   * @param count 需要查询的卡片的数量（数量最大50）
   * @param statusList  支持开发者拉出指定状态的卡券列表
   * @param accessToken
   *
   * “CARD_STATUS_NOT_VERIFY”, 待审核 ；
   * “CARD_STATUS_VERIFY_FAIL”, 审核失败；
   * “CARD_STATUS_VERIFY_OK”， 通过审核；
   * “CARD_STATUS_DELETE”， 卡券被商户删除；
   * “CARD_STATUS_DISPATCH”，在公众平台投放过的卡券
   */
  public static async getBatch(offset: number, count: number, statusList?: [], accessToken?: AccessToken) {
    let map = new Map()
    map.set('offset', offset)
    map.set('count', count)
    if (statusList) {
      map.set('status_list', statusList)
    }
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getBatchUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  private static updateUrl: string = 'https://api.weixin.qq.com/card/update?access_token=%s'
  /**
   * 更改卡券信息接口
   * @param jsonStr
   * @param accessToken
   */
  public static async update(jsonStr: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, jsonStr)
  }

  private static modifyStockUrl: string = 'https://api.weixin.qq.com/card/modifystock?access_token=%s'
  /**
   * 修改库存接口
   * @param cardId 卡券ID
   * @param increase 增加多少库存，支持不填或填0
   * @param reduce 减少多少库存，可以不填或填0
   * @param accessToken
   */
  public static async modifyStock(cardId: string, increase: number = 0, reduce: number = 0, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.modifyStockUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId,
        increase_stock_value: increase,
        reduce_stock_value: reduce
      })
    )
  }

  private static updateCodeUrl: string = 'https://api.weixin.qq.com/card/code/update?access_token='
  /**
   * 更改Code接口
   * @param code 需变更的Code码
   * @param newCode 变更后的有效Code码
   * @param cardId 卡券ID。自定义Code码卡券为必填
   * @param accessToken
   */
  public static async updateCode(code: string, newCode: string, cardId?: string, accessToken?: AccessToken) {
    let map = new Map()
    map.set('code', code)
    map.set('new_code', newCode)
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.updateCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  private static deleteUrl: string = 'https://api.weixin.qq.com/card/delete?access_token=%s'
  /**
   * 删除卡券接口
   * @param cardId 卡券ID
   * @param accessToken
   */
  public static async delete(cardId: string, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.deleteUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        card_id: cardId
      })
    )
  }

  private static unavailableUrl: string = 'https://api.weixin.qq.com/card/code/unavailable?access_token=%s'
  /**
   * 设置卡券失效接口
   * @param cardId 卡券ID
   * @param code 设置失效的Code码
   * @param reason 失效理由
   * @param accessToken
   */
  public static async unavailable(cardId?: string, code?: string, reason?: string, accessToken?: AccessToken) {
    if (!code && !cardId) {
      throw new Error('code 与 card_id 不能同时为空')
    }
    let map = new Map()
    if (code) map.set('code', code)
    if (cardId) map.set('card_id', cardId)
    if (reason) map.set('reason', reason)

    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.unavailableUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }

  private static getCardBizUinInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardbizuininfo?access_token=%s'
  /**
   * 拉取卡券概况数据接口
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据 、1是API创建的卡券数据
   * @param accessToken
   */
  public static async getCardBizUinInfo(beginDate: string, endDate: string, condSource: number = 0, accessToken?: AccessToken) {
    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getCardBizUinInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        begin_date: beginDate,
        end_date: endDate,
        cond_source: condSource
      })
    )
  }

  private static getFreeCardInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardcardinfo?access_token=%s'
  /**
   * 获取免费券数据接口
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
   * @param cardId 卡券ID 填写后，指定拉出该卡券的相关数据
   * @param accessToken
   */
  public static async getFreeCardInfo(beginDate: string, endDate: string, condSource: number = 0, cardId?: string, accessToken?: AccessToken) {
    let map = new Map()
    map.set('begin_date', beginDate)
    map.set('end_date', endDate)
    map.set('cond_source', condSource)
    if (cardId) map.set('card_id', cardId)

    if (!accessToken) {
      accessToken = await AccessTokenApi.getAccessToken()
    }
    let url = util.format(this.getFreeCardInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(url, JSON.stringify(map))
  }
}
