import {Controller , Post, Body, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {CustomerService} from './Customer.service';
import { CustomerDto } from './Customer.dto';


@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}



    
   
/* also respond to GET /customer (root) so callers can GET /customer without the extra path
  
    @Get('getCustomer')
    getCustomer(): object {
        return this.customerService.getCustomer();
    }
    
    @Get('getcustomer/:id/getname/:name')
    getCustomerByIdAndName(@Param('id') id: number, @Param('name') name: string): object 
    {
        return this.customerService.getCustomerByIdAndName(id, name);
    }

    @Get('getproductid')
    getCustomerByIdAndNameQuery(@Query('productid') productid: number, @Query('name') name: string): object
     {

    return this.customerService.getCustomerByIdAndNameQuery(productid, name);


}
 
 @Post()
 @UsePipes(new ValidationPipe())
    create(@Body() data: CustomerDto){
       
        return this.customerService.create(data);
    }



 @Post('create')
    createCustomer(@Body('id') id: number,
                   @Body('name')name: string,):object{
        return this.customerService.createCustomer(id, name );
    }
*/



@Post()
createUser(@Body() dto: CustomerDto) {
    return this.customerService.createUser(dto);
}   


@Post(':id/status')
changeStatus(
  @Param('id') id: number,
  @Body() dto: CustomerDto,
) {
  return this.customerService.changeStatus(id, dto.status);
}


@Get('inactive')
getInactiveUsers() {
  return this.customerService.getInactiveUsers();
}

@Get('older')
getOlderUsers() {
  return this.customerService.getuserolderthan();
}
    

}