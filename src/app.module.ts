import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Admin } from './admin/admin.entity';

@Module({
  imports: [
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test',
      entities: [Admin],
      synchronize: true,
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
