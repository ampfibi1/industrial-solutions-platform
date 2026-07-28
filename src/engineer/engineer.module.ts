import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineerController } from './engineer.controller';
import { EngineerService } from './engineer.service';
import { ServiceRequest } from './entities/service-request.entity';
import { EngineerProductExpertise } from './entities/engineer-product-expertise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceRequest,
      EngineerProductExpertise
    ])
  ],
  controllers: [
    EngineerController
  ],
  providers: [
    EngineerService
  ]
})
export class EngineerModule {}