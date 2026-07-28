import { IsNumber } from 'class-validator';

export class CreateExpertiseDto {

  @IsNumber()
  engineer_id?:number;

  @IsNumber()
  product_id?:number;

}