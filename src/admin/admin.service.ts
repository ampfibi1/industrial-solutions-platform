import { Injectable, Body } from "@nestjs/common";
import { AdminDto } from "./admin.dto";
import { AdminCat2Dto } from "./adminCat2.dto";

@Injectable()
export class AdminService{
    getHello() : string{
        return "Test";
    }
    getAge() : Number{
        return 50 ; 
    }
    createAdmin(data:AdminDto):string{
        return `User created: ${data.name}`;
    }
    createAdminCat2(@Body() data:AdminCat2Dto){
        return { message: 'Created',data,};
    }
}