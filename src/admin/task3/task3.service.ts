import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserInfo } from "./entities/userinfo.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class Task3Service{
    constructor(@InjectRepository(UserInfo) private readonly userRepo:Repository<UserInfo>){}

    async createUser(createUser:CreateUserDto):Promise<CreateUserDto>{
        return await this.userRepo.save(createUser);
    }

    async updateCounty(id:number,country:string):Promise<UserInfo|null>{
        await this.userRepo.update(id,{country});
        return await this.userRepo.findOne({where:{id:id}});
    }

    
}