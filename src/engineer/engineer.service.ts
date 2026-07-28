import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceRequest, ServiceStatus } from './entities/service-request.entity';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceStatusDto } from './dto/update-service-status.dto';
import { EngineerProductExpertise } from './entities/engineer-product-expertise.entity';
import { CreateExpertiseDto } from './dto/create-expertise.dto';
@Injectable()
export class EngineerService {

  constructor(
    @InjectRepository(ServiceRequest)
    private serviceRequestRepository: Repository<ServiceRequest>,

    @InjectRepository(EngineerProductExpertise)
    private expertiseRepository: Repository<EngineerProductExpertise>,
    ) {}

  async createServiceRequest(
    createServiceRequestDto: CreateServiceRequestDto,
    ) {

    const serviceRequest = this.serviceRequestRepository.create({
        customer: {
        id: createServiceRequestDto.customer_id,
        },
        engineer: {
        id: createServiceRequestDto.engineer_id,
        },
        product: {
        id: createServiceRequestDto.product_id,
        },
        description: createServiceRequestDto.description,
    });

    return await this.serviceRequestRepository.save(serviceRequest);
    }


  async getAssignedRequests(engineerId: number) {
    return await this.serviceRequestRepository.find({
      where: {
        engineer: {
          id: engineerId,
        },
      },
      relations: {
        engineer: true,
        customer: true,
        product: true,
        },
    });
  }


  async updateStatus(
    id: number,
    updateServiceStatusDto: UpdateServiceStatusDto,
  ) {

    const request =
      await this.serviceRequestRepository.findOne({
        where: { id },
      });

    if (!request) {
      return {
        message: 'Service request not found',
      };
    }


    request.status = updateServiceStatusDto.status;


    if (updateServiceStatusDto.status === ServiceStatus.RESOLVED) {
      request.resolvedAt = new Date();
    }


    return await this.serviceRequestRepository.save(request);
  }
  async createExpertise(createExpertiseDto: CreateExpertiseDto) {
    const expertise = this.expertiseRepository.create(
        createExpertiseDto,
    );

        return this.expertiseRepository.save(expertise);
    }


    async getExpertise(engineerId: number) {
        return this.expertiseRepository.find({
            where: {
                engineer_id: engineerId,
            },
        });
    }


    async deleteExpertise(id: number) {
        return this.expertiseRepository.delete(id);
    }

}