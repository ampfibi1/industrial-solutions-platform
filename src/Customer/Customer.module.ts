import { Module } from '@nestjs/common';
import { CustomerController } from './Customer.controller';
import { CustomerService } from './Customer.service';
import { CustomerEntity } from './Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [CustomerService],
}
)
export class CustomerModule {}