import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {

  @IsNotEmpty()
  @IsInt()

  @IsOptional()
  @IsString()
  region?: string;
}