import * as util from 'util'
import { HttpKit } from '@tnwx/kits'
import { AccessToken, OpenCpAccessTokenApi, AccessTokenType } from '@tnwx/accesstoken'
/**
 * @author Javen
 * @copyright javendev@126.com
 * @description 企业微信开发平台 API
 */
export class OpenCpApi {
  private static getPreAuthCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_pre_auth_code?suite_access_token=%s'

  /**
   * 获取预授权码
   */
  public static async getPreAuthCode() {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getPreAuthCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static setSessionInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/set_session_info?suite_access_token=%s'

  /**
   * 设置授权配置
   * @param preAuthCode 预授权码
   * @param authType 授权类型：0 正式授权， 1 测试授权。 默认值为0。注意，请确保应用在正式发布后的授权类型为“正式授权”
   * @param appId 允许进行授权的应用id，如1、2、3，不填或者填空数组都表示允许授权套件内所有应用（仅旧的多应用套件可传此参数，新开发者可忽略）
   */
  public static async setSessionInfo(preAuthCode: string, authType = 0, appId?: Array<number>) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.setSessionInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        pre_auth_code: preAuthCode,
        session_info: {
          appid: appId,
          auth_type: authType
        }
      })
    )
  }

  private static getPermanentCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_permanent_code?suite_access_token=%s'

  /**
   * 获取企业永久授权码
   * @param authCode 临时授权码
   */
  public static async getPermanentCode(authCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getPermanentCodeUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_code: authCode
      })
    )
  }

  private static getAuthInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_auth_info?suite_access_token=%s'

  /**
   * 获取企业授权信息
   * @param authCorpId 授权方corpid
   * @param permanentCode 永久授权码
   */
  public static async getAuthInfo(authCorpId: string, permanentCode: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getAuthInfoUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        permanent_code: permanentCode
      })
    )
  }

  private static getAdminListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_admin_list?suite_access_token=%s'

  /**
   * 获取应用的管理员列表
   * @param authCorpId 授权方corpid
   * @param agentId 授权方安装的应用agentid
   */
  public static async getAdminList(authCorpId: string, agentId: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.SUITE_TOKEN)
    let url = util.format(this.getAdminListUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        agentid: agentId
      })
    )
  }

  private static searchContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/search?provider_access_token=%s'

  /**
   * 通讯录单个搜索
   * @param authCorpId 授权方corpid
   * @param queryWord 搜索关键词
   * @param queryType 查询类型 1：查询用户，返回用户userid列表 2：查询部门，返回部门id列表。 不填该字段或者填0代表同时查询部门跟用户
   * @param agentId 应用id
   * @param offset 查询的偏移量
   * @param limit 查询返回的最大数量，最多为50
   */
  public static async searchContact(authCorpId: string, queryWord: string, queryType: 0, agentId?: string, offset?: number, limit?: number) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.searchContactUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        query_word: queryWord,
        query_type: queryType,
        agentid: agentId,
        offset: offset,
        limit: limit
      })
    )
  }

  private static batchSearchContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/batchsearch?provider_access_token=%s'

  /**
   * 通讯录批量搜索
   * @param authCorpId 授权方corpid
   * @param queryRequestList 索请求列表,每次搜索列表数量不超过50
   * @param agentId 应用id
   */
  public static async batchSearchContact(
    authCorpId: string,
    queryRequestList: Array<{
      query_word: string
      query_type?: number
      offset?: number
      limit?: number
    }>,
    agentId?: string
  ) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.batchSearchContactUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        query_request_list: queryRequestList,
        agentid: agentId
      })
    )
  }

  private static uploadUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/media/upload?provider_access_token=%s&type=%s'

  /**
   * 上传临时素材
   * @param mediaType 媒体文件类型
   * @param filePath 文件路径
   * @param accessToken AccessToken
   */
  public static async upload(mediaType: string, filePath: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken()
    let url = util.format(this.uploadUrl, accessToken.getAccessToken, mediaType)
    return HttpKit.getHttpDelegate.upload(url, filePath)
  }

  private static contactIdTranslateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/id_translate?provider_access_token=%s'

  /**
   * 异步通讯录id转译
   * @param authCorpId 授权方corpid
   * @param mediaIdList 需要转译的文件的media_id列表
   * @param outputFileName 转译完打包的文件名，不需带后缀
   */
  public static async contactIdTranslate(authCorpId: string, mediaIdList: Array<string>, outputFileName?: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.contactIdTranslateUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        media_id_list: mediaIdList,
        output_file_name: outputFileName
      })
    )
  }

  private static getBatchResultUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/batch/getresult?provider_access_token=%s&jobid=%s'

  /**
   * 获取异步任务结果
   * @param jobId 异步任务id
   */
  public static async getBatchResult(jobId: string) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.getBatchResultUrl, accessToken.getAccessToken, jobId)
    return HttpKit.getHttpDelegate.httpGet(url)
  }

  private static sortContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/sort?provider_access_token=%s'

  /**
   * 通讯录userid排序
   * @param authCorpId 授权方corpid
   * @param userIdList 要排序的userid列表，最多支持1000个
   * @param sortType 排序方式 0：根据姓名拼音升序排列，返回用户userid列表 1：根据姓名拼音降排列，返回用户userid列表
   */
  public static async sortContact(authCorpId: string, userIdList: Array<string>, sortType?: number) {
    let accessToken: AccessToken = await OpenCpAccessTokenApi.getAccessToken(AccessTokenType.PROVIDER_TOKEN)
    let url = util.format(this.sortContactUrl, accessToken.getAccessToken)
    return HttpKit.getHttpDelegate.httpPost(
      url,
      JSON.stringify({
        auth_corpid: authCorpId,
        useridlist: userIdList,
        sort_type: sortType
      })
    )
  }
}
