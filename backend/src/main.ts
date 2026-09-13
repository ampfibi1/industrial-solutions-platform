import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
=======
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: 'http://localhost:5000',credentials: true});//CORS
  app.use(cookieParser());
>>>>>>> tamjid/admin
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
