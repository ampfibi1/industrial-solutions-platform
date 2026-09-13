import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateExpertiseDto {
  @IsInt()
  @IsNotEmpty()
  product_id!: number;
}