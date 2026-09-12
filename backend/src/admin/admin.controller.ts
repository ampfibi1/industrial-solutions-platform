import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Request } from 'express';
import { AdminService } from "./admin.service";
import { AdminCat2Dto } from "./task2/adminCat2.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../db/enums/role.enum';
import { AssignOversightDto } from "./dto/assign-oversight.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

import {FileInterceptor} from "@nestjs/platform-express";
import { UploadedFile, UseInterceptors } from "@nestjs/common";
import express from "express";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
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

    //-----------------Companie---------------------------------------
    @Post('createCompanie')
    async createCompany(@Body() dto: CreateCompanyDto) {
      return this.adminService.createCompany(dto);
    }
    @Get("companies")
    findAllCompanies() {
      return this.adminService.findAllCompanies();
    }
    
    @Get('company/:id') 
    findOne( @Param('id', ParseIntPipe) id: number, ) { 
      return this.adminService.findOne(id); 
    }

    @Patch('company/:id') 
    update( @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto, ) { 
      return this.adminService.update(id, dto); 
    } 
    
    @Delete('company/:id') 
    remove( @Param('id', ParseIntPipe) id: number, ) { 
      return this.adminService.remove(id); 
    }

    @Get("findUserByComp/:companyId")
    findByCompany(@Param('companyId', ParseIntPipe) companyId: number){
      return this.adminService.findByCompany(companyId);
    }

    //-----------------User---------------------------------------
    @Post("createUser")
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto:CreateUserDto){
        return this.adminService.createUser(dto);
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

    //-----------------Category---------------------------------------
    @Post('categories')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createCategory(@Body() dto: CreateCategoryDto) {
      return this.adminService.createCategory(dto);
    }

    @Get('categories')
    findAllCategories() {
      return this.adminService.findAllCategories();
    }

    @Delete("categories/:id")
    deleteCategory(@Param("id", ParseIntPipe) id: number) {
      return this.adminService.deleteCategory(id);
    }

    //-----------------Products---------------------------------------
    @Post("products")
    @UseInterceptors(FileInterceptor("picture"))
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    createProduct(@Body() dto: CreateProductDto,@UploadedFile() picture: Express.Multer.File) {
      const createdById = 1;
      return this.adminService.createProduct(dto, createdById, picture);
    }

    @Get('products')
    findAllProducts() {
      return this.adminService.findAllProducts();
    }

    @Get('products/:id')
    findOneProduct(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.findOneProduct(id);
    }

    @Put("products/:id")
    @UseInterceptors(FileInterceptor("picture"))
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    updateProduct(@Param("id", ParseIntPipe) id: number,@Body() dto: UpdateProductDto,@UploadedFile() picture: Express.Multer.File,) {
      return this.adminService.updateProduct(id, dto, picture);
    }

    @Delete('products/:id')
    removeProduct(@Param('id', ParseIntPipe) id: number) {
      return this.adminService.removeProduct(id);
    }  

    @Get("products/:id/picture")
async getProductPicture(
  @Param("id", ParseIntPipe) id: number,
  @Res() res: express.Response,
) {
  const product = await this.adminService.findOneProduct(id);

  if (!product.picture) {
    throw new NotFoundException("Product picture not found");
  }

  res.set({
    "Content-Type": product.pictureMimeType ?? "image/jpeg",
    "Content-Length": product.picture.length,
  });

  res.end(product.picture);
}

    //-----------------Oversight---------------------------------------
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
} 