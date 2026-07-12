import { Injectable } from '@nestjs/common';
import { CustomerDto } from './Customer.dto';
import { CustomerRepository } from './Customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , MoreThan } from 'typeorm';


@Injectable()
export class CustomerService{
  constructor(@InjectRepository(CustomerRepository) private customerEntity: Repository<CustomerRepository>) {}
 
/*
 createCustomer()
 create(dto: CustomerDto) {
      return {
          message: 'All ok',
             data: dto,
          };

  }
  getCustomer(): object {
    return {
      message: 'Using get routing customer get successfully',
      id : 1 ,
      name : 'Mahin',
    };
  }
  getCustomerByIdAndName(id: number, name: string): object {
    return {
      message: 'Using param for get routing customer ',
      id : id ,
      name : name,
    };
  }
  
  getCustomerByIdAndNameQuery(productid: number, name: string): object {
    return {
      message: 'Using query routing customer get successfully',
      productid: productid,
      name: name
    };
  } 

*/
  async createUser(dto: CustomerDto): Promise<CustomerRepository> {
    const customer = this.customerEntity.create(dto);
    return this.customerEntity.save(customer);
  }

  async getuserolderthan(): Promise <CustomerRepository[]> {
          
    return this.customerEntity.find({
        where: {
        age: MoreThan(40),
      },
    });


}
}