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

@Module({
  imports: [
    AdminModule,Task3Module,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'task3',
      entities: [UserInfo],
      synchronize: true,
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
