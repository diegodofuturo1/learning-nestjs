import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule)
  
  await app
    .useGlobalPipes(new ValidationPipe())
    .listen(3000);
}
bootstrap();
