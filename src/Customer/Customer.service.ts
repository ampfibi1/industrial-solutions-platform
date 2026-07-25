import { Injectable ,Param,Body } from '@nestjs/common';
import { CustomerDto } from './Customer.dto';
import { CustomerEntity} from './Customer.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository , MoreThan } from 'typeorm';


@Injectable()
export class CustomerService{
  constructor(@InjectRepository(CustomerEntity) private customerEntity: Repository<CustomerEntity>) {}
 
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
  async createUser(dto: CustomerDto): Promise<CustomerEntity> {
    const customer = this.customerEntity.create(dto);
    return this.customerEntity.save(customer);
  }

  async getuserolderthan(): Promise <CustomerEntity[]> {
          
    return this.customerEntity.find({
        where: {
        age: MoreThan(40),
      },
    });
  }

async changeStatus(
  id: number,
  status: 'active' | 'inactive',
) {
  await this.customerEntity.update(id, { status });
 return this.customerEntity.findOne({ where: { id },select: { id: true, fullname: true,},});
 
}

async getInactiveUsers() 
{
  return this.customerEntity .find({where: {status: 'inactive',}, });

}

  

async getUsersOlderThan40() {

  return this.customerEntity.find({ where: {age: MoreThan(40),},});

}



}