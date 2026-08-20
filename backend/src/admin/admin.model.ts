import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/db/category.entity";
import { Company } from "src/db/company.entity";
import { User } from "src/db/user.entity";
import { AdminCompanyOversight } from "src/db/admin-company-oversight.entity";
import { Product } from "src/db/product.entity";

@Module(
{
    imports:[
        TypeOrmModule.forFeature([Category,Company,User, AdminCompanyOversight, Product]),
    ],
    controllers:[AdminController],
    providers:[AdminService],
}
)
export class AdminModule{}