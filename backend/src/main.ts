import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.APP_PORT || 4000 );
  console.log(
    `Backend running on http://localhost:${process.env.APP_PORT || 4000}`,
  );
}
bootstrap();
