import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/common/category.entity";
import { Company } from "src/common/company.entity";
import { User } from "src/common/user.entity";
import { AdminCompanyOversight } from "./entities/admin-company-oversight.entity";
import { Product } from "./entities/product.entity";

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