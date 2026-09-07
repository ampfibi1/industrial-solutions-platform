import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SalesModule } from './sales/sales.module';

// Entities
import { User } from './common/entities/user.entity';
import { Company } from './common/entities/company.entity';
import { Category } from './common/entities/category.entity';
import { Order } from './sales/entities/order.entity';
import { OrderItem } from './sales/entities/order-item.entity';
import { SalesAssignment } from './sales/entities/sales-assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'RaTuL@506',        // ← change this
      database: 'student_engineering',
      entities: [
        User,
        Company,
        Category,
        Order,
        OrderItem,
        SalesAssignment,
      ],
      synchronize: true,
    }),
    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
>>>>>>> origin/Mahamudul/Sales_executive
