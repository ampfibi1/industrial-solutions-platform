import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Order } from '../db/order.entity';
import { OrderItem } from '../db/order-item.entity';
import { SalesAssignment } from '../db/sales-assignment.entity';
import { User } from '../db/user.entity';
import { MailModule } from '../mailer/mail.module';  

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, SalesAssignment, User]),
    MailModule,  
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}