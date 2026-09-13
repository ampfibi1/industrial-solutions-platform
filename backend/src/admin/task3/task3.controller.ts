import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Task3Service } from "./task3.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserInfo } from "./entities/userinfo.entity";

@Controller('task3')
export class Task3Controller{
    constructor(private readonly task3Service:Task3Service){}

    @Post('createUser')
    create(@Body() crtUserDto:CreateUserDto):Promise<UserInfo>{
        return this.task3Service.createUser(crtUserDto);
    }

    @Get('updateCountry/:id')
    updateCounty(@Param("id",ParseIntPipe) id:number,@Body("country") country:string):Promise<UserInfo|null>{
        return this.task3Service.updateCounty(id,country);
    }
    
    @Get('findUByJDate/:date')
    findByJDate(@Param('date') date:string):Promise<UserInfo[]>{
        return this.task3Service.findByJDate(date);
    }

    @Get('findUnknownCounty')
    findByDefaultCounty():Promise<UserInfo[]>{
        return this.task3Service.findByDefaultCounty()
    }
}