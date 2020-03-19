import { Controller } from 'egg'
import { OpenComponentAccessTokenApi, OpenMpApi, OpenAuthorizerAccessTokenApi, AccessToken, ApiConfigKit, ICache, AccessTokenType, CallbackApi } from 'tnwx'

export default class OpenMpApiController extends Controller {
  /**
   * 授权回调
   */
  public async authRedirect() {
    const { ctx } = this
    let appId: string = ctx.app.config.openMpConfig.appId

    let authCode: string = ctx.query.auth_code
    let expires: string = ctx.query.expires_in
    console.log(`authCode:${authCode} expiresIn:${expires}`)

    // 使用授权码获取授权信息
    let queryAuth = await OpenMpApi.queryAuth(appId, authCode)
    let authorizationInfo = queryAuth.authorization_info
    console.log('queryAuth.authorization_info:')
    console.log(authorizationInfo)

    // 授权方 appid
    let authorizerAppId = authorizationInfo.authorizer_appid
    let authorizerAccessToken = authorizationInfo.authorizer_access_token
    let expiresIn = authorizationInfo.expires_in
    let authorizerRefreshToken = authorizationInfo.authorizer_refresh_token

    // 设置缓存
    let cache: ICache = ApiConfigKit.getCache
    let accessToken: AccessToken = new AccessToken(
      JSON.stringify({
        authorizer_access_token: authorizerAccessToken,
        expires_in: expiresIn,
        authorizer_refresh_token: authorizerRefreshToken
      }),
      AccessTokenType.AUTHORIZER_TOKEN
    )
    cache.set(appId.concat('_').concat(authorizerAppId), accessToken.getCacheJson)
    // 演示从缓存中获取 authorizerAccessToken
    let authorizerAccessTokenCache: AccessToken = await OpenAuthorizerAccessTokenApi.getAccessToken(authorizerAppId)
    if (authorizerAccessTokenCache) {
      console.log(`缓存中的 authorizerAccessToken: ${authorizerAccessTokenCache.getAccessToken}`)
    } else {
      console.log(`缓存中暂无 authorizerAccessToken`)
    }
  }

  public async api() {
    const { ctx } = this

    let type: number = parseInt(ctx.query.type)
    let refreshToken: string = ctx.query.refreshToken
    console.log(`type:${type}`)
    console.log(`refreshToken:${refreshToken}`)
    let appId: string = ApiConfigKit.getApiConfig.getAppId

    switch (type) {
      case 1:
        // 获取微信开放平台接口的调用凭据 component_access_token
        try {
          let data: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 2:
        try {
          // 先要获取微信推送的 ticket
          // 获取预授权码
          let data = await OpenMpApi.getPreAuthCode(appId)
          let preAuthCode: string = data.pre_auth_code
          console.log(`preAuthCode:${preAuthCode}`)
          // 授权注册页面扫码授权
          let componentLoginPageUrl: string = OpenMpApi.getComponentLoginPage(appId, preAuthCode, ctx.app.config.openMpConfig.domain.concat('/openmpauth'))
          await this.ctx.render('openmp', {
            url: componentLoginPageUrl
          })
        } catch (error) {
          console.log(error)
        }
        break
      case 3:
        try {
          // 获取预授权码
          let data = await OpenMpApi.getPreAuthCode(appId)
          let preAuthCode: string = data.pre_auth_code
          console.log(`preAuthCode:${preAuthCode}`)
          // 点击移动端链接快速授权
          let bindComponentUrl: string = OpenMpApi.bindComponent(appId, preAuthCode, ctx.app.config.openMpConfig.domain.concat('/openmpauth'), 3)
          await this.ctx.render('openmp', {
            url: bindComponentUrl
          })
        } catch (error) {
          console.log(error)
        }
        break
      case 4:
        // 拉取所有已授权的帐号信息
        try {
          let data = await OpenMpApi.getAuthorizerList(appId, 0, 50)
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 5:
        // 获取授权方的帐号基本信息
        try {
          let data = await OpenMpApi.getAuthorizerInfo(appId, ctx.app.config.openMpConfig.authAppId)
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 6:
        // 获取授权方选项信息
        try {
          let data = await OpenMpApi.getAuthorizerOption(appId, ctx.app.config.openMpConfig.authAppId, 'location_report')
          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      case 7:
        // 刷新 AuthorizerAccessToken
        try {
          let componentAccessToken: AccessToken = await OpenComponentAccessTokenApi.getAccessToken()
          let authAccessToken: AccessToken = await OpenAuthorizerAccessTokenApi.getAccessToken(
            ctx.app.config.openMpConfig.authAppId, // 授权的 appId
            componentAccessToken.getAccessToken,
            refreshToken
          )
          console.log(authAccessToken)
          console.log(`获取到的 authAccessToken: ${authAccessToken.getAccessToken}`)

          ctx.body = authAccessToken
        } catch (error) {
          console.log(error)
        }
        break
      case 8:
        // 第三方平台调用接口
        try {
          let authAccessToken: AccessToken = await OpenAuthorizerAccessTokenApi.getAccessToken(ctx.app.config.openMpConfig.authAppId)
          console.log('获取到的 authAccessToken')
          console.log(authAccessToken)

          let data = await CallbackApi.getCallbackIp(authAccessToken)

          ctx.body = data
        } catch (error) {
          console.log(error)
        }
        break
      default:
        break
    }
  }

  public async jssdk() {
    let { ctx } = this
    // 第三方代公众号 JS-SDK
    await ctx.render('jssdk', ctx.request.body)
  }
}
