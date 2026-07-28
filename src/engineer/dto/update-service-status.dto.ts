import { IsEnum } from 'class-validator';
import { ServiceStatus } from '../entities/service-request.entity';

export class UpdateServiceStatusDto {

  @IsEnum(ServiceStatus)
  status?: ServiceStatus;

}