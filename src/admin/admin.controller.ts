import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminCat2Dto } from "./task2/adminCat2.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Controller("admin")
export class AdminController{
    constructor (private readonly adminService: AdminService) {}
    //practice route
    @Get("tamjid")
    getHello(): string {
        return this.adminService.getHello();
    }

    @Post("cat2")
    @UsePipes(new ValidationPipe())
    createAdminCat2(@Body() data:AdminCat2Dto){
        return this.adminService.createAdminCat2(data);
    }

    //project controller routes

    @Get('mail')
    testMail(){return this.adminService.testMail();}

    @Post("createUser")
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto:CreateUserDto){
        return this.adminService.createUser(dto);
    }

    @Post('createCompanie')
    async createCompany(@Body() dto: CreateCompanyDto) {
      return this.adminService.createCompany(dto);
    }

    @Get('users')
    findAllUsers() {
      return this.adminService.findAllUser();
    }

    @Get('users/:id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.findOneUser(id);
    }

    @Patch('users/:id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
      return this.adminService.updateUser(id, dto);
    }

    @Delete('users/:id')
    removeUser(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.removeUser(id);
    }
}