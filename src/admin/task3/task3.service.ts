import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "./entities/userinfo.entity";
import { Between, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class Task3Service{
    constructor(@InjectRepository(UserInfo) private readonly userRepo:Repository<UserInfo>){}

    async createUser(createUser:CreateUserDto):Promise<UserInfo>{
        return await this.userRepo.save(createUser);
    }

    async updateCounty(id:number,country:string):Promise<UserInfo|null>{
        await this.userRepo.update(id,{country});
        return await this.userRepo.findOne({where:{id:id}});
    }

    async findByJDate(date:string):Promise<UserInfo[]>{
        return await this.userRepo.find({where:
            {joiningDate:Between
                (new Date(`${date}T00:00:00`),new Date(`${date}T23:59:59.999`))}});
    }

    async findByDefaultCounty():Promise<UserInfo[]>{
        return await this.userRepo.find({where:{country:'Unknown'}});
    }
}