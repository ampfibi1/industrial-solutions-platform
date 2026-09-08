import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';

// Entities
import { User } from './db/user.entity';
import { Company } from './db/company.entity';
import { Category } from './db/category.entity';
import { Order } from './db/order.entity';
import { OrderItem } from './db/order-item.entity';
import { SalesAssignment } from './db/sales-assignment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'student_engineering',
      entities: [User, Company, Category, Order, OrderItem, SalesAssignment],
      synchronize: true,
    }),
    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
