import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../../common/entities/enums/order-status.enum';

export class UpdateOrderDto {

  @IsNotEmpty()
  @IsEnum(OrderStatus, {
    message: 'Status must be PENDING, CONFIRMED, SHIPPED, DELIVERED or CANCELLED.',
  })
  status: OrderStatus;
}