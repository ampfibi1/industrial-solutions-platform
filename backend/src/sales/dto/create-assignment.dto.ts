import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {

  @IsNotEmpty()
  @IsInt()
  customer_id: number;

  @IsOptional()
  @IsString()
  region?: string;
}