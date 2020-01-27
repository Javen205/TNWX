import * as util from 'util'
import { AccessTokenApi, AccessToken } from '@tnwx/accesstoken'
import { HttpKit } from '@tnwx/kits'

/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 图像处理相关 API
 */

export class ImgApi {
  /**
   * 图像处理
   * @param type 接口URL
   * @param imgUrl 图片的URL
   */
  public static async imgProcessingByUrl(type: ImgProcessingType, imgUrl: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(type, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url.concat('&img_url=').concat(imgUrl))
  }

  /**
   * 图像处理
   * @param type 接口URL
   * @param filePath 图片文件路径
   */
  public static async imgProcessingByFile(type: ImgProcessingType, filePath: string) {
    let accessToken = await AccessTokenApi.getAccessToken()
    let url = util.format(type, (<AccessToken>accessToken).getAccessToken)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }
}

export enum ImgProcessingType {
  // 图片智能裁剪
  AICROP = 'https://api.weixin.qq.com/cv/img/aicrop?access_token=%s',
  // 条码/二维码识别
  QRCODE = 'https://api.weixin.qq.com/cv/img/qrcode?access_token=%s',
  // 图片高清化
  SUPERRESOLUTION = 'https://api.weixin.qq.com/cv/img/superresolution?access_token=%s'
}
