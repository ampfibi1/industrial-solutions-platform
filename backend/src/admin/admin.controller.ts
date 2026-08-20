import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from 'express';
import { AdminService } from "./admin.service";
import { AdminCat2Dto } from "./task2/adminCat2.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CreateCategoryDto } from "./create-category.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../db/enums/role.enum';
import { AssignOversightDto } from "./dto/assign-oversight.dto";

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


    @Post('categories')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createCategory(@Body() dto: CreateCategoryDto) {
      return this.adminService.createCategory(dto);
    }

    @Get('categories')
    findAllCategories() {
      return this.adminService.findAllCategories();
    }


    @Post('products')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createProduct(@Body() dto: CreateProductDto, @Req() req: Request & { user?: any }) {
      const createdById = req.user?.id;
      return this.adminService.createProduct(dto, createdById);
    }

    @Get('products')
    findAllProducts() {
      return this.adminService.findAllProducts();
    }

    @Get('products/:id')
    findOneProduct(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.findOneProduct(id);
    }

    @Put('products/:id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
      return this.adminService.updateProduct(id, dto);
    }

    @Delete('products/:id')
    removeProduct(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.removeProduct(id);
    }  

    @Post('oversight')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    assignOversight(@Body() dto: AssignOversightDto) {
      return this.adminService.assignOversight(dto);
    }

    @Get('oversight/company/:companyId')
    findOversightByCompany(@Param('companyId', ParseIntPipe) companyId: number) {
      return this.adminService.findOversightByCompany(companyId);
    }

    @Delete('oversight/:id')
    removeOversight(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.removeOversight(id);
    }

    @Get("findUserByComp/:companyId")
    findByCompany(@Param('companyId', ParseIntPipe) companyId: number){
      return this.adminService.findByCompany(companyId);
    }
} 