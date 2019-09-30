import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(logger);
  app.use(helmet());
  app.use(csurf());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));

  const options = new DocumentBuilder()
    .setTitle('Paperin API documentation')
    .setVersion('1.0')
    .setBasePath('api')
    .build();

  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, doc);

  await app.listen(3000);
}

bootstrap();
