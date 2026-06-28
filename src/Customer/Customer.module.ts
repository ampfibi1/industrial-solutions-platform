import { Module } from '@nestjs/common';
import { CustomerController } from './Customer.controller';
import { CustomerService } from './Customer.service';

@Module({
    imports: [CustomerModule],
  controllers: [CustomerController],
  providers: [CustomerService],
}
)
export class CustomerModule {}