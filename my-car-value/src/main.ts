import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

const cookie = require('cookie-session')

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.use(cookie({ keys: ['asdf'] }))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  
  await app.listen(3000);
}

bootstrap();
