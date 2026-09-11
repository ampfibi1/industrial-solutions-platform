import { Injectable, Body, ConflictException, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { AdminCat2Dto } from "./task2/adminCat2.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/user.entity";
import { Any, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Company } from "src/db/company.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "src/db/category.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "src/db/product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AssignOversightDto } from "./dto/assign-oversight.dto";
import { AdminCompanyOversight } from "src/db/admin-company-oversight.entity";
import { Role } from "src/db/enums/role.enum";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import type { Multer } from "multer";

@Injectable()
export class AdminService{
    
    constructor(
        @InjectRepository(User) private readonly userRepo:Repository<User>,
        @InjectRepository(Company) private readonly companyRepo:Repository<Company>,
        @InjectRepository(Category) private readonly categoryRepo:Repository<Category>,
        @InjectRepository(Product) private readonly productRepo:Repository<Product>,
        @InjectRepository(AdminCompanyOversight) private readonly oversightRepo: Repository<AdminCompanyOversight>,
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

    async findAllCompanies(): Promise<Company[]> {
      return this.companyRepo.find();
    }

    async findOne(id: number): Promise<Company> { 
      const company = await this.companyRepo.findOne({ where: { id }, });
      if (!company) { throw new NotFoundException( `Company with id ${id} not found`, ); } 
      return company; 
    }

    async update( id: number, dto: UpdateCompanyDto, ): Promise<Company> { 
      const company = await this.findOne(id); 
      Object.assign(
        company, 
        { 
          name: dto.name ?? company.name, 
          gstNumber: dto.gstNumber ?? company.gstNumber, 
          address: dto.address ?? company.address, 
          industry: dto.industry ?? company.industry, 
        }); 
      return this.companyRepo.save(company); 
    }

    async remove(id: number): Promise<void> { 
      const company = await this.findOne(id); 
      await this.companyRepo.remove(company); 
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

    async createCategory(dto: CreateCategoryDto): Promise<Category> {
      const existing = await this.categoryRepo.findOne({ where: { name: dto.name } });
      if (existing) throw new ConflictException('Category already exists');
      
      const category = this.categoryRepo.create(dto);
      return this.categoryRepo.save(category);
    }

    async findAllCategories(): Promise<Category[]> {
      return this.categoryRepo.find();
    }

    async deleteCategory(id: number): Promise<void> {
      const category = await this.categoryRepo.findOne({where: { id },});
      if (!category)throw new NotFoundException("Category not found");
      await this.categoryRepo.remove(category);
    }

    async createProduct(dto: CreateProductDto,createdById: number,picture?: Express.Multer.File): Promise<Product> {
      const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
      if (!category)throw new NotFoundException(`Category with id ${dto.categoryId} not found`);

      const createdBy = await this.userRepo.findOne({ where: { id: createdById } });
      if (!createdBy) {
        throw new HttpException(
          { status: HttpStatus.FORBIDDEN, error: 'Creating user could not be identified' },
          HttpStatus.FORBIDDEN,
        );
      }

      const existingSku = await this.productRepo.findOne({ where: { sku: dto.sku } });
      if (existingSku) throw new ConflictException(`SKU '${dto.sku}' already exists`);   

      const product = this.productRepo.create({
        sku: dto.sku,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stock: dto.stock ?? 0,
        category,
        createdBy,
            
        picture: picture?.buffer,
        pictureMimeType: picture?.mimetype,
      });
      
      return this.productRepo.save(product);
    }

    async findAllProducts(): Promise<Product[]> {
      return this.productRepo.find({ relations: {category:true, createdBy:true} });
    }

    async findOneProduct(id: number): Promise<Product> {
      const product = await this.productRepo.findOne({where: { id },relations: {category:true, createdBy:true}});
      if (!product) throw new NotFoundException(`Product with id ${id} not found`);
      return product;
    }

    async updateProduct(  id: number,  dto: UpdateProductDto,  picture?: Express.Multer.File,): Promise<Product> {
      const product = await this.findOneProduct(id);
    
      if (dto.categoryId !== undefined) {
        const category = await this.categoryRepo.findOne({where: { id: dto.categoryId },});
        if (!category) throw new NotFoundException(`Category with id ${dto.categoryId} not found`);
        product.category = category;
      }
    
      Object.assign(product, {
        sku: dto.sku ?? product.sku,
        name: dto.name ?? product.name,
        description: dto.description ?? product.description,
        price: dto.price ?? product.price,
        stock: dto.stock ?? product.stock,
      });
    
      if (picture) {
        product.picture = picture.buffer;
        product.pictureMimeType = picture.mimetype;
      }
    
      return this.productRepo.save(product);
    }

    async removeProduct(id: number): Promise<{ deleted: boolean }> {
      const result = await this.productRepo.delete(id);
      if (result.affected === 0)throw new NotFoundException(`Product with id ${id} not found`);
      return { deleted: true };
    }   

    async assignOversight(dto: AssignOversightDto): Promise<AdminCompanyOversight> {
      const admin = await this.userRepo.findOne({ where: { id: dto.adminId } });
      if (!admin) throw new NotFoundException(`Admin with id ${dto.adminId} not found`);

      if (admin.role !== Role.ADMIN) {
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: 'Selected user is not an ADMIN' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const company = await this.companyRepo.findOne({ where: { id: dto.companyId } });
      if (!company) throw new NotFoundException(`Company with id ${dto.companyId} not found`);


      const alreadyAssigned = await this.oversightRepo.findOne({where: { admin: { id: dto.adminId }, 
                            company: { id: dto.companyId } },relations: {admin:true,company:true}});
      if (alreadyAssigned) throw new ConflictException('This admin is already assigned to this company');
      

      const oversight = this.oversightRepo.create({ admin, company });
      const saved = await this.oversightRepo.save(oversight);

      try {
        await this.mailerService.sendMail({
          to: admin.email,
          subject: 'New company assignment',
          text: `Hi ${admin.name}, you have been assigned oversight of ${company.name}.`,
        });
      } catch (err) {
        console.error('Failed to send oversight assignment email:', err);
      }

      return saved;
    }

    async findOversightByCompany(companyId: number): Promise<AdminCompanyOversight[]> {
      const company = await this.companyRepo.findOne({ where: { id: companyId } });
      if (!company)throw new NotFoundException(`Company with id ${companyId} not found`);

      return this.oversightRepo.find({where: { company: { id: companyId } },
                                      relations: {admin:true,company:true}});
    }
    async removeOversight(id: number): Promise<{ deleted: boolean }> {
      const result = await this.oversightRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Oversight assignment with id ${id} not found`);
      }
      return { deleted: true };
    }

    async findByCompany(companyId: number) : Promise<User[]>{
      const company = await this.companyRepo.findOne({ where: { id: companyId } });
      if (!company) throw new NotFoundException(`Company with id ${companyId} not found`);

      var onlyUser = this.userRepo.find({select:{id:true,name:true,email:true},where:{company:{ id: companyId }, role: Role.ADMIN},relations:{company:true}})

      return onlyUser ; 
   }
} 