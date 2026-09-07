import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePhoneDto {

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsNumber({}, { message: 'Phone must be a valid number.' })
  phone: number;
}