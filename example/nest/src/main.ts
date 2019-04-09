import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';

import { ApiConfig, ApiConfigKit } from 'tnw';

async function bootstrap() {
  // 亦可以读取配置文件
  let apiConfig = new ApiConfig("Javen", "wx614c453e0d1dcd12", "19a02e4927d346484fc70327970457f9", false, "xxxx");
  // 支持多公众号
  ApiConfigKit.putApiConfig(apiConfig);
  ApiConfigKit.setCurrentAppId();
  // 开启开发模式,方便调试
  ApiConfigKit.devMode = true;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  console.log("__dirname:", __dirname);

  app.useStaticAssets({
    root: join(__dirname, 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, 'views'),
  });
  await app.listen(8888);
}
bootstrap();
