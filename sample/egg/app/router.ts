import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/msg', controller.mpMsg.get)
  router.post('/msg', controller.mpMsg.post)
  router.get('/qymsg', controller.qyMsg.get)
  router.post('/qymsg', controller.qyMsg.post)
}
