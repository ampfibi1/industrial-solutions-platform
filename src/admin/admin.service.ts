import { Injectable, Body, ConflictException, NotFoundException } from "@nestjs/common";
import { AdminCat2Dto } from "./task2/adminCat2.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/common/user.entity";
import { Any, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Company } from "src/common/company.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Injectable()
export class AdminService{
    
    constructor(
        @InjectRepository(User) private readonly userRepo:Repository<User>,
        @InjectRepository(Company) private readonly companyRepo:Repository<Company>,
        private readonly mailerService: MailerService,
    ){}

    //practices service
    getHello() : string{
        return "Test";
    }

    async testMail() {
      await this.mailerService.sendMail({
        to: 'abdullahtamjid189@gmail.com',
        subject: 'Test',
        text: 'Hello',
      });
      return 'Email sent';
    }
    
    createAdminCat2(@Body() data:AdminCat2Dto){
        return { message: 'Created',data,};
    }

    //project content
    async createUser(dto:CreateUserDto) : Promise<User>{
        const existing = await this.userRepo.findOne({where:{ email:dto.email}});

        if(existing) throw new ConflictException("This email user exists");

        let company:Company|undefined=undefined;//what does mean by this line ? 
        if (dto.companyId) {
          const found = await this.companyRepo.findOne({ where: { id: dto.companyId } });
          if (!found) {
            throw new NotFoundException('Company with id'+dto.companyId+' not found');
          }
          company = found;
        }

        const salt = await bcrypt.genSalt();
        const hashPass =await bcrypt.hash(dto.password, salt);

        const user =await this.userRepo.create({
            name: dto.name, email:dto.email, password:hashPass,
            phone:dto.phone, role:dto.role,company
        });
        const saved = await this.userRepo.save(user);

        try{
            await this.mailerService.sendMail({
                to: saved.email,
                subject: "welcome to the platform",
                text: `Hi ${saved.name}, your account has been created with role ${saved.role}.`
            });
        }catch(err){console.error('Failed to send welcome email:', err);}

        return saved;
    }

    async createCompany(dto: CreateCompanyDto): Promise<Company> {
      const existingGst = await this.companyRepo.findOne({where: { gstNumber: dto.gstNumber }});
      if (existingGst) throw new ConflictException(`Company with GST number "${dto.gstNumber}" already exists`);

      const company = this.companyRepo.create(dto);
      return this.companyRepo.save(company);
    }

    async findAllUser(): Promise<User[]>{
        return this.userRepo.find({relations:{company:true}});
    }

    async findOneUser(id: number): Promise<User> {
        const user = await this.userRepo.findOne({where: { id },relations: {company:true},});
        if (!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOneUser(id);

        if (dto.companyId !== undefined) {
          const company = await this.companyRepo.findOne({ where: { id: dto.companyId } });
          if (!company) throw new NotFoundException(`Company with id ${dto.companyId} not found`);
          user.company = company;
        }

        Object.assign(user, {
          name: dto.name ?? user.name, email: dto.email ?? user.email,
          phone: dto.phone ?? user.phone, role: dto.role ?? user.role,
        });

        return this.userRepo.save(user);
    }   

    async removeUser(id: number): Promise<{ deleted: boolean }> {
        const result = await this.userRepo.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        return { deleted: true };
    }
}