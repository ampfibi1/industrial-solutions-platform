import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../db/enums/order-status.enum';

export class UpdateOrderDto {

  @IsNotEmpty()
  @IsEnum(OrderStatus, {
    message: 'Status must be PENDING, CONFIRMED, SHIPPED, DELIVERED or CANCELLED.',
  })
  status!: OrderStatus;
}