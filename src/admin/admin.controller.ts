import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDto } from "./admin.dto";
import { AdminCat2Dto } from "./adminCat2.dto";

@Controller("admin")
export class AdminController{
    constructor (private readonly adminService: AdminService) {}
    @Get("tamjid")
    getHello(): string {
        return this.adminService.getHello();
    }

    @Get("age")
    getAge():Number{
        return this.adminService.getAge();
    }
    @Post("createAdmin")
    createAdmin(@Body() data:AdminDto){
        return this.adminService.createAdmin(data);
    }

    @Post("cat2")
    @UsePipes(new ValidationPipe())
    createAdminCat2(@Body() data:AdminCat2Dto){
        return this.adminService.createAdminCat2(data);
    }

}