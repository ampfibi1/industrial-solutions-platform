import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';

// All Entities 
import { User } from './db/user.entity';
import { Company } from './db/company.entity';
import { Category } from './db/category.entity';
import { Order } from './db/order.entity';
import { OrderItem } from './db/order-item.entity';
import { SalesAssignment } from './db/sales-assignment.entity';
import { AdminCompanyOversight } from './db/admin-company-oversight.entity';
import { Product } from './db/product.entity';
import { EngineerProductExpertise } from './db/engineer-product-expertise.entity';
import { ServiceRequest } from './db/service-request.entity';
import { WishlistItem } from './db/wishlist-item.entity';
import { CustomerAddress } from './db/customer-address.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Company,
        Category,
        Order,
        OrderItem,
        SalesAssignment,
        AdminCompanyOversight,
        Product,
        EngineerProductExpertise,
        ServiceRequest,
        WishlistItem,
        CustomerAddress,
      ],
      synchronize: true,
    }),

    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
