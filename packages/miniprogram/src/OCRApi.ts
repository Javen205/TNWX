import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description OCR 识别相关 API
 */

export class OCRApi {
  /**
   * 银行卡 OCR 识别
   * @param OcrType 接口URL
   * @param imgUrl 要检测的图片 url
   */
  public static async ocrByUrl(OcrType: OCRType, imgUrl: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(OcrType, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url.concat('&img_url=').concat(imgUrl))
  }

  /**
   * 银行卡 OCR 识别
   * @param ocrType 接口URL
   * @param filePath 要检测的图片文件路径
   */
  public static async ocrByFile(ocrType: OCRType, filePath: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(ocrType, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }
}

export enum OCRType {
  // 银行卡 OCR 识别
  BANKCARD = 'https://api.weixin.qq.com/cv/ocr/bankcard?access_token=%s',
  // 营业执照 OCR 识别
  BUSINESSLICENSE = 'https://api.weixin.qq.com/cv/ocr/bizlicense?access_token=%s',
  // 驾驶证 OCR 识别
  DRIVERLICENSE = 'https://api.weixin.qq.com/cv/ocr/drivinglicense?access_token=%s',
  // 身份证 OCR 识别
  IDCARD = 'https://api.weixin.qq.com/cv/ocr/idcard?access_token=%s',
  // 通用印刷体 OCR 识别
  PRINTEDTEXT = 'https://api.weixin.qq.com/cv/ocr/comm?access_token=%s',
  // 行驶证 OCR 识别
  VEHICLELICENSE = 'https://api.weixin.qq.com/cv/ocr/driving?access_token=%s'
}
