import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminCat2Dto } from "./task2/adminCat2.dto";

@Controller("admin")
export class AdminController{
    constructor (private readonly adminService: AdminService) {}
    @Get("tamjid")
    getHello(): string {
        return this.adminService.getHello();
    }

    @Post("cat2")
    @UsePipes(new ValidationPipe())
    createAdminCat2(@Body() data:AdminCat2Dto){
        return this.adminService.createAdminCat2(data);
    }
}