import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 中间件
  const jssdk = app.middleware.jssdk(app)
  const qyjssdk = app.middleware.qyjssdk(app)

  router.get('/', controller.home.index)
  router.get('/npm', controller.home.npm)
  router.get('/msg', controller.mpmsg.get)
  router.post('/msg', controller.mpmsg.post)
  router.get('/qymsg', controller.qymsg.get)
  router.post('/qymsg', controller.qymsg.post)
  router.get('/jssdk', jssdk, controller.jssdk.index)
  router.get('/qyjssdk', qyjssdk, controller.qyjssdk.index)
  router.get('/qyapi/creatMenu', controller.qyapi.creatMenu)
  router.get('/qyapi/appChat', controller.qyapi.appChat)
  router.get('/wxpay', controller.wxpay.index)
  router.get('/opencpapi', controller.opencpapi.index)
}
