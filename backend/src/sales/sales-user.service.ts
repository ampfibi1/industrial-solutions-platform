import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { SalesExecutiveEntity } from './entities/sales-executive.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';


@Injectable()
export class SalesUserService {

  constructor(
    @InjectRepository(SalesExecutiveEntity)
    private readonly salesRepo: Repository<SalesExecutiveEntity>,
  ) {}

  
  async createUser(dto: CreateUserDto): Promise<SalesExecutiveEntity> {
    const user = this.salesRepo.create({
      fullName: dto.fullName ?? null,
      phone: dto.phone,
      isActive: dto.isActive ?? true,
    });
    return await this.salesRepo.save(user);
    // @BeforeInsert in entity auto-generates the id before saving
  }

  
  async updatePhone(id: string, dto: UpdatePhoneDto): Promise<SalesExecutiveEntity> {
    const user = await this.salesRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    user.phone = dto.phone;
    return await this.salesRepo.save(user);
  }

  
  async getUsersWithNullFullName(): Promise<SalesExecutiveEntity[]> {
    return await this.salesRepo.find({
      where: { fullName: IsNull() },
    });
  }

  
  async removeUser(id: string): Promise<{ message: string }> {
    const user = await this.salesRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    await this.salesRepo.remove(user);
    return { message: `User with ID "${id}" has been removed successfully.` };
  }
}