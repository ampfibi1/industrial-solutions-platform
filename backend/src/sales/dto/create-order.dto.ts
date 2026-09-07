import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {

  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive({ message: 'Quantity must be greater than 0.' })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Unit price must be greater than 0.' })
  unit_price: number;
}

export class CreateOrderDto {

  @IsNotEmpty()
  @IsInt()
  customer_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}