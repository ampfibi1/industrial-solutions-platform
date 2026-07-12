import { Module } from '@nestjs/common';
import { CustomerController } from './Customer.controller';
import { CustomerService } from './Customer.service';
import { CustomerRepository } from './Customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerRepository])],
  controllers: [CustomerController],
  providers: [CustomerService],
}
)
export class CustomerModule {}