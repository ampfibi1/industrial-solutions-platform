import { Body, Controller, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { Task3Service } from "./task3.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('task3')
export class Task3Controller{
    constructor(private readonly task3Service:Task3Service){}

    @Post('createUser')
    create(@Body() crtUserDto:CreateUserDto){
        return this.task3Service.createUser(crtUserDto);
    }

    @Patch('updateCountry/:id')
    updateCounty(@Param("id",ParseIntPipe) id:number,@Body("country") country:string){
        return this.task3Service.updateCounty(id,country);
    }
}