import { Injectable, Body } from "@nestjs/common";
import { AdminCat2Dto } from "./task2/adminCat2.dto";

@Injectable()
export class AdminService{
    getHello() : string{
        return "Test";
    }
    
    createAdminCat2(@Body() data:AdminCat2Dto){
        return { message: 'Created',data,};
    }
}