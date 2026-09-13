import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceRequest } from '../db/service-request.entity';
import { Product } from '../db/product.entity';
import { User } from '../db/user.entity';
import { EngineerProductExpertise } from '../db/engineer-product-expertise.entity';
import { ServiceStatus } from '../db/enums/service-status.enum';

import { UpdateServiceStatusDto } from './dto/update-service-status.dto';

@Injectable()
export class EngineerService {
  constructor(
    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepo: Repository<ServiceRequest>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(EngineerProductExpertise)
    private readonly expertiseRepo: Repository<EngineerProductExpertise>,
  ) {}

  async getProfile(engineerId: number) {
    const engineer = await this.userRepo.findOne({
      where: {
        id: engineerId,
      },
      relations: {
        company: true,
      },
    });

    if (!engineer) {
      throw new NotFoundException('Engineer not found');
    }

    return engineer;
  }

  async updateProfile(
    engineerId: number,
    name: string,
    phone: string,
  ) {
    const engineer = await this.userRepo.findOne({
      where: {
        id: engineerId,
      },
    });

    if (!engineer) {
      throw new NotFoundException('Engineer not found');
    }

    engineer.name = name;
    engineer.phone = phone;

    return this.userRepo.save(engineer);
  }

  async getServiceRequests(engineerId: number) {
    return this.serviceRequestRepo.find({
      where: {
        engineer: { id: engineerId },
      },
      relations: {
        product: true,
      },
    });
  }

  async getServiceRequest(
    engineerId: number,
    requestId: number,
  ) {
    const request = await this.serviceRequestRepo.findOne({
      where: {
        id: requestId,
        engineer: { id: engineerId },
      },
      relations: {
        product: true,
        customer: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    return request;
  }

  async updateServiceStatus(
    engineerId: number,
    requestId: number,
    dto: UpdateServiceStatusDto,
  ) {
    const request = await this.serviceRequestRepo.findOne({
      where: {
        id: requestId,
        engineer: { id: engineerId },
      },
    });

    if (!request) {
      throw new NotFoundException('Service request not found');
    }

    request.status = dto.status;

    if (dto.status === ServiceStatus.RESOLVED) {
      request.resolvedAt = new Date();
    }

    return this.serviceRequestRepo.save(request);
  }

  async addExpertise(
    engineerId: number,
    productId: number,
  ) {
    const engineer = await this.userRepo.findOne({
      where: { id: engineerId },
    });

    if (!engineer) {
      throw new NotFoundException('Engineer not found');
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const expertise = this.expertiseRepo.create({
      engineer,
      product,
    });

    return this.expertiseRepo.save(expertise);
  }

  async getExpertise(engineerId: number) {
    return this.expertiseRepo.find({
      where: {
        engineer: { id: engineerId },
      },
      relations: {
        product: true,
      },
    });
  }

  async removeExpertise(
    engineerId: number,
    expertiseId: number,
  ) {
    const expertise = await this.expertiseRepo.findOne({
      where: {
        id: expertiseId,
        engineer: { id: engineerId },
      },
    });

    if (!expertise) {
      throw new NotFoundException('Expertise not found');
    }

    await this.expertiseRepo.remove(expertise);

    return {
      message: 'Expertise removed successfully',
    };
  }
}