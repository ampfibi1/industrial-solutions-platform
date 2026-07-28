import { IsNumber, IsString } from 'class-validator';

export class CreateServiceRequestDto {

  @IsNumber()
  customer_id?: number;

  @IsNumber()
  engineer_id?: number;

  @IsNumber()
  product_id?: number;

  @IsString()
  description?: string;

}