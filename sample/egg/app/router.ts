import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 中间件
  const jssdk = app.middleware.jssdk(app)
  const qyjssdk = app.middleware.qyjssdk(app)

  router.get('/', controller.home.index)
  router.get('/npm', controller.home.npm)
  router.get('/msg', controller.mpMsg.get)
  router.post('/msg', controller.mpMsg.post)
  router.get('/qymsg', controller.qyMsg.get)
  router.post('/qymsg', controller.qyMsg.post)
  router.get('/jssdk', jssdk, controller.jssdk.index)
  router.get('/qyjssdk', qyjssdk, controller.qyjssdk.index)
}
