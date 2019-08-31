import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(logger);

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
