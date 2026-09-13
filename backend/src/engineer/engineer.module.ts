import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EngineerController } from './engineer.controller';
import { EngineerService } from './engineer.service';

import { ServiceRequest } from '../db/service-request.entity';
import { Product } from '../db/product.entity';
import { User } from '../db/user.entity';
import { EngineerProductExpertise } from '../db/engineer-product-expertise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceRequest,
      Product,
      User,
      EngineerProductExpertise,
    ]),
  ],
  controllers: [EngineerController],
  providers: [EngineerService],
})
export class EngineerModule {}