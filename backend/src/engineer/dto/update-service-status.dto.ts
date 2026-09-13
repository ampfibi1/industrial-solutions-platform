import { IsEnum } from 'class-validator';
import { ServiceStatus } from '../../db/enums/service-status.enum';

export class UpdateServiceStatusDto {
  @IsEnum(ServiceStatus)
  status!: ServiceStatus;
}