import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './common/category.entity';
import { Company } from './common/company.entity';
import { User } from './common/user.entity';
import { AdminCompanyOversight } from './admin/entities/admin-company-oversight.entity';
import { Product } from './admin/entities/product.entity';
import { Task3Module } from './admin/task3/task3.model';
import { UserInfo } from './admin/task3/entities/userinfo.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    AdminModule,Task3Module,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Category,Company,User, AdminCompanyOversight, Product],
      synchronize: true,
    }), 
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
