import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { SalesAssignment } from './entities/sales-assignment.entity';
import { User } from '../common/entities/user.entity';
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