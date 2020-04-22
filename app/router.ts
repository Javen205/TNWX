import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/sayHi', controller.home.sayHi);
  router.get('/send', controller.home.send);
};
