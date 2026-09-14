import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localhost:5000',credentials: true});//CORS
  app.use(cookieParser());
  const port = process.env.PORT ?? process.env.APP_PORT ?? 3000;
  console.log("Server is running on port", port);
  await app.listen(port);
}
bootstrap();
