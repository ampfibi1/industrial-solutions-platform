import { Injectable } from '@nestjs/common';
import { CustomerDto } from './Customer.dto';

@Injectable()
export class CustomerService{

  createCustomer(id: number, name: string): object {
    return {
      message: 'Using post routing customer created successfully',
      id : 3 ,
      name : 'Mahin',
    };
  }

 create(dto: CustomerDto) {

    // Business logic goes here

    return {
      message: 'Customer Created Successfully',
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

}
