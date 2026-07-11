import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { Category } from './common/category.entity';
import { Company } from './common/company.entity';
import { User } from './common/user.entity';
import { AdminCompanyOversight } from './admin/entities/admin-company-oversight.entity';
import { Product } from './admin/entities/product.entity';

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
      entities: [Admin,Category,Company,User,AdminCompanyOversight,Product],
      synchronize: true,
    }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
