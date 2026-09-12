import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class AssignOversightDto {
  @Type(() => Number)
  @IsInt()
  adminId!: number;

  @Type(() => Number)
  @IsInt()
  companyId!: number;
}