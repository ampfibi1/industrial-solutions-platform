import { Module } from "@nestjs/common";
import { Task3Controller } from "./task3.controller";
import { Task3Service } from "./task3.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfo } from "./entities/userinfo.entity";

@Module({
    imports : [
        TypeOrmModule.forFeature([UserInfo]),
    ],
    controllers:[Task3Controller],
    providers: [Task3Service],
})
export class Task3Module{}